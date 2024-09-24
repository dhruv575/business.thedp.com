import React from 'react';
import styled from 'styled-components';
import { MONTSERRAT_LIGHT, POPPINS_BOLD } from '../styles/fonts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // Two columns
  grid-template-rows: auto auto; // Two rows, size adjusts to content
  gap: 20px; // Space between grid items
  padding: 0rem 8rem; // Padding around the entire grid

  @media (max-width: 768px) {
    padding: 2rem 2rem; // Reduced padding for small screens
    grid-template-columns: 1fr; // Makes it a single column layout on smaller screens
  }
`;

const ContentBlock = styled.div`
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  animation: animateBg 10s linear infinite;
  transition: transform 0.3s ease-in-out; // Smooth transition for transform

  background-image: linear-gradient(30deg, #000033, #000066, #000099, #0000cc);
  background-size: 400% 400%;

  @keyframes animateBg {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  &:hover {
    transform: scale(1.02); // Slightly enlarge on hover
  }
`;

const Title = styled.h2`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 1.5rem;
`;

const Description = styled.p`
  ${MONTSERRAT_LIGHT}
  font-size: 1rem;
  color: #ffffff; // Medium grey text color
`;

// Sample component to display the grid with content
const ContentGrid = () => {
  return (
    <GridContainer>
      <ContentBlock>
        <Title>Penn Content</Title>
        <Description>
          Stay informed with the latest updates on Penn's campus life and success stories from current students to help you better understand the university.
          Hear from real people and read real stories from the Daily Pennsylvanian's 400+ student journalists! 
        </Description>
      </ContentBlock>
      <ContentBlock>
        <Title>Opportunities for High Schoolers</Title>
        <Description>
            Learn of the most prestigious opportunities for high schoolers right into your inbox once every two weeks!
            Peek at Penn will aim to provide our subsrcibers with exclusive opportunities sourced from partners at several of the world's largest companeis!
        </Description>
      </ContentBlock>
    </GridContainer>
  );
};

export default ContentGrid;
