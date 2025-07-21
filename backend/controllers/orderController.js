import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice 
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).send('No order items');
    return;
  } else {
    const order = new Order({
      orderItems: orderItems.map(x => ({ ...x, product: x._id, _id: undefined })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  // .populate gets the name and email from the associated user
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  // --- SECURITY FIX ---
  // Check if the order exists AND if the user requesting it is either the owner or an admin
  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order);
  } else if (!order) {
    res.status(404);
    throw new Error('Order not found');
  } else {
    // If the order exists but the user is not authorized
    res.status(401);
    throw new Error('Not authorized to view this order');
  }
};



export { addOrderItems, getMyOrders, getOrderById };