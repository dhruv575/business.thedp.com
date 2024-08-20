import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { ContainerJoin } from '../components/containerJoin';
import { PLAYFAIR_DISPLAY_LIGHT, PLAYFAIR_DISPLAY_MEDIUM, POPPINS_REGULAR, POPPINS_SEMI_BOLD } from '../styles/fonts';

const Intro = styled.div`
    ${PLAYFAIR_DISPLAY_LIGHT}
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('https://snworksceo.imgix.net/dpn/f8bd2c63-c51f-4400-8a60-5251f553a0dd.sized-1000x1000.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: calc(100vh - 3rem);
`;

const IntroText = styled.div`
    color: #FFF;
    text-align: center;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;

    h1 {
        font-size: 3rem;
    }

    h3 {
        font-size: 2rem;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      h3 {
        font-size: 1.25rem;
      }
      margin-bottom: 5rem;
    }
`;

const JoinButton = styled.div`
    ${POPPINS_REGULAR}
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    border: 1px solid #AA1E22;
    border-radius: 8px;
    background-color: #AA1E22;
    color: #FFF;
    cursor: pointer;
    z-index: 1000; /* Ensure the button is above other elements */
    transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth transition for hover effects */

    &:hover {
        transform: scale(1.05); /* Slightly expand the button */
        background-color: #BB2E33; /* Change the background color on hover */
    }

    @media (max-width: 768px) {
        position: fixed;
        bottom: 20px;
        right: 10%;
        left: 10%;
        margin-top: 2rem;
    }
`;

const Section = styled.section`
  ${PLAYFAIR_DISPLAY_MEDIUM}
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 1.5rem;
    font-style: italic;
  }
  p {
    font-size: 1.1rem;
  }
  padding: 2rem 17rem;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 40rem;

  @media (max-width: 768px) {
      padding: 2rem 2rem;
      min-height: auto;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Wrap tabs to multiple rows on smaller screens */
  margin: 0rem 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0.5rem;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
    margin: 0.5rem 0.5rem;
  }
`;

const Content = styled.div`
  margin-top: 2rem;
  text-align: left;
`;

const Highlights = styled.ul`
  ${POPPINS_SEMI_BOLD}
  margin-top: 1rem;
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 0.5rem;

    a {
      color: inherit; /* Match link color to the rest of the section */
      text-decoration: underline;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const JoinPage = () => {
  const editorialData = require('../json/groups/editorial.json');
  const businessData = require('../json/groups/business.json');
  const utbData = require('../json/groups/utb.json');
  const disData = require('../json/groups/dis.json');
  const iaData = require('../json/groups/ia.json');
  const stData = require('../json/groups/street.json');

  const [selectedDepartments, setSelectedDepartments] = useState({
    editorial: editorialData[0].departments[0],
    business: businessData[0].departments[0],
    utb: utbData[0].departments[0],
    dis: disData[0].departments[0],
    ia: iaData[0].departments[0],
    st: stData[0].departments[0],
  });

  const handleTabClick = (group, department) => {
    setSelectedDepartments((prevSelected) => ({
      ...prevSelected,
      [group]: department
    }));
  };

  const renderSection = (data, groupKey) => {
    const group = data[0];
    const selectedDepartment = selectedDepartments[groupKey];

    if (group.departments.length === 1) {
      const department = group.departments[0];
      return (
        <Section key={groupKey} style={{ 
            background: department?.background, 
            color: group.color,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat" 
        }}>
          <h2>{department.department}</h2>
          <Content>
            {department?.text?.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            {department?.highlights && department.highlights.length > 0 && (
              <>
                <h3>Highlights</h3>
                <Highlights>
                  {department?.highlights?.map((highlight, idx) => (
                    <li key={idx}>
                      <a href={department?.highlightLinks[idx]} target="_blank" rel="noopener noreferrer">
                        {highlight}
                      </a>
                    </li>
                  ))}
                </Highlights>
              </>
            )}
          </Content>
        </Section>
      );
    } else {
      // Assign unique background colors for each tab
      const tabBackgrounds = ['#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF'];

      return (
        <Section key={groupKey} style={{ 
            background: selectedDepartment?.background, 
            color: group.color,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat" 
        }}>          
          <h2>{group.group}</h2>
          <p>{group.description}</p>
          <Tabs>
            {group.departments.map((department, idx) => (
              <Tab
                key={idx}
                onClick={() => handleTabClick(groupKey, department)}
                className={selectedDepartment.department === department.department ? 'active' : ''}
                style={{ background: tabBackgrounds[idx % tabBackgrounds.length] }}
              >
                {department.department}
              </Tab>
            ))}
          </Tabs>
          <Content>
            {selectedDepartment?.text?.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            {selectedDepartment?.highlights && selectedDepartment.highlights.length > 0 && (
              <>
                <h3>Highlights</h3>
                <Highlights>
                  {selectedDepartment?.highlights?.map((highlight, idx) => (
                    <li key={idx}>
                      <a href={selectedDepartment?.highlightLinks[idx]} target="_blank" rel="noopener noreferrer">
                        {highlight}
                      </a>
                    </li>
                  ))}
                </Highlights>
              </>
            )}
          </Content>
        </Section>
      );
    }
  };

  return (
    <ContainerJoin title="Join | ">
      <Intro>
        <IntroText>
          <h1>The Daily Pennsylvanian, Inc.</h1>
          <h3>Don't just live the story of a lifetime. Tell it.</h3>
          <Link to="#apply">
            <JoinButton>Join Now</JoinButton>
          </Link>
        </IntroText>
      </Intro>
      {renderSection(editorialData, 'editorial')}
      {renderSection(businessData, 'business')}
      {renderSection(stData, 'st')}
      {renderSection(utbData, 'utb')}
      {renderSection(disData, 'dis')}
      {renderSection(iaData, 'ia')}
      <section class="join" id="apply">
          <div class="section form">
            <iframe
              class="join-form"
              src="https://docs.google.com/forms/d/e/1FAIpQLScUUPevrvm_1IqAbYjqN8dHVZYVWLFmIEukGZcreq5QP2G9Og/viewform"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading...
            </iframe>
          </div>
        </section>
    </ContainerJoin>
  );
};

export default JoinPage;
