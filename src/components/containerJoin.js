import React from 'react';
import s from 'styled-components';

import { Footer } from './footer';
import { Header } from './header';

import utb from '../images/utb.png';
import dp from '../images/dp.png';
import street from '../images/street.png';

const Wrapper = s.div`
  overflow-x: hidden;
`;

const TopBar = s.div`
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000; /* Adjust the background color as needed */
`;

const ImageContainer = s.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
    a:not(:nth-child(2)) {
      display: none;
    }
  }
`;

const ImageLink = s.a`
  margin: 0rem 1rem;
  img {
    height: 1.25rem; /* Adjust image height */
  }
`;

export const ContainerJoin = ({ children, title }) => (
  <Wrapper>
    <TopBar>
      <ImageContainer>
        <ImageLink href="https://www.thedp.com/" target="_blank" rel="noopener noreferrer">
          <img src={utb} alt="The Daily Pennsylvanian" />
        </ImageLink>
        <ImageLink href="https://www.thedp.com/" target="_blank" rel="noopener noreferrer">
          <img src={dp} alt="The Daily Pennsylvanian" />
        </ImageLink>
        <ImageLink href="https://www.thedp.com/" target="_blank" rel="noopener noreferrer">
          <img src={street} alt="The Daily Pennsylvanian" />
        </ImageLink>
      </ImageContainer>
    </TopBar>
    <Header title={title} />
    {children}
    <Footer />
  </Wrapper>
);