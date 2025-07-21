import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../store/productsApiSlice';

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery({});
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const navigate = useNavigate();

  // Modal state
  const [modalState, setModalState] = useState({ show: false, type: '', data: null, title: '', body: null });

  const handleModalClose = () => setModalState({ show: false, type: '', data: null, title: '', body: null });

  const deleteHandler = (id) => {
    setModalState({
      show: true,
      type: 'delete',
      data: { id },
      title: 'Confirm Deletion',
      body: <p>Are you sure you want to delete this product?</p>
    });
  };

  const createHandler = async () => {
    try {
      const newProduct = await createProduct({}).unwrap();
      navigate(`/admin/product/${newProduct._id}/edit`);
    } catch (err) {
      setModalState({
        show: true,
        type: 'error',
        title: 'Error',
        body: <p>{err?.data?.message || err.error}</p>
      });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(modalState.data.id);
      refetch();
      handleModalClose();
    } catch (err) {
      setModalState({
        show: true,
        type: 'error',
        title: 'Error',
        body: <p>{err?.data?.message || err.error}</p>
      });
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col><h1>Products</h1></Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createHandler} disabled={loadingCreate}>
            {loadingCreate ? 'Creating...' : <><i className="fas fa-plus"></i> Create Product</>}
          </Button>
        </Col>
      </Row>

      <CustomModal
        show={modalState.show}
        handleClose={handleModalClose}
        handleConfirm={modalState.type === 'delete' ? confirmDelete : null}
        title={modalState.title}
        confirmText="Delete"
        showConfirmButton={modalState.type === 'delete'}
      >
        {modalState.body}
      </CustomModal>

      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'><i className='fas fa-edit'></i></Button>
                  </Link>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><i className='fas fa-trash'></i></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;