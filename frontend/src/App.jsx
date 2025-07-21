import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoutes';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage'; 
import AdminRoute from './components/AdminRoute';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';

function App() {
  return (
    <>
      <Header />
      <main className="py-3 container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<HomePage />} /> {/* Search route */}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="" element={<ProtectedRoute />}>
             <Route path="/shipping" element={<ShippingPage />} />
             <Route path="/payment" element={<PaymentPage />} />
             <Route path="/placeorder" element={<PlaceOrderPage />} />
             <Route path="/order/:id" element={<OrderPage />} /> {/* Order details route */}
             <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="" element={<AdminRoute />}>
               <Route path="/admin/productlist" element={<ProductListPage />} />
               <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;