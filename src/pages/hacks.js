import React from 'react'
import s from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Col } from 'react-bootstrap'
import DepartmentsGrid from '../components/DepartmentsGrid'
import styled from 'styled-components';
import ContentGrid from '../components/Hackathon/TrackGrid'
import PrizesGrid from '../components/Hackathon/PrizeGrid'
import PartnersRow from '../components/Hackathon/PartnerScroll'
import {
  Container,
  LatestWork,
  Chevron,
  StyledLink,
  StyledAnchor,
  PageTitle
} from '../components'
import {
  POPPINS_BOLD,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_LIGHT,
  PLAYFAIR_DISPLAY_SEMI_BOLD,
  PLAYFAIR_DISPLAY_LIGHT,
  PLAYFAIR_DISPLAY_REGULAR,
  LATO_REGULAR,
  LATO_BOLD,
  MONTSERRAT_BOLD,
  MONTSERRAT_SEMI_BOLD,
  PLAYFAIR_DISPLAY_MEDIUM,
  MONTSERRAT_MEDIUM,
  POPPINS_MEDIUM,
  POPPINS_LIGHT
} from '../styles/fonts'
import { WHITE, RED } from '../styles/constants'

const Hero = s.div`
  text-align: center;
  color: white;
  ${POPPINS_SEMI_BOLD}
  padding-top: 3rem;
  padding-bottom: 1rem;
  
  animation: animateBg 10s linear infinite;
  background-image: radial-gradient(circle at center, #000000, #004d00, #008000, #000000);
  background-size: 400% 400%;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.5); // This adds a slight shadow for depth

  @keyframes animateBg {
    0%, 100% { background-position: 50% 0%; }
    50% { background-position: 50% 100%; }
  }
`

const HelloWorld = s.h1`
  ${POPPINS_BOLD}
  font-size: 6rem;
`

const SubHead = s.p`
  margin-top: 3rem;
  font-size: 90%;
`

const Checkout = s.p`
  ${POPPINS_BOLD}
  margin-top: 2rem;
  color: ${WHITE};
`

const Title = styled.h2`
  ${POPPINS_LIGHT}
  color: #003300;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  padding: 0.5rem;
`

const RecruitmentDescription = s.p`
  margin-top: 2.5rem;
  ${POPPINS_REGULAR}
  font-size: 0.9rem;
  color: white;
`

const ApplyButton = s.div`
  background-color: black;
  ${POPPINS_REGULAR}
  border-radius: 5px;
  width: 5rem;
  text-align: center;
  padding: 0.2rem 1rem;
  color: white;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`

const LeftColWrapper = s.div`
  padding-top: 4rem;
  padding-right: 5rem;

  @media (max-width: 992px) {
    margin-bottom: 2rem;
    padding-right: 0;
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

const SectionHeader = s.h2`
  ${POPPINS_MEDIUM}
  color: #000; // Adjust color to match your design
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const List = s.ul`
  list-style-type: none; // No bullets
  padding: 0rem 11rem;
  ${POPPINS_REGULAR}
  @media (max-width: 768px) {
    padding 0rem 1rem; // Smaller font size for mobile responsiveness
  }
`;

const ListItem = s.li`
  padding-bottom: 0.2rem; // Add space between list items
  padding-left: 1rem; // Add padding to the left of the text
  border-left: 4px solid #003300; // Blue line on the left, adjust the color as needed
`;

const ListSpacer= s.li`
  padding-bottom: 3.2rem; // Add space between list items
  padding-left: 1rem; // Add padding to the left of the text
  border-left: 4px solid #003300; // Blue line on the left, adjust the color as needed
`;

const InfoText = s.p`
  ${POPPINS_REGULAR}
  color: #333; // Dark grey text for readability
  font-size: 0.9rem;
  padding-left: 11rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif; // Or any other font that fits your design
  color: #004d00; // Assuming white text fits the theme based on the screenshot
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
    border-bottom: 3px solid #82c91e; // A light green color for the underline to match the theme
  }

  @media (max-width: 768px) {
    font-size: 1.5rem; // Smaller font size for mobile responsiveness
  }
`;

const PageDescription = s.p`
  ${MONTSERRAT_LIGHT}
  margin-top: 2rem;
`

