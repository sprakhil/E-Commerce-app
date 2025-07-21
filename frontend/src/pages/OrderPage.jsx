import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useGetOrderDetailsQuery } from '../store/ordersApiSlice';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <div className="alert alert-danger">{error?.data?.message || error.error}</div>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div className="alert alert-success">Delivered on {order.deliveredAt}</div>
              ) : (
                <div className="alert alert-warning">Not Delivered</div>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
              {order.isPaid ? (
                <div className="alert alert-success">Paid on {order.paidAt}</div>
              ) : (
                <div className="alert alert-danger">Not Paid</div>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                 <div className="alert alert-info">Order is empty</div>
              ) : (
                order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                      <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                      <Col md={4}>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>${order.itemsPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping</Col><Col>${order.shippingPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax</Col><Col>${order.taxPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Total</Col><Col>${order.totalPrice}</Col></Row></ListGroup.Item>
              {/* PayPal button would go here */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;