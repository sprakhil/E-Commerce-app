import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';
import { 
    useGetProductDetailsQuery, 
    useUpdateProductMutation,
    useUploadProductImageMutation
} from '../../store/productsApiSlice';

const ProductEditPage = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    // State for form fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    // State for modal dialog
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });

    // RTK Query hooks
    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    // Effect to populate form when product data is fetched
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    // Handler for form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId, name, price, image, brand, category, description, countInStock,
            }).unwrap();
            setModalContent({ title: 'Success', body: 'Product updated successfully!' });
            setModalShow(true);
            refetch();
        } catch (err) {
            setModalContent({ title: 'Error', body: err?.data?.message || err.error });
            setModalShow(true);
        }
    };

    // Handler for image upload
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            setImage(res.image);
            setModalContent({ title: 'Success', body: 'Image uploaded successfully' });
            setModalShow(true);
        } catch (err) {
            setModalContent({ title: 'Error', body: err?.data?.message || err.error });
            setModalShow(true);
        }
    };

    // Handler for closing the modal
    const handleModalClose = () => {
        setModalShow(false);
        if (modalContent.title === 'Success') {
            // Only navigate if the main product update was successful
            if(modalContent.body.includes('Product updated')) {
                navigate('/admin/productlist');
            }
        }
    };

    return (
        <>
            <CustomModal
                show={modalShow}
                handleClose={handleModalClose}
                title={modalContent.title}
                showConfirmButton={false}
            >
                <p>{modalContent.body}</p>
            </CustomModal>

            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <h1>Edit Product</h1>

            {loadingUpdate && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                        <Form.Control label='Choose File' onChange={uploadFileHandler} type='file'></Form.Control>
                        {loadingUpload && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                        Update
                    </Button>
                </Form>
            )}
        </>
    );
};

export default ProductEditPage;