const DescriptionWrapper = s.div`
  padding: 3rem 7rem;
  flex: 1;

  @media screen and (max-width: 768px) {
    padding: 4rem 1rem;
    text-align: center;
  }
`
const ImageWrapper = s.div`
  padding: 3rem 3rem;
  flex: 1;

  @media screen and (max-width: 768px) {
    padding: 4rem 1rem;
    text-align: center;
    display: none; /* Hide the image on small screens */
  }
`
const FlexRow = s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "pcs.png" }) {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Container title="Hacks | ">
      <Hero>
        <HelloWorld> DP Hacks </HelloWorld>
        <p style={{ fontSize: '2.5rem' }}></p>
        <SubHead>
            Build products to help the Penn community thrive, <br /> Solve problems you and your friends face daily.
        </SubHead>
      </Hero>
      <SectionTitle> FORMAT </SectionTitle>
      <Title> 
        DP Hacks will kick off with an in-person event on Saturday, September 21 and culminating with presentations and judging on September 28th
      </Title>
      <ContentGrid />
      <PrizesGrid />
      <FormatSection>
        <SectionTitle>LOGISTICS</SectionTitle>
        <List>
          <ListItem><strong>Eligiblity</strong></ListItem>
          <ListItem>All Penn students are welcome to enter either track of DP Hacks, regardless of previous experience. Technical and Pitch development workshops will be provided throughout the week of the hackathon.</ListItem>
          <ListSpacer />
          <ListItem><strong>Registration</strong></ListItem>
          <ListItem>Teams will be made of between 3-5 students. Registration is on a first-come, first-served basis, with the first 20 teams to register for each track being prioritized, and additional teams being promoted off the waitlist if opportunities arise. </ListItem>
          <ListItem />
          <ListItem>Teams must consist only of currently enrolled University of Pennsylvania students, and each student can compete in either the technical track OR the pitch track.</ListItem>
          <ListSpacer />
          <ListItem><strong>Kickoff Event</strong></ListItem>
          <ListItem>DP Hacks will kick off with an opening event on September 21st where particpants will get the chance to hear from and network with our keynote representative and representatives from our sponsors.</ListItem>
          <ListItem />
          <ListItem>Teams will also have the chance to attend our workshops on web development, integrating artificial intelligence into your projects, and developing cohesive picthes. Detailed instructions and rubrics for each track will be presented at the Kickoff as well, along with information on how to join our Slack workspace.</ListItem>        
          <ListSpacer />
          <ListItem><strong>Development Week</strong></ListItem>
          <ListItem>Spend the next week brainstorming, building, and refining your products before the final pitch day! There will be office hours for both tracks scattered throughout the week to help teams complete their projects.</ListItem>
          <ListItem />
          <ListItem>Technical Track Deliverables: Presentation, Relevant Code, Documentation</ListItem>
          <ListItem>Pitch Track Deliverables: Presentation, Audience Survey, Timeline and Implementation Proposal</ListItem>
          <ListSpacer />
          <ListItem><strong>Presentation Day</strong></ListItem>
          <ListItem>Present all the hard work you invested in the past week to our panel of professional and student judges, as well as all the other participants. Breakfast and Lunch will be provided, with presentations starting at 10:00 AM and winners being announced at 1:00 PM</ListItem>             
        </List>
        {/* ... more content ... */}
      </FormatSection>
      <FlexRow>
        <DescriptionWrapper>
          <SectionTitle>Example Project</SectionTitle>
          <PageDescription>
          Penn Course Search uses Natural Language Search to give Penn students truly comprehensive and detailed course recommendations. 
          It allows students to effectively search for and find classes that suit their interests without having to search through Path@Penn. 
          </PageDescription>
          <PageDescription>
          Penn Course Search is an artificial intelligence model using vector embedding, natural language processing, semantic search, and web development in React to fulfill needs for students on campus.
          </PageDescription>
        </DescriptionWrapper>
        <ImageWrapper>
          <Img fluid={data.file.childImageSharp.fluid} alt="Relevant Image" />
        </ImageWrapper>
      </FlexRow>
      <FormatSection>
        <SectionTitle>Our Partners</SectionTitle>
        <PartnersRow />
      </FormatSection>
    </Container>
  )
}

export default Index
