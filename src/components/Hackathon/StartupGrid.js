import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

// Container for the Startup Grid with a green gradient background
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: radial-gradient(circle at center, #000000, #004d00, #008000, #000000);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); // Add shadow for depth
  margin: 0rem 0;
`;

// Individual card for each startup
const StartupCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

// Logo section of the card
const LogoSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f8f8f8; // Light gray background for the logo section
`;

// Description section of the card
const DescriptionSection = styled.div`
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Startup logo image styling
const StartupLogo = styled.img`
  max-width: 100%;
  height: auto;
`;

// Name of the startup
const StartupName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #004d00;
`;

// Description text styling
const StartupDescription = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const StartupGrid = () => {
  const data = useStaticQuery(graphql`
    query StartupsData {
      allPartnersJson {
        edges {
          node {
            name
            img {
              publicURL
            }
            link
            affiliation
            description
          }
        }
      }
    }
  `);

  // Filter only the nodes with affiliation as "startup"
  const startups = data.allPartnersJson.edges.filter(
    ({ node }) => node.affiliation === 'startup'
  );

  return (
    <GridContainer>
      {startups.map(({ node }) => (
        <StartupCard key={node.name} onClick={() => window.open(node.link, '_blank')}>
          <LogoSection>
            <StartupLogo src={node.img.publicURL} alt={node.name} />
          </LogoSection>
          <DescriptionSection>
            <StartupName>{node.name}</StartupName>
            <StartupDescription>{node.description}</StartupDescription>
          </DescriptionSection>
        </StartupCard>
      ))}
    </GridContainer>
  );
};

export default StartupGrid;
