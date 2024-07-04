import React from 'react'
import s from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Row, Col } from 'react-bootstrap'
import ProjectsCarousel from '../components/projectCarousel';

import { Container, PageTitle, Badge } from '../components'
import { LIGHT_BLUE, WHITE, RED, RED_PERCENT } from '../styles/constants'
import { POPPINS_LIGHT, POPPINS_BOLD, MONTSERRAT_LIGHT, MONTSERRAT_REGULAR, PLAYFAIR_DISPLAY_REGULAR } from '../styles/fonts'

const CardWrapper = s.div`
  background-color: ${WHITE};
  border-radius: 24px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.06);
  padding: 2rem 1rem;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;

  :hover {
    transform: scale(1.01);
  }
  transition: all 0.3s;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 2rem 0;
    margin: 1rem 0.5rem;
  }
`

const CardTitle = s.p`
  font-size: 1.4rem;
  ${POPPINS_BOLD}

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`

const CardDescription = s.div`
  ${POPPINS_LIGHT}
  margin-top: 2rem;
`

const MemberImg = s(Img)`
  border-radius: 50%;
  margin: auto;
  border: 5px solid ${RED};
`

const Card = ({ name, tags, img, emoji, from }) => (
  <CardWrapper>
    <Col md={6}>
      <MemberImg fluid={img?.childImageSharp?.fluid} />
    </Col>
    <Col md={6}>
      <CardTitle>
        {name} {emoji}
      </CardTitle>
      {tags.map(tag => (
        <Badge bgColor={RED_PERCENT(0.32)}> {tag} </Badge>
      ))}
      {from
        && <CardDescription> from {from} </CardDescription>
      }
    </Col>
  </CardWrapper>
)

const SectionWrapper = s.div`
  background-color: ${({ idx }) => (idx % 2 === 0 ? LIGHT_BLUE : WHITE)};
  padding: 4rem 7rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    padding: 4rem 1rem;
    text-align: center;
  }
`

const Members = ({ members }) => (
  <Row>
    {members.map(member => (
      <Col lg={4}>
        <Card {...member} />
      </Col>
    ))}
  </Row>
)

const TeamTitle = s.h2`
  ${PLAYFAIR_DISPLAY_REGULAR}
`

const TeamDescription = s.p`
  ${MONTSERRAT_REGULAR}
  width: 40%;
  margin-top: 0.9rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

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
    padding: 1rem 1rem;
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

const Teams = () => {
  const { allTeamJson, allProjectsJson, imageSharp } = useStaticQuery(graphql`
    query {
      allTeamJson {
        nodes {
          name
          description
          members {
            name
            tags
            emoji
            from
            img {
              childImageSharp {
                fluid(maxWidth: 1000, maxHeight: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      allProjectsJson {
        nodes {
          name
          description
          img {
            childImageSharp {
              fluid(maxWidth: 1000, maxHeight: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          team
          link
        }
      }
      imageSharp(fluid: { originalName: { eq: "analytics.png" } }) {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `);

  // Filter members and projects by team 'Innovation Lab'
  const filteredTeams = allTeamJson.nodes.map(team => ({
    ...team,
    members: team.members.filter(member => member.tags.includes("Analytics"))
  })).filter(team => team.members.length > 0);
  const filteredProjects = allProjectsJson.nodes.filter(project =>
    project.team === "Analytics"
  );

  return (
    <Container title="Analytics | ">
      <div style={{ marginTop: '2rem' }}>
        <FlexRow>
          <DescriptionWrapper>
            <PageTitle> Analytics </PageTitle>
            <PageDescription>
            While they teach the theory of finance in Wharton, the DP provides an ideal business laboratory where the money is real. The Finance & Accounting team is responsible for overseeing the finance and accounting functions of the Daily Pennsylvanian Inc. including budget creation, revenue and expenditure analysis, and investment strategy
            </PageDescription>
          </DescriptionWrapper>
          <ImageWrapper>
            <Img fluid={imageSharp.fluid} alt="Relevant Image" />
          </ImageWrapper>
        </FlexRow>
        <ProjectsCarousel projects={filteredProjects} />
        {filteredTeams.map((team, idx) => (
          <SectionWrapper idx={idx}>
            <TeamTitle>{team.name}</TeamTitle>
            <TeamDescription>{team.description}</TeamDescription>
            <Members members={team.members} />
          </SectionWrapper>
        ))}
      </div>
    </Container>
  )
}

export default Teams
