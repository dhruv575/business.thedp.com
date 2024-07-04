import React from 'react';
import styled from 'styled-components';
import { MONTSERRAT_LIGHT, POPPINS_BOLD } from '../../styles/fonts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // Two columns
  grid-template-rows: auto auto; // Two rows, size adjusts to content
  gap: 20px; // Space between grid items
  padding: 0rem 2rem; // Padding around the entire grid

  @media (max-width: 768px) {
    padding: 2rem 1rem; // Reduced padding for small screens
    grid-template-columns: 1fr; // Makes it a single column layout on smaller screens
  }
`;

const ContentBlock = styled.div`
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  animation: animateBg 10s linear infinite;

  background-image: linear-gradient(30deg, #000000, #003300, #006400, #002200);
  background-size: 400% 400%;

  @keyframes animateBg {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
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
        <Title>Technical Track</Title>
        <Description>
            Design products which help solve a problem that affects some portion of the Penn population! 
            Use web design, artificial intelligence, or any other technology that you need to make some positive impact for the school.
            Winners will work with DP engineers to integrate their projects into the Daily Pennsylvanian website, giving them access to our 5 million+ views an year!
            They will also be given regular analytics reports to be used for their resume/portfolios. 
        </Description>
      </ContentBlock>
      <ContentBlock>
        <Title>Pitch Track</Title>
        <Description>
            If you have ever had thoughts on how to improve the Daily Pennsylvanian, take this chance!
            The Pitch track involves coming up with a new product, idea, or opportunity within the media sector, conducting research and pitching your plan.
            Pitch track winners will produce plans that fulfill a need for well defined audiences, creating both impact and interest.
            They will be given a chance to launch their proposal with the DP Innovation Lab team, and be offered statistics on revenue generation from their product!
        </Description>
      </ContentBlock>
    </GridContainer>
  );
};

export default ContentGrid;
