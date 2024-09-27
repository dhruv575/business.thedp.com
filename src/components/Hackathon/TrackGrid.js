import React from 'react';
import styled from 'styled-components';
import { MONTSERRAT_LIGHT, POPPINS_BOLD } from '../../styles/fonts';

// Main container to hold both the content block and prize boxes
const MainGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr; // Two columns: content block (left) and prizes (right)
  gap: 20px; // Space between the two main sections
  padding: 0rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stacks the sections vertically on smaller screens
    padding: 2rem 1rem;
  }
`;

// Style for the content section on the left
const ContentBlock = styled.div`
  padding: 2rem 6rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  animation: animateBg 10s linear infinite;
  background-image: linear-gradient(30deg, #000000, #003300, #006400, #002200);
  background-size: 400% 400%;

  @keyframes animateBg {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
`;

// Style for the right section containing prize blocks
const PrizeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column for prize blocks
  gap: 20px;
`;

// Style for individual prize blocks
const PrizeBlock = styled.div`
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  background: #0a3c02;
  color: #ffffff;
`;

// Title styles
const Title = styled.h2`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

// Description styles
const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

// Combined component with content on the left and prizes on the right
const ContentGrid = () => {
  return (
    <MainGridContainer>
      <ContentBlock>
        <Title>Technical Track</Title>
        <Description>
          Design products which help solve a problem that affects some portion of the Penn population! You will be able to build projects that affect you day to day.
        </Description>
        <Description>
          Use web design, artificial intelligence, or any other technology that you need to make some positive impact for the school. Past winners have gone on to develop YCombinator startups!
        </Description>
        <Description>
          Winners will work with DP engineers to integrate their projects into the Daily Pennsylvanian website, giving them access to our 5 million+ views a year! Tons of free traction for your product, and regular analytics reports so that you can keep your resume up to date!
        </Description>
        <Description>
          Winners will be given first round interviews by our well established startup partners. This is a great chance for you to show that you're a developer who moves fast and builds people-centric products, and potentially get hired for it!
        </Description>
      </ContentBlock>
      <PrizeGrid>
        <PrizeBlock>
          <Title>First Place</Title>
          <Description>$600 + First Round Intern Interviews at 1 of our established startup partners ($1000000+ ARR, 3+ years in operation)</Description>
        </PrizeBlock>
        <PrizeBlock>
          <Title>Second Place</Title>
          <Description>$400 + First Round Intern Interviews at 1 of our startup partners who have raised $10 million+ and successfully exited previous startups</Description>
        </PrizeBlock>
        <PrizeBlock>
          <Title>Third Place</Title>
          <Description>$200 + First Round Intern Interviews at 1 of our startup partners who are revolutionizing clinical retention and healthcare</Description>
        </PrizeBlock>
      </PrizeGrid>
    </MainGridContainer>
  );
};

export default ContentGrid;
