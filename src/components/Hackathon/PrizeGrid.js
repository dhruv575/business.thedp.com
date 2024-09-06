import React from 'react';
import styled from 'styled-components';
import { POPPINS_BOLD, MONTSERRAT_LIGHT } from '../../styles/fonts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 0rem 2rem;
`;

const PrizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // Switch to two columns for tablets
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Switch to one column for mobile devices
  }
`;

const PrizeBlock = styled.div`
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  background: #0a3c02;
  color: #ffffff;
  transition: transform 0.3s ease; // Smooth scaling on hover

  &:hover {
    transform: scale(1.05); // Slightly enlarge on hover for better interaction
  }
`;

const Title = styled.h2`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem; // Adjust font size for smaller screens
  }
`;

const Description = styled.p`
  ${MONTSERRAT_LIGHT}
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem; // Slightly reduce font size for readability on small screens
  }
`;

const PrizesGrid = () => {
  return (
    <GridContainer>
      <PrizeGrid>
        <PrizeBlock>
          <Title>First Place</Title>
          <Description>TBD</Description>
        </PrizeBlock>
        <PrizeBlock>
          <Title>Second Place</Title>
          <Description>TBD</Description>
        </PrizeBlock>
        <PrizeBlock>
          <Title>Third Place</Title>
          <Description>TBD</Description>
        </PrizeBlock>
      </PrizeGrid>
    </GridContainer>
  );
};

export default PrizesGrid;
