import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

const Wrapper = styled.div`
  margin: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 200px;

  &:focus {
    border-color: #800000;
    outline: none;
  }
`;

const Option = styled.option`
  font-size: 1rem;
`;

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 1rem;

  @media (max-width: 768px) {
    align-items: center;
    margin: 1rem 0;
  }
`;

const Result = styled.div`
  margin: 0.5rem 0;
`;

const SimilarColleges = () => {
  const data = useStaticQuery(graphql`
    query {
      allT20Json {
        edges {
          node {
            university_name
            year
            ranking
            total_ug
            total_g
            total_app
            total_adm
            total_enr
            act_50
            sat_50
            avg_gpa
          }
        }
      }
      allNicheJson {
        edges {
          node {
            name
            academics
            value
            diversity
            campus
            athletics
            party_scene
            professors
            location
            dorms
            campus_food
            student_life
            safety
          }
        }
      }
    }
  `);

  const [selectedCollege, setSelectedCollege] = useState('');
  const [similarCollegesOverall, setSimilarCollegesOverall] = useState([]);
  const [similarCollegesAdmissions, setSimilarCollegesAdmissions] = useState([]);
  const [similarCollegesSocial, setSimilarCollegesSocial] = useState([]);

  const getMostRecentData = (universityData) => {
    const years = [2024, 2023, 2022];
    const result = {};
    const fields = ['ranking', 'total_app', 'total_adm', 'total_enr', 'total_ug', 'total_g', 'act_50', 'sat_50', 'avg_gpa'];

    fields.forEach(field => {
      for (const year of years) {
        if (universityData[year] && universityData[year][field] !== undefined && universityData[year][field] !== null) {
          result[field] = universityData[year][field];
          break;
        }
      }
    });

    return result;
  };

  const collegeData = data.allT20Json.edges.reduce((acc, { node }) => {
    const { university_name, year, ...rest } = node;
    if (!acc[university_name]) {
      acc[university_name] = {};
    }
    acc[university_name][year] = { year, ...rest };
    return acc;
  }, {});

  const nicheData = data.allNicheJson.edges.reduce((acc, { node }) => {
    const { name, ...rest } = node;
    acc[name] = rest;
    return acc;
  }, {});

  const allColleges = Object.keys(collegeData).map((university_name) => {
    const mostRecentData = getMostRecentData(collegeData[university_name]);
    return {
      university_name,
      ...mostRecentData,
      ...nicheData[university_name]
    };
  });

  const getRankings = (key, ascending = true) => {
    const sorted = [...allColleges]
      .filter(college => college[key] !== null && college[key] !== undefined)
      .sort((a, b) => (ascending ? a[key] - b[key] : b[key] - a[key]));
    const rankings = {};
    sorted.forEach((college, index) => {
      rankings[college.university_name] = index + 1;
    });
    return rankings;
  };

  const admissionsKeys = ['ranking', 'acceptance_rate'];
  const socialKeys = [
    'academics',
    'value',
    'diversity',
    'campus',
    'athletics',
    'party_scene',
    'professors',
    'location',
    'dorms',
    'campus_food',
    'student_life',
    'safety'
  ];

  const rankings = {
    overall: {},
    admissions: {},
    social: {}
  };

  allColleges.forEach(college => {
    rankings.overall[college.university_name] = 0;
    rankings.admissions[college.university_name] = 0;
    rankings.social[college.university_name] = 0;
  });

  admissionsKeys.forEach(key => {
    const keyRankings = getRankings(key, key !== 'ranking');
    Object.keys(keyRankings).forEach(college => {
      rankings.admissions[college] += keyRankings[college];
    });
  });

  socialKeys.forEach(key => {
    const keyRankings = getRankings(key);
    Object.keys(keyRankings).forEach(college => {
      rankings.social[college] += keyRankings[college];
    });
  });

  allColleges.forEach(college => {
    rankings.overall[college.university_name] =
      rankings.admissions[college.university_name] + rankings.social[college.university_name];
  });

  const findSimilarColleges = (selectedCollege) => {
    const selectedRankings = {
      overall: rankings.overall[selectedCollege],
      admissions: rankings.admissions[selectedCollege],
      social: rankings.social[selectedCollege]
    };

    const deviations = allColleges
      .filter(college => college.university_name !== selectedCollege)
      .map(college => {
        const deviation = {
          college: college.university_name,
          overall: Math.abs(rankings.overall[college.university_name] - selectedRankings.overall),
          admissions: Math.abs(rankings.admissions[college.university_name] - selectedRankings.admissions),
          social: Math.abs(rankings.social[college.university_name] - selectedRankings.social)
        };
        deviation.total = deviation.overall + deviation.admissions + deviation.social;
        return deviation;
      });

    deviations.sort((a, b) => a.total - b.total);

    const similarOverall = deviations.sort((a, b) => a.overall - b.overall).slice(0, 5).map(dev => dev.college);
    const similarAdmissions = deviations.sort((a, b) => a.admissions - b.admissions).slice(0, 5).map(dev => dev.college);
    const similarSocial = deviations.sort((a, b) => a.social - b.social).slice(0, 5).map(dev => dev.college);

    return { similarOverall, similarAdmissions, similarSocial };
  };

  useEffect(() => {
    if (selectedCollege) {
      const { similarOverall, similarAdmissions, similarSocial } = findSimilarColleges(selectedCollege);
      setSimilarCollegesOverall(similarOverall);
      setSimilarCollegesAdmissions(similarAdmissions);
      setSimilarCollegesSocial(similarSocial);
    }
  }, [selectedCollege]);

  return (
    <Wrapper>
      <DropdownContainer>
        <Dropdown value={selectedCollege} onChange={e => setSelectedCollege(e.target.value)}>
          <Option value="" disabled>Select a College</Option>
          {allColleges.map((college, idx) => (
            <Option key={idx} value={college.university_name}>
              {college.university_name}
            </Option>
          ))}
        </Dropdown>
      </DropdownContainer>
      {selectedCollege && (
        <ResultsWrapper>
          <ResultsContainer>
            <h3>Overall Similar Colleges</h3>
            {similarCollegesOverall.map((college, index) => (
              <Result key={index}>{index + 1}. {college}</Result>
            ))}
          </ResultsContainer>
          <ResultsContainer>
            <h3>Admissions Similar Colleges</h3>
            {similarCollegesAdmissions.map((college, index) => (
              <Result key={index}>{index + 1}. {college}</Result>
            ))}
          </ResultsContainer>
          <ResultsContainer>
            <h3>Social Life Similar Colleges</h3>
            {similarCollegesSocial.map((college, index) => (
              <Result key={index}>{index + 1}. {college}</Result>
            ))}
          </ResultsContainer>
        </ResultsWrapper>
      )}
    </Wrapper>
  );
};

export default SimilarColleges;
