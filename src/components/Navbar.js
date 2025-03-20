import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const CartBadge = styled.span`
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.3rem;
`;

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <NavContainer>
      <Logo to="/">ShopApp</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">
          Cart {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
        </NavLink>
        {currentUser ? (
          <>
            {currentUser.email.includes('admin') && (
              <NavLink to="/admin">Admin</NavLink>
            )}
            <NavLink as="button" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;