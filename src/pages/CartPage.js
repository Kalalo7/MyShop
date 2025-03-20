import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const EmptyCart = styled.div`
  text-align: center;
  margin: 3rem 0;
`;

const EmptyMessage = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #eee;
  color: #555;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductName = styled.p`
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-weight: bold;
  }
`;

const CheckoutButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #218838;
  }
`;

const CartPage = () => {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Thank you for your purchase! This would normally process payment and create an order.');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <CartContainer>
        <Title>Your Shopping Cart</Title>
        <EmptyCart>
          <EmptyMessage>Your cart is empty.</EmptyMessage>
          <ShopButton to="/products">Continue Shopping</ShopButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Title>Your Shopping Cart</Title>
      
      <CartTable>
        <thead>
          <tr>
            <TableHeader>Product</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <ProductImage src={item.imageUrl} alt={item.name} />
                  <ProductName>{item.name}</ProductName>
                </div>
              </TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput 
                    type="number" 
                    min="1" 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  />
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
              </TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  Remove
                </RemoveButton>
              </TableCell>            </TableRow>
          ))}
        </tbody>
      </CartTable>
      
      <CartSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Shipping:</span>
          <span>Free</span>
        </SummaryRow>
        <SummaryRow>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </SummaryRow>
      </CartSummary>
      
      <CheckoutButton onClick={handleCheckout}>
        Proceed to Checkout
      </CheckoutButton>
    </CartContainer>
  );
};

export default CartPage;