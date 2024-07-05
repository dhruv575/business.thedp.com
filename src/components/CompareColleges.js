import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CompareCollegesWrapper = styled.div`
  margin: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
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

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10%; // 1/9 of the screen width on both sides
  gap: 0%; // 1/9 of the screen width between the charts

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 0;
    gap: 0rem; // Reduced gap for mobile view
  }
`;

const ChartWrapper = styled.div`
  width: 40%; // 1/3 of the screen width

  @media (max-width: 768px) {
    width: 100%;
    margin-top: -1rem;
    margin-bottom: -5rem;
    padding: 0rem;
  }
`;

const ResponsiveRadarChart = styled(ResponsiveContainer)`
  margin-bottom: 0rem;

  @media (max-width: 768px) {
    height: 400px !important;
  }
`;

const CustomLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 0rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const LegendColor = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  border-radius: 50%;
`;

const RadarTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0rem;
  }
`;

const CompareColleges = () => {
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

  const universityData = data.allT20Json.edges.reduce((acc, { node }) => {
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

  const universities = Object.keys(universityData).map((university_name) => {
    const mostRecentData = getMostRecentData(universityData[university_name]);
    return {
      university_name,
      ranking: mostRecentData.ranking,
      acceptance_rate:
        mostRecentData.total_adm && mostRecentData.total_app
          ? ((mostRecentData.total_adm / mostRecentData.total_app) * 100).toFixed(2)
          : null,
      yield_rate:
        mostRecentData.total_enr && mostRecentData.total_adm
          ? ((mostRecentData.total_enr / mostRecentData.total_adm) * 100).toFixed(2)
          : null,
      undergrad_to_grad_ratio:
        mostRecentData.total_ug && mostRecentData.total_g
          ? (mostRecentData.total_ug / mostRecentData.total_g).toFixed(2)
          : null,
      total_applicants: mostRecentData.total_app || null,
      median_act: mostRecentData.act_50 || null,
      median_sat: mostRecentData.sat_50 || null,
      avg_gpa: mostRecentData.avg_gpa || null,
      ...nicheData[university_name]
    };
  });

  const [selectedUniversities, setSelectedUniversities] = useState(['', '', '']);

  const handleChange = (index) => (event) => {
    const newSelection = event.target.value;
    const updatedSelections = [...selectedUniversities];
    updatedSelections[index] = newSelection;

    if (updatedSelections.filter((uni) => uni === newSelection).length > 1) {
      updatedSelections[index] = '';
    }

    setSelectedUniversities(updatedSelections);
  };

  const selectedUniversityData = selectedUniversities
    .map((name) => universities.find((uni) => uni.university_name === name))
    .filter(Boolean);

  const dataKeys = [
    'ranking',
    'acceptance_rate',
    'yield_rate',
    'undergrad_to_grad_ratio',
    'total_applicants',
    'median_act',
    'median_sat',
    'avg_gpa',
  ];

  const nicheKeys = [
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
    'safety',
  ];

  const commonDataKeys = dataKeys.filter((key) =>
    selectedUniversityData.every((uni) => uni[key] !== null)
  );

  const commonNicheKeys = nicheKeys.filter((key) =>
    selectedUniversityData.every((uni) => uni[key] !== null)
  );

  const radarData = commonDataKeys.map((key) => {
    const obj = { metric: key.replace(/_/g, ' ').toUpperCase() };
    selectedUniversityData.forEach((uni) => {
      obj[uni.university_name] = uni[key];
    });
    return obj;
  });

  const nicheRadarData = commonNicheKeys.map((key) => {
    const obj = { metric: key.replace(/_/g, ' ').toUpperCase() };
    selectedUniversityData.forEach((uni) => {
      obj[uni.university_name] = uni[key];
    });
    return obj;
  });

  const radarDataWithScale = radarData.map((dataPoint) => {
    const metric = dataPoint.metric.toLowerCase().replace(/ /g, '_');
    const values = selectedUniversityData.map((uni) => parseFloat(uni[metric]));
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const scaledDataPoint = { metric: dataPoint.metric };
    selectedUniversityData.forEach((uni) => {
      const value = parseFloat(dataPoint[uni.university_name]);
      if (metric === 'acceptance_rate') {
        scaledDataPoint[uni.university_name] = 100 - value;
      } else if (metric === 'ranking') {
        scaledDataPoint[uni.university_name] = ((30 - value) / 30) * 100;
      } else if (metric === 'median_act') {
        scaledDataPoint[uni.university_name] = ((value - 27) / (36 - 27)) * 100;
      } else if (metric === 'median_sat') {
        scaledDataPoint[uni.university_name] = ((value - 1300) / (1600 - 1300)) * 100;
      } else {
        scaledDataPoint[uni.university_name] = (value / maxValue) * 100;
      }
    });
    return scaledDataPoint;
  });

  const nicheRadarDataWithScale = nicheRadarData.map((dataPoint) => {
    const scaledDataPoint = { metric: dataPoint.metric };
    selectedUniversityData.forEach((uni) => {
      const value = parseFloat(dataPoint[uni.university_name]);
      scaledDataPoint[uni.university_name] = (value / 10) * 100;
    });
    return scaledDataPoint;
  });

  const colors = ['#FF7F50', '#6495ED', '#90EE90'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = radarData.find(data => data.metric === label) || nicheRadarData.find(data => data.metric === label);
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}>
          <p>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${data ? data[entry.name] : 'N/A'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <CompareCollegesWrapper>
      <DropdownContainer>
        {selectedUniversities.map((selectedUniversity, index) => (
          <Dropdown
            key={index}
            value={selectedUniversity}
            onChange={handleChange(index)}
          >
            <Option value="" disabled>
              Select College {index + 1}
            </Option>
            {universities.map((university, idx) => (
              <Option
                key={idx}
                value={university.university_name}
                disabled={selectedUniversities.includes(university.university_name)}
              >
                {university.university_name}
              </Option>
            ))}
          </Dropdown>
        ))}
      </DropdownContainer>
      {selectedUniversityData.length > 1 && (
        <ChartsContainer>
          <ChartWrapper>
            <RadarTitle>Admission</RadarTitle>
            <ResponsiveRadarChart width="100%" height={330}>
              <RadarChart outerRadius="80%" data={radarDataWithScale}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                {selectedUniversityData.map((uni, index) => (
                  <Radar
                    key={index}
                    name={uni.university_name}
                    dataKey={uni.university_name}
                    stroke={colors[index]}
                    fill={colors[index]}
                    fillOpacity={0.5 + ((selectedUniversityData.length - index) / selectedUniversityData.length) * 0.1}
                  />
                ))}
              </RadarChart>
            </ResponsiveRadarChart>
          </ChartWrapper>
          <ChartWrapper>
            <RadarTitle>Student Life</RadarTitle>
            <ResponsiveRadarChart width="100%" height={330}>
              <RadarChart outerRadius="80%" data={nicheRadarDataWithScale}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                {selectedUniversityData.map((uni, index) => (
                  <Radar
                    key={index}
                    name={uni.university_name}
                    dataKey={uni.university_name}
                    stroke={colors[index]}
                    fill={colors[index]}
                    fillOpacity={0.5 + ((selectedUniversityData.length - index) / selectedUniversityData.length) * 0.1}
                  />
                ))}
              </RadarChart>
            </ResponsiveRadarChart>
          </ChartWrapper>
        </ChartsContainer>
      )}
      <CustomLegend>
        {selectedUniversityData.map((uni, index) => (
          <LegendItem key={index}>
            <LegendColor style={{ backgroundColor: colors[index] }} />
            {uni.university_name}
          </LegendItem>
        ))}
      </CustomLegend>
    </CompareCollegesWrapper>
  );
};

export default CompareColleges;
