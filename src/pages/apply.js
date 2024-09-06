import React from 'react'
import s from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import {
  Container,
  Badge,
  PageTitle,
  PageDescription,
  Chevron,
  StyledAnchor
} from '../components'
import { BLUE_PERCENT, RED, BLUE, WHITE } from '../styles/constants'
import { POPPINS_BOLD } from '../styles/fonts'

const Wrapper = s.div`
  background-color: ${BLUE_PERCENT(0.04)};
  padding: 3rem 0;
`

const IFrameWrapper = s.div`
  margin: auto;
  width: 80%;

  .iframe {
    height: calc(100% - 59px);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

const ImgWrapper = s.div`
  background-color: ${RED};
  border-radius: 22px;
  padding: 1rem;

  @media (max-width: 992px) {
    margin-top: 2rem;
  }
`

const roles = [
  'Innovation Lab',
  'Strategy & Promotions',
  'Analytics',
  'Finance',
  'Consulting'
  // 'Analytics'
  // 'Backend Engineer',
  // 'UI/UX Designers'
]

const StyledRow = s(Row)`
  margin: 5rem 0;
  padding-left: 5rem;
  padding-right: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const ApplyHere = s.span`
  ${POPPINS_BOLD}
  color: ${RED};
  margin-left: 0.3rem;
`

const Recruitment = ({ open }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "IMG_8363.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const img = data.file

  return (
    <>
      {open ? (
        <StyledRow>
          <Col lg={6}>
            <PageTitle> We're Recruiting! </PageTitle>
            <PageDescription>
            The Daily Pennsylvanian is a $3-million, student-run media organization. Our incredible teams work together to market our products and sustain our business. Through the DP, students experience working for a real company, with real staffers, clients, and revenues. Join one of our teams to gain an invaluable, hands-on experience unlike any other.
            </PageDescription>
            {roles.map(role => (
              <Badge> {role} </Badge>
            ))}
            <StyledAnchor
              href="https://docs.google.com/forms/d/e/1FAIpQLSeM4wn0TUuHr_fNb1e3lkClVR6yh0xNCth3_5zuhjkToG_GFg/viewform"
              target="_blank"
            >
              <div style={{ marginTop: '2rem' }}>
                <Chevron bgColor={BLUE} color={WHITE} />{' '}
                <ApplyHere> APPLY HERE </ApplyHere>
              </div>
            </StyledAnchor>
          </Col>
          <Col>
            <ImgWrapper>
              <Img fluid={img.childImageSharp.fluid} />
            </ImgWrapper>
          </Col>
        </StyledRow>
      ) : (
        <StyledRow>
          <Col lg={6}>
            <PageTitle> Applications have closed. </PageTitle>
            <PageDescription>
              Please apply next semester!
            </PageDescription>
          </Col>
          <Col>
            <ImgWrapper>
              <Img fluid={img.childImageSharp.fluid} />
            </ImgWrapper>
          </Col>
        </StyledRow>
      )}
    </>
  )
}


const Apply = () => {

  const recruiting = true;

  return (
    <>
      {recruiting ? (
        <Container title="Apply | ">
          <Recruitment open = {true}/>
        </Container>
      ) : (
        <Container title="Apply | ">
          <Recruitment open = {recruiting}/>
        </Container>
      )}
    </>
  )
}

export default Apply
