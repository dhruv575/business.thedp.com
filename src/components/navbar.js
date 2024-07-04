import React, { useState } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

import { StyledLink } from './typography';
import { ApplyButtonNav } from './badge';
import { POPPINS_SEMI_BOLD } from '../styles/fonts';

const LINKS = [
  {
    name: 'Hacks',
    link: '/hacks'
  },
  {
    name: 'Peek@Penn',
    link: '/highschool'
  },
  {
    name: 'What We Do',
    link: '/team'
  },
  {
    name: 'Departments',
    link: '/departments',
    submenu: [
      { name: 'Innovation Lab', link: '/innovationlab' },
      { name: 'S&P', link: '/strategy' },
      { name: 'Finance', link: '/finance' },
      { name: 'Analytics', link: '/analytics' },
      { name: 'Consulting', link: '/consulting' }
    ]
  }
];

const NavBarText = styled(Navbar.Text)`
  ${POPPINS_SEMI_BOLD}
  font-color: #000000;
`;

const Flextainer = styled.div`
  padding: 0.5rem
`

const StyledNavDropdown = styled(NavDropdown)`
  &.dropdown {
    position: static;
  }
  
  .dropdown-toggle {
    color: black;
    padding: 0; // Adjust as necessary
    &:hover, &:focus {
      color: black;
    }

    /* If using Bootstrap's default caret, no need to set content for :after */
    &:after {
      content: none;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    box-shadow: 0px 5px 6px #00000029;
    border: 0;
  }
`;

const NavText = ({ link, name, submenu }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <Flextainer
      style={{ position: 'relative', marginRight: '1.5rem', display: 'flex', alignItems: 'center' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledLink to={link}>
        <NavBarText>{name}</NavBarText>
      </StyledLink>
      {submenu && (
        <StyledNavDropdown
          id={`dropdown-${name.toLowerCase()}`}
          title=""
          show={showDropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {submenu.map((item) => (
            <NavDropdown.Item key={item.link} href={item.link}>
              {item.name}
            </NavDropdown.Item>
          ))}
        </StyledNavDropdown>
      )}
    </Flextainer>
  );
};

const CollapseWrapper = styled(Navbar.Collapse)`
  justify-content: flex-end;
  margin: 0.5rem 0;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`;


export const NavBar = () => (
  <Navbar
    sticky="top"
    expand="lg"
    style={{
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 5px 6px #00000029',
      fontSize: '0.9rem'
    }}
  >
    <StyledLink to="/">
      <Navbar.Brand>
        <img src="/logo-rect.png" height="70" alt="logo" />
      </Navbar.Brand>
    </StyledLink>
    <Navbar.Toggle style={{ border: 'none' }}>
    </Navbar.Toggle>
    <Navbar.Collapse className="justify-content-end">
      <CollapseWrapper>
        {LINKS.map(link => (
          <NavText key={link.name} {...link} />
        ))}
        <StyledLink to="/apply">
          <ApplyButtonNav>Apply</ApplyButtonNav>
        </StyledLink>
      </CollapseWrapper>
    </Navbar.Collapse>
  </Navbar>
);
