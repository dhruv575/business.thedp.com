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

const ResponsiveRadarChart = styled(ResponsiveContainer)`
  @media (max-width: 768px) {
    height: 400px !important;
  }
`;

const CustomLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
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

  const commonDataKeys = dataKeys.filter((key) =>
    selectedUniversityData.every((uni) => uni[key] !== null)
  );

  const radarData = commonDataKeys.map((key) => {
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
        scaledDataPoint[uni.university_name] = 100 - ((value - minValue) / (maxValue - minValue)) * 50;
      } else if (metric === 'ranking') {
        scaledDataPoint[uni.university_name] = ((25 - value) / 25) * 100;
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

  const colors = ['#FF7F50', '#6495ED', '#90EE90'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
              {`${entry.name}: ${radarData.find(data => data.metric === label)[entry.name]}`}
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
        <>
          <ResponsiveRadarChart width="100%" height={400}>
            <RadarChart outerRadius="70%" data={radarDataWithScale}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
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
          <CustomLegend>
            {selectedUniversityData.map((uni, index) => (
              <LegendItem key={index}>
                <LegendColor style={{ backgroundColor: colors[index] }} />
                {uni.university_name}
              </LegendItem>
            ))}
          </CustomLegend>
        </>
      )}
    </CompareCollegesWrapper>
  );
};

export default CompareColleges;