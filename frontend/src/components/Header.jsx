import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../store/authSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <SearchBox />
              <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i> Sign In</Nav.Link>
              )}
              {/* Admin Menu */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>Products</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;