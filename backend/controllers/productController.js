import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Fetch all products
const getProducts = async (req, res) => {
  const keyword = req.query.keyword 
    ? { name: { $regex: req.query.keyword, $options: 'i' } } 
    : {};
  
  const products = await Product.find({ ...keyword });
  res.json(products);
};

// @desc    Fetch single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    // Now accepts initial data from a form
    const { name, price, brand, category, countInStock, description } = req.body;

    const product = new Product({
        name: name || 'Sample name',
        price: price || 0,
        user: req.user._id,
        image: '/images/sample.jpg', // Default image, can be changed later
        brand: brand || 'Sample brand',
        category: category || 'Sample category',
        countInStock: countInStock || 0,
        numReviews: 0,
        description: description || 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const orders = await Order.find({ user: req.user._id });
        const hasPurchased = orders.some(order => 
            order.orderItems.some(item => item.product.toString() === req.params.id)
        );

        if (!hasPurchased) {
            res.status(400);
            throw new Error('You can only review products you have purchased');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };