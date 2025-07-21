import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import './index.css';
import App from './App.jsx';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';

import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';

import ProtectedRoute from './components/ProtectedRoutes';
import AdminRoute from './components/AdminRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);