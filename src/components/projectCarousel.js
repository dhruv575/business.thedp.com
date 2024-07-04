import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Creates four columns
  gap: 20px; // Space between grid items
  margin: 3rem; // Margin around the entire grid
  justify-content: center; // Centers grid items when they do not fill up a row

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Makes it a single column layout on smaller screens
  }
`;

const ProjectCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff; // Background color of the card
  color: #000; // Text color
`;

const ProjectImage = styled(Img)`
  width: 100%;
  height: 200px; // Adjust height as needed
`;

const ProjectInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProjectName = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ProjectsCarousel = ({ projects }) => {
  return (
    <GridContainer>
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <ProjectImage fluid={project.img.childImageSharp.fluid} alt={project.name} />
          <ProjectInfo>
            <ProjectName>{project.name}</ProjectName>
            <ProjectDescription>{project.description}</ProjectDescription>
          </ProjectInfo>
        </ProjectCard>
      ))}
    </GridContainer>
  );
};

export default ProjectsCarousel;
