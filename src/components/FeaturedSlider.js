import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 2rem 0;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.currentSlide * 100}%);
`;

const SlideGroup = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0 1rem;
`;

const FeaturedSlider = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const groupSize = 4;
  const totalGroups = Math.ceil(products.length / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalGroups);
    }, 15000);

    return () => clearInterval(timer);
  }, [totalGroups]);

  const productGroups = [];
  for (let i = 0; i < products.length; i += groupSize) {
    productGroups.push(products.slice(i, i + groupSize));
  }

  return (
    <SliderContainer>
      <SliderTrack currentSlide={currentSlide}>
        {productGroups.map((group, index) => (
          <SlideGroup key={index}>
            {group.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SlideGroup>
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};

export default FeaturedSlider;