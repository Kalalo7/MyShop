import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  margin-bottom: 1rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.div`
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const QuantityLabel = styled.label`
  margin-right: 1rem;
  font-weight: 500;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: #0069d9;
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, parseInt(quantity));
      alert(`${quantity} ${product.name} added to cart!`);
    }
  };

  if (loading) {
    return <DetailContainer>Loading product details...</DetailContainer>;
  }

  if (!product) {
    return <DetailContainer>Product not found!</DetailContainer>;
  }

  return (
    <DetailContainer>
      <ProductLayout>
        <ImageContainer>
          <ProductImage src={product.imageUrl} alt={product.name} />
        </ImageContainer>
        
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          
          <ProductDescription>
            <p>{product.description}</p>
          </ProductDescription>
          
          <QuantityContainer>
            <QuantityLabel htmlFor="quantity">Quantity:</QuantityLabel>
            <QuantityInput
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </QuantityContainer>
          
          <AddButton onClick={handleAddToCart}>Add to Cart</AddButton>
        </ProductInfo>
      </ProductLayout>
    </DetailContainer>
  );
};

export default ProductDetailPage;