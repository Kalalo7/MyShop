import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  padding: 4rem 2rem;
  border-radius: 16px;
  margin-bottom: 3rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #fff;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #4f46e5);
    border-radius: 2px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ShowMoreButton = styled.button`
  margin: 3rem auto;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const HomePage = () => {
  const [allFeaturedProducts, setAllFeaturedProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]); // Add this line
  const [displayCount, setDisplayCount] = useState(4);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('featured', '==', true)
        );
        
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setAllFeaturedProducts(products);
        setFeaturedProducts(products.slice(0, 4));
        setHasMore(products.length > 4);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleShowMore = () => {
    const nextCount = displayCount + 4;
    setFeaturedProducts(allFeaturedProducts.slice(0, nextCount));
    setDisplayCount(nextCount);
    setHasMore(nextCount < allFeaturedProducts.length);
  };

  // Move this up with other styled components (after LoadingText and before HomePage component)
  const FeaturedSection = styled.div`
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease;
  
    &:hover {
      transform: translateY(-2px);
    }
  `;
  
  // And remove the styled component definition from the return statement
  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to Our Shop</Title>
        <Subtitle>Discover our amazing products</Subtitle>
      </Hero>
      <FeaturedSection>
        <SectionTitle>Featured Products</SectionTitle>
        {loading ? (
          <LoadingText>Loading featured products...</LoadingText>
        ) : (
          <>
            <ProductGrid>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
            {hasMore && (
              <ShowMoreButton onClick={handleShowMore}>
                Show More Featured Products
              </ShowMoreButton>
            )}
          </>
        )}
      </FeaturedSection>
    </HomeContainer>
  );
};

export default HomePage;