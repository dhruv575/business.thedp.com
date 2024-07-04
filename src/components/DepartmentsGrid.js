import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { PLAYFAIR_DISPLAY_LIGHT } from '../styles/fonts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Creates five columns for wider screens
  gap: 20px; // Space between grid items
  margin: 1rem; // Margin around the entire grid
  justify-content: center; // Centers grid items when they do not fill up a row

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Use one column on small screens
  }
`;

const ProjectCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${PLAYFAIR_DISPLAY_LIGHT}
`;

const DepartmentsGrid = ({ projects }) => {
    const data = useStaticQuery(graphql`
    query {
      allProductsJson {
        edges {
          node {
            name
            description
            img {
              childImageSharp {
                fluid(maxWidth: 1300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `);
  return (
    <GridContainer>
      {data.allProductsJson.edges.map(({ node }, index) => (
        <ProjectCard key={index}>
          <Img
            fluid={node.img.childImageSharp.fluid}
            alt={node.name}
            style={{ width: '100%', height: '200px' }} // Adjust height as needed
          />
          <div style={{ padding: '20px' }}>
            <h3>{node.name}</h3>
            <p>{node.description}</p>
          </div>
        </ProjectCard>
      ))}
    </GridContainer>
  );
};

export default DepartmentsGrid;
