import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { MONTSERRAT_LIGHT, POPPINS_BOLD } from '../styles/fonts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column layout
  gap: 20px; // Space between grid items
  padding: 0rem 8rem; // Padding around the entire grid
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    padding: 2rem 2rem; // Reduced padding for small screens
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

const Subtitle = styled.h3`
  ${POPPINS_BOLD}
  color: #ffffff;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const SectionTitle = styled.div`
  ${POPPINS_BOLD}
  cursor: pointer;
  margin-top: 10px;
  color: #ffffff;
  border-top: 1px solid #ffffff;
  padding-top: 10px;
`;

const Content = styled.div`
  ${MONTSERRAT_LIGHT}
  font-size: 1rem;
  color: #ffffff;
  margin-top: 10px;
`;

const StudentProfiles = () => {
  const data = useStaticQuery(graphql`
    query {
      allProfilesJson {
        edges {
          node {
            Application_Cycle
            School
            Major
            GPA
            ACT
            EC_1
            EC_2
            EC_3
            Award_1
            Award_2
            Award_3
            Why_Penn_Essay
          }
        }
      }
    }
  `);

  const profiles = data.allProfilesJson.edges.map(edge => edge.node);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index, section) => {
    setOpenSections(prevState => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [section]: !prevState[index]?.[section]
      }
    }));
  };

  return (
    <GridContainer>
      {profiles.map((profile, index) => (
        <ContentBlock key={index}>
          <Title>{profile.School} Admit</Title>
          <Subtitle>
            {profile.Application_Cycle}
            {profile.Major && `, ${profile.Major}`} 
            {profile.GPA && <b>GPA: {profile.GPA}</b>} 
            {profile.ACT && <b>ACT: {profile.ACT}</b>}
          </Subtitle>
          {profile.EC_1 || profile.EC_2 || profile.EC_3 ? (
            <>
              <SectionTitle onClick={() => toggleSection(index, 'Extracurriculars')}>
                Extracurriculars
              </SectionTitle>
              {openSections[index]?.Extracurriculars && (
                <Content>
                  <ul>
                    {profile.EC_1 && <li>{profile.EC_1}</li>}
                    {profile.EC_2 && <li>{profile.EC_2}</li>}
                    {profile.EC_3 && <li>{profile.EC_3}</li>}
                  </ul>
                </Content>
              )}
            </>
          ) : null}
          {profile.Award_1 || profile.Award_2 || profile.Award_3 ? (
            <>
              <SectionTitle onClick={() => toggleSection(index, 'Awards')}>
                Awards
              </SectionTitle>
              {openSections[index]?.Awards && (
                <Content>
                  <ul>
                    {profile.Award_1 && <li>{profile.Award_1}</li>}
                    {profile.Award_2 && <li>{profile.Award_2}</li>}
                    {profile.Award_3 && <li>{profile.Award_3}</li>}
                  </ul>
                </Content>
              )}
            </>
          ) : null}
          {profile.Why_Penn_Essay ? (
            <>
              <SectionTitle onClick={() => toggleSection(index, 'Essay')}>
                Essay
              </SectionTitle>
              {openSections[index]?.Essay && (
                <Content>
                  <p>{profile.Why_Penn_Essay}</p>
                </Content>
              )}
            </>
          ) : null}
        </ContentBlock>
      ))}
    </GridContainer>
  );
};

export default StudentProfiles;
