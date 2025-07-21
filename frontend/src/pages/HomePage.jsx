import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../store/productsApiSlice';

const HomePage = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {keyword ? (
        <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
      ) : (
        <div className="hero-banner text-center p-5 mb-4 bg-light rounded-3">
          <h1 className="display-4 fw-bold">Welcome to ProShop</h1>
          <p className="fs-4">Find the best products at the most affordable prices</p>
        </div>
      )}
      
      <h1>{keyword ? `Search Results for "${keyword}"` : 'Latest Products'}</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="alert alert-danger">{error?.data?.message || error.error}</div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;