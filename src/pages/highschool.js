import React from 'react'
import s from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components';
import ContentGrid from '../components/hsGrid'
import CollegeData from '../components/collegedata';

import {
  Container
} from '../components'
import {
  POPPINS_SEMI_BOLD,
  POPPINS_LIGHT
} from '../styles/fonts'

const Hero = s.div`
  text-align: center;
  color: white;
  ${POPPINS_SEMI_BOLD}
  padding-top: 3rem;
  padding-bottom: 1rem;
  
  background-color: #f2f2f2; // Change the background as needed
  box-shadow: 0px 4px 4px rgba(0,0,0,0.5); // This adds a slight shadow for depth
`;

const ImageWrapper = s.div`
  padding: 0rem 20%;
  flex: 1;
  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
    text-align: center;
  }
`

const SubHead = s.p`
  margin-top: 1rem;
  font-size: 110%;
  color: maroon;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: navy;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  transition: transform 0.3s ease;

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
`

const FormatSection = s.section`
  padding: 0.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f2f2f2; // Change the background as needed
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.5); // This adds a slight shadow for depth
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif; // Or any other font that fits your design
  color: maroon; // Assuming white text fits the theme based on the screenshot
  font-size: 2.5rem; // Larger font size for prominence
  text-align: center; // Center-aligned text
  position: relative;
  padding-bottom: .5rem; // Space for the underline
  margin: 2rem; // More space below the title

  &::after {
    content: '';
    width: 50%; // Width of the underline
    position: absolute;
    bottom: 0;
    left: 25%; // Center the underline
    border-bottom: 3px solid navy; // A light green color for the underline to match the theme
  }

  @media (max-width: 768px) {
    font-size: 1.5rem; // Smaller font size for mobile responsiveness
  }
`;

const PeakAtPenn = () => {
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
  `)

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
          <Button href="#newsletter-section">Join Our Newsletter</Button>
          <Button href="#data-section">Explore College Data</Button>
        </ButtonContainer>
      </Hero>
      <SectionTitle id="data-section">COLLEGE DATA</SectionTitle>       
      <CollegeData />  
      <FormatSection id="newsletter-section">
        <SectionTitle> OUR NEWSLETTER </SectionTitle>
        <Title> 
            Sign up for our Biweekly newsletter which will provide you with all the information necessary to ace your Penn essays! News about the new ongoing on campus, the biggest changes in the general admissions world, and essays and profiles from current Penn students!
        </Title>
        <ContentGrid />
        <iframe src="https://forms.gle/wcYAGuKtkpBgXTG56" width="100%" height="1000rem" title='highschool_signup'>Loading…</iframe>
      </FormatSection>
    </Container>
  )
}

export default PeakAtPenn
