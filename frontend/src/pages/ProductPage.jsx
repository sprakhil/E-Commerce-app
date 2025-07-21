import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CustomModal from '../components/CustomModal';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../store/productsApiSlice';
import { addToCart } from '../store/cartSlice';

const ProductPage = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({ productId, rating, comment }).unwrap();
            refetch();
            setModalContent({ title: 'Success', body: 'Review Submitted!' });
            setModalShow(true);
            setRating(0);
            setComment('');
        } catch (err) {
            setModalContent({ title: 'Error', body: err?.data?.message || err.error });
            setModalShow(true);
        }
    };

    return (
        <>
            <CustomModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
                title={modalContent.title}
                showConfirmButton={false}
            >
                <p>{modalContent.body}</p>
            </CustomModal>

            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                <>
                    <Row>
                        {/* Product Details Columns... */}
                    </Row>
                    <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {loadingReview && <Loader />}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            {/* ... Review Form ... */}
                                        </Form>
                                    ) : (
                                        <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductPage;