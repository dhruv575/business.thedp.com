import React, { useState } from 'react';
import s from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import ContentGrid from '../components/hsGrid';
import CollegeData from '../components/collegedata';
import CompareColleges from '../components/CompareColleges';
import StudentProfiles from '../components/StudentProfiles';
import SimilarColleges from '../components/SimilarColleges';
import ProgramData from '../components/ProgramData';

import {
  Container
} from '../components';
import {
  POPPINS_SEMI_BOLD,
  POPPINS_LIGHT
} from '../styles/fonts';

const Hero = s.div`
  text-align: center;
  color: white;
  ${POPPINS_SEMI_BOLD}
  padding-top: 3rem;
  padding-bottom: 1rem;
  background-color: #f2f2f2;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.5);
`;

const ImageWrapper = s.div`
  padding: 0rem 20%;
  flex: 1;
  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
    text-align: center;
  }
`;

const SubHead = s.p`
  margin-top: 1rem;
  font-size: 110%;
  color: maroon;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0rem 1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1rem;
  background-color: ${({ selected }) => (selected ? 'maroon' : 'navy')};
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 768px) {
    padding: 0.5rem 0.5rem;
    margin: 0.5rem;
  }
`;

const Title = styled.h2`
  ${POPPINS_LIGHT}
  color: black;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  padding: 0.5rem 6rem;

  @media screen and (max-width: 768px) {
    padding: 0rem 1rem;
  }
`;

const FormatSection = s.section`
  padding: 0.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.5);
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  color: maroon;
  font-size: 2.5rem;
  text-align: center;
  position: relative;
  padding-bottom: .5rem;
  margin: 2rem;

  &::after {
    content: '';
    width: 50%;
    position: absolute;
    bottom: 0;
    left: 25%;
    border-bottom: 3px solid navy;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PeakAtPenn = () => {
  const [currentSection, setCurrentSection] = useState('newsletter');

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "peek.png" }) {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Container title="Peek at Penn | ">
      <Hero>
        <ImageWrapper>
          <Img fluid={data.file.childImageSharp.fluid} alt="Peek at Penn Logo" />
        </ImageWrapper>
        <p style={{ fontSize: '2.5rem' }}></p>
        <SubHead>
          Breaking into the Ivy League. Powered by the Ivy League.
        </SubHead>
        <ButtonContainer>
          <Button selected={currentSection === 'newsletter'} onClick={() => setCurrentSection('newsletter')}>Join Our Newsletter</Button>
          <Button selected={currentSection === 'programs'} onClick={() => setCurrentSection('programs')}>Summer Program Database</Button>
          <Button selected={currentSection === 'data'} onClick={() => setCurrentSection('data')}>Explore College Data</Button>
          <Button selected={currentSection === 'compare'} onClick={() => setCurrentSection('compare')}>Compare Colleges</Button>
          <Button selected={currentSection === 'profiles'} onClick={() => setCurrentSection('profiles')}>Admitted Student Profiles</Button>
          <Button selected={currentSection === 'similar'} onClick={() => setCurrentSection('similar')}>Find Similar Universities</Button>
        </ButtonContainer>
      </Hero>

      {currentSection === 'newsletter' && (
        <>
          <SectionTitle id="newsletter">OUR NEWSLETTER</SectionTitle>
          <Title>
            Sign up for our Biweekly newsletter which will provide you with all the information necessary to ace your Penn essays! News about the new ongoing on campus, the biggest changes in the general admissions world, and essays and profiles from current Penn students!
          </Title>
          <ContentGrid />
          <iframe src="https://forms.gle/wcYAGuKtkpBgXTG56" width="100%" height="1000rem" title='highschool_signup'>Loading…</iframe>
        </>
      )}

      {currentSection === 'programs' && (
        <>
          <SectionTitle id="programs">SUMMER PROGRAM DATABASE</SectionTitle>
          <ProgramData />
        </>
      )}

      {currentSection === 'data' && (
        <>
          <SectionTitle id="data">COLLEGE DATA</SectionTitle>
          <CollegeData />
        </>
      )}

      {currentSection === 'compare' && (
        <>
          <SectionTitle id="compare">COMPARE COLLEGES</SectionTitle>
          <CompareColleges />
        </>
      )}

      {currentSection === 'profiles' && (
        <>
          <SectionTitle id="profiles">ADMITTED PROFILES</SectionTitle>
          <StudentProfiles />
          <Title>
            For access to more admitted profiles, subscribe to our newsletter! Our first edition will contain 4 more profiles and 1-2 more in every one after!
          </Title>
        </>
      )}

      {currentSection === 'similar' && (
        <>
          <SectionTitle id="similar">Find Most Similar Colleges</SectionTitle>
          <SimilarColleges />
        </>
      )}
    </Container>
  );
};

export default PeakAtPenn;