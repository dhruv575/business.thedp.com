import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { POPPINS_BOLD } from '../styles/fonts';
import DataDisplay from './DataDisplay';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column layout
  gap: 20px; // Space between grid items
  padding: 0rem 2rem; // Padding around the entire grid

  @media (max-width: 768px) {
    padding: 1rem; // Reduced padding for small screens
  }
`;

const ContentBlock = styled.div`
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  animation: animateBg 10s linear infinite;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, opacity 0.3s ease-in-out; // Smooth transition for transform and opacity
  background-image: linear-gradient(30deg, #000033, #000066, #000099, #0000cc);
  background-size: 400% 400%;
  opacity: ${props => (props.expanded ? 1 : 0.4)}; // 40% opacity by default, 100% when expanded

  @keyframes animateBg {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  &:hover {
    transform: scale(1.005); // Slightly enlarge on hover
  }

  @media (max-width: 768px) {
    padding: 10px; // Reduced padding for small screens
  }
`;

const Title = styled.h2`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 1.2rem; // Smaller font size
  margin: 0;
  cursor: pointer;

  &:hover {
    color: #ffcc00; // Change color on hover
  }

  @media (max-width: 768px) {
    font-size: 1rem; // Adjust font size for small screens
  }
`;

const CollegeData = () => {
  const data = useStaticQuery(graphql`
    query {
      allT20Json {
        edges {
          node {
            university_name
            year
            ranking
            link
            total_ug
            total_g
            total_all
            men_app
            women_app
            nb_app
            total_app
            men_adm
            wom_adm
            nb_adm
            total_adm
            men_enr
            wom_enr
            nb_enr
            total_enr
            wl_offer
            wl_acc
            wl_adm
            act_25
            act_50
            act_75
            sat_25
            sat_50
            sat_75
            avg_gpa
          }
        }
      }
    }
  `);

  // Group data by university name
  const universityData = data.allT20Json.edges.reduce((acc, { node }) => {
    const { university_name, year, ...rest } = node;
    if (!acc[university_name]) {
      acc[university_name] = {};
    }
    acc[university_name][year] = { year, ...rest };
    return acc;
  }, {});

  // Extract and sort universities by their 2024 ranking
  const universities2024 = Object.keys(universityData)
    .map(university => ({
      university,
      ranking: universityData[university][2024]?.ranking || Number.MAX_VALUE, // Handle missing rankings
    }))
    .sort((a, b) => a.ranking - b.ranking);

  const [expandedUniversities, setExpandedUniversities] = useState({});

  const toggleExpand = university => {
    setExpandedUniversities(prev => ({
      ...prev,
      [university]: !prev[university]
    }));
  };

  return (
    <GridContainer>
      {universities2024.map(({ university }) => (
        <ContentBlock
          key={university}
          expanded={expandedUniversities[university]}
        >
          <Title onClick={() => toggleExpand(university)}>
            {university}
          </Title>
          {expandedUniversities[university] && (
            <DataDisplay data={universityData[university]} />
          )}
        </ContentBlock>
      ))}
    </GridContainer>
  );
};

export default CollegeData;
