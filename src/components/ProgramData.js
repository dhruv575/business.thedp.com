import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { MONTSERRAT_LIGHT, POPPINS_BOLD } from '../styles/fonts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0rem 8rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 2rem;
  }
`;

const ProgramBlock = styled.div`
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  background-color: #003366;
  color: #ffffff;
  cursor: pointer; /* Change cursor to pointer on hover */

  &:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
    background-color: #005599;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 1); /* More pronounced shadow on hover */
  }

  &:active {
    transform: scale(1);
    background-color: #002244;
  }
`;

const Title = styled.h2`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 1.2rem;
`;

const Subtitle = styled.h3`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 1rem;
  margin: 10px 0;
`;

const Description = styled.div`
  ${MONTSERRAT_LIGHT}
  font-size: 0.9rem;
  color: #ffffff;
  margin-top: 10px;
`;

const ProgramData = () => {
  const data = useStaticQuery(graphql`
    query {
      allHsprogramsJson {
        edges {
          node {
            Name
            Location_and_Deadline: Location_and_Deadline
            Description
            Cost
            link
          }
        }
      }
    }
  `);

  const programs = data.allHsprogramsJson.edges
    .map(edge => edge.node)
    .sort((a, b) => {
      const hasDescriptionA = a.Description && a.Description.trim() !== "";
      const hasDescriptionB = b.Description && b.Description.trim() !== "";
      return hasDescriptionB - hasDescriptionA;
    });

  const openProgramLink = (link) => {
    window.open(link, '_blank');
  };

  return (
    <GridContainer>
      {programs.map((program, index) => (
        <ProgramBlock key={index} onClick={() => openProgramLink(program.link)}>
          <Title>{program.Name}</Title>
          <Subtitle>
            {program.Location_and_Deadline && program.Location_and_Deadline}
            {program.Cost && program.Cost !== "" && `, Cost: $${program.Cost}`}
          </Subtitle>
          {program.Description && (
            <Description>
              <p>{program.Description}</p>
            </Description>
          )}
        </ProgramBlock>
      ))}
    </GridContainer>
  );
};

export default ProgramData;
