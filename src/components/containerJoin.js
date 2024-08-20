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
  
  @media (max-width: 768px) {
    justify-content: center; /* Center the DP logo */
  }
`;

const ImageLink = s.a`
  margin: 0 1rem; /* Spacing between images */
  
  img {
    width: 12rem; /* Adjust image height */
    display: block;
  }
`;

export const ContainerJoin = ({ children, title }) => (
  <Wrapper>
    <TopBar>
      <ImageLink href="https://www.thedp.com/" target="_blank" rel="noopener noreferrer">
        <img src={dp} alt="The Daily Pennsylvanian" />
      </ImageLink>
    </TopBar>
    <Header title={title} />
    {children}
    <Footer />
  </Wrapper>
);
