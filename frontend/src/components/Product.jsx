import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { addToCart } from '../store/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (e) => {
    // Prevent the card's link from firing when the button is clicked
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  return (
    <Card className="my-3 product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <Card.Img src={product.image} variant="top" className="product-image" />
        <div className="product-overlay">
          <Button variant="primary" className="overlay-button" onClick={addToCartHandler}>
            Add to Cart
          </Button>
        </div>
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="div" className="product-title flex-grow-1">
          <Link to={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <Card.Text as="h3" className="mb-0">
            ${product.price}
          </Card.Text>
          <Card.Text as="div" className="mb-0">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;