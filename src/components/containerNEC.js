import React from 'react';
import s from 'styled-components';

import { Footer } from './footer';
import { Header } from './DPHeader';

import utb from '../images/utb.png';
import dp from '../images/dp.png';
import nec from '../images/nec.png'

const Wrapper = s.div`
  overflow-x: hidden;
`;

const TopBar = s.div`
  height: 4rem;
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
  }
`;

const ImageLink = s.a`
  margin: 0rem 1rem;
  img {
    height: 3rem; /* Adjust image height */
  }
`;

export const ContainerNEC = ({ children, title }) => (
  <Wrapper>
    <TopBar>
      <ImageContainer>
        <ImageLink href="https://www.penn-nec.org/" target="_blank" rel="noopener noreferrer">
          <img src={nec} alt="The NEC Logo" />
        </ImageLink>
      </ImageContainer>
    </TopBar>
    <Header title={title} />
    {children}
    <Footer />
  </Wrapper>
);