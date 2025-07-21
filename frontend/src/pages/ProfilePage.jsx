import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../store/ordersApiSlice';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="alert alert-danger">
            Could not fetch orders. Please try logging out and back in.
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="alert alert-info">You have no orders.</div>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;