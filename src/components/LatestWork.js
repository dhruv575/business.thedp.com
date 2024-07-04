import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import {
  PLAYFAIR_DISPLAY_LIGHT,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../styles/fonts';

const LatestWorkWrapper = styled.div`
  margin: 4rem 8rem; // Adjusted to 4rem on sides for symmetry
  @media (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;

const Title = styled.h2`
  ${MONTSERRAT_MEDIUM}
  color: #800000;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const ProjectContainer = styled.div`
  border-radius: 10px;
  box-shadow: 0px 10px 10px 5px rgba(0.3, 0.3, 0.3, 0.3);
  padding: 1.5rem;
  margin: 1rem 1rem;
`;

const ProjectName = styled.h2`
  ${PLAYFAIR_DISPLAY_LIGHT}
  margin-top: 1rem;
`;

const ProjectDescription = styled.p`
  ${MONTSERRAT_REGULAR}
  font-size: 0.9rem;
`;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    slidesToSlide: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

export const LatestWork = () => {
  const data = useStaticQuery(graphql`
    query {
      allProjectsJson {
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
            link
          }
        }
      }
    }
  `);

  return (
    <LatestWorkWrapper>
      <Title>Our Projects</Title>
      <Carousel
        responsive={responsive}
        ssr
        infinite
        keyBoardControl
        customTransition="transform 1000ms ease-out"
        transitionDuration={1000}
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {data.allProjectsJson.edges.map(({ node }, index) => (
          <ProjectContainer key={index}>
            <Img fluid={node.img.childImageSharp.fluid} style={{ width: '100%', borderRadius: '10px' }} />
            <ProjectName>{node.name}</ProjectName>
            <ProjectDescription>{node.description}</ProjectDescription>
          </ProjectContainer>
        ))}
      </Carousel>
    </LatestWorkWrapper>
  );
};
