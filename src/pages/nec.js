import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaBook, FaClipboardList, FaRegUser } from 'react-icons/fa';
import { ContainerNEC } from '../components/containerNEC';

// Styled Components
const Intro = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('https://i.ibb.co/h26HfwM/shutterstock-342913100.jpg');
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

const Section = styled.div`
  background-color: ${(props) => (props.index % 2 === 0 ? '#AA1E22' : '#FFF')};
  color: #000;
  padding: 2rem;
  text-align: center;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PersonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add default box shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease; /* Smooth transitions */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Box shadow on hover */
    transform: scale(1.02); /* Slightly enlarge on hover */
  }
`;

const PersonImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const PersonName = styled.div`
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: bold;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;

  a {
    color: inherit;
    text-decoration: none;
    font-size: 1.5rem;
  }
`;

const ExpandableContent = styled.div`
  margin-top: 1rem;
  width: 100%;
  text-align: left;
`;

const NECPage = () => {
  const candidatesData = require('../json/nec/candidates.json');
  const [expandedCard, setExpandedCard] = useState({});

  const toggleExpand = (personIndex, type) => {
    setExpandedCard((prev) => ({
      ...prev,
      [personIndex]: prev[personIndex] === type ? null : type, // Toggle between expanded states
    }));
  };

  return (
    <ContainerNEC title="NEC Candidate Center | ">
      <Intro>
        <IntroText>
          <h1>NEC Candidate Center</h1>
          <h3>Presented by The Daily Pennsylvanian</h3>
        </IntroText>
      </Intro>
      {candidatesData.map((category, index) => (
        <Section key={index} index={index}>
          <CategoryTitle>{category.category}</CategoryTitle>
          <PeopleGrid>
            {category.people.map((person, personIndex) => (
              <PersonCard key={personIndex}>
                <PersonImage src={person.image} alt={person.name} />
                <PersonName>{person.name}</PersonName>
                <SocialLinks>
                  {person.email && (
                    <a href={person.email} target="_blank" rel="noopener noreferrer">
                      <FaEnvelope />
                    </a>
                  )}
                  {person.introduction && (
                    <a
                      href="#!"
                      onClick={() => toggleExpand(personIndex, 'bio')}
                      title="View Bio"
                    >
                      <FaRegUser />
                    </a>
                  )}
                  {person.platform_points && person.platform_points.length > 0 && (
                    <a
                      href="#!"
                      onClick={() => toggleExpand(personIndex, 'platform')}
                      title="View Platform"
                    >
                      <FaClipboardList />
                    </a>
                  )}
                </SocialLinks>
                {expandedCard[personIndex] === 'bio' && (
                  <ExpandableContent>
                    <h4>Bio:</h4>
                    <p>{person.introduction}</p>
                  </ExpandableContent>
                )}
                {expandedCard[personIndex] === 'platform' && person.platform_points && Array.isArray(person.platform_points) && (
                  <ExpandableContent>
                    <h4>Platform:</h4>
                    <ul>
                      {person.platform_points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </ExpandableContent>
                )}
              </PersonCard>
            ))}
          </PeopleGrid>
        </Section>
      ))}
    </ContainerNEC>
  );
};

export default NECPage;
