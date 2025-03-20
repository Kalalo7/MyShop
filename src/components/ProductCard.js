import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  background-color: #f8f8f8;
  border-radius: 8px 8px 0 0;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #007bff;
  margin: 0.5rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ViewButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        <ButtonContainer>
          <ViewButton to={`/product/${product.id}`}>View Details</ViewButton>
          <AddButton onClick={() => addToCart(product)}>Add to Cart</AddButton>
        </ButtonContainer>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;