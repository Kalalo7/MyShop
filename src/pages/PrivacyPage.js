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

const PrivacyPage = () => {
  return (
    <Container>
      <Title>Privacy Policy</Title>
      <Section>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, including name, email address, and any other information you choose to provide.</p>
      </Section>
      <Section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.</p>
      </Section>
      <Section>
        <h2>Information Sharing</h2>
        <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>
      </Section>
      <Section>
        <h2>Security</h2>
        <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.</p>
      </Section>
    </Container>
  );
};

export default PrivacyPage;