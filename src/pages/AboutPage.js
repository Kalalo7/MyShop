import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const AboutPage = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Section>
        <h2>Our Story</h2>
        <p>Welcome to our online shop! We started our journey in 2024 with a simple mission: to provide high-quality products at competitive prices while delivering exceptional customer service.</p>
      </Section>
      <Section>
        <h2>Our Mission</h2>
        <p>We strive to make shopping easier and more enjoyable for our customers by offering a carefully curated selection of products and a seamless shopping experience.</p>
      </Section>
      <Section>
        <h2>Our Values</h2>
        <ul>
          <li>Customer Satisfaction</li>
          <li>Quality Products</li>
          <li>Transparency</li>
          <li>Sustainability</li>
        </ul>
      </Section>
    </Container>
  );
};

export default AboutPage;