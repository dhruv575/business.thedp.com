import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { POPPINS_BOLD } from '../styles/fonts';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; // Three columns layout
  gap: 20px;
  padding: 1rem;
  background-color: #000080;
  color: white;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Single column layout for small screens
    padding: 0.5rem;
  }
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr; // Two rows each taking up 50% of the height
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-rows: auto; // Adjust to auto for small screens
    gap: 10px;
  }
`;

const MiddleColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr; // Two rows, top takes 25% and bottom takes 75%
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-rows: auto; // Adjust to auto for small screens
    gap: 10px;
  }
`;

const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr; // Three rows each taking up 1/3 of the height
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-rows: auto; // Adjust to auto for small screens
    gap: 10px;
  }
`;

const Section = styled.div`
  background-color: white;
  color: black;
  padding: 1rem; // Adjusted padding to 1rem
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.5rem; // Reduced padding for small screens
    font-size: 0.8rem; // Smaller font size for small screens
  }
`;

const Title = styled.h2`
  ${POPPINS_BOLD}
  font-size: 1.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.2rem; // Adjusted font size for small screens
  }
`;

const BoldNumber = styled.span`
  font-weight: bold;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px; // Optional: Adjust max-width as needed

  @media (max-width: 768px) {
    max-width: 100%; // Full width for small screens
  }
`;

const Subtitle = styled.h3`
  ${POPPINS_BOLD}
  color: #000;
  font-size: 1rem;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 0.9rem; // Adjusted font size for small screens
  }
`;

const DataDisplay = ({ data }) => {
  const getStats = (field) => {
    if (data[2024]?.[field]) return { value: data[2024][field], year: 2024 };
    if (data[2023]?.[field]) return { value: data[2023][field], year: 2023 };
    if (data[2022]?.[field]) return { value: data[2022][field], year: 2022 };
    return { value: 'N/A', year: null };
  };

  const totalUndergrads = getStats('total_ug');
  const acceptanceRateMen = getStats('men_adm')?.value / getStats('men_app')?.value;
  const acceptanceRateWomen = getStats('wom_adm')?.value / getStats('women_app')?.value;
  const totalAcceptanceRate = getStats('total_adm')?.value / getStats('total_app')?.value;
  const admitToEnrollRate = getStats('total_enr')?.value / getStats('total_adm')?.value;

  const rankings = [
    { year: 2022, ranking: data[2022]?.ranking || 0 },
    { year: 2023, ranking: data[2023]?.ranking || 0 },
    { year: 2024, ranking: data[2024]?.ranking || 0 },
  ];

  const waitlistData = Object.values(data).map(yearData => ({
    year: yearData.year,
    offers: yearData.wl_offer,
    accepts: yearData.wl_adm,
    rate: yearData.wl_offer ? (yearData.wl_adm / yearData.wl_offer) * 100 : null,
  })).filter(d => d.offers !== undefined && d.accepts !== undefined);

  const maxRate = Math.ceil(Math.max(...waitlistData.map(d => d.rate)) * 1.5 * 100) / 100;

  const applicantsData = Object.values(data).map(yearData => ({
    year: yearData.year,
    men: yearData.men_app,
    women: yearData.women_app,
  })).filter(d => d.men !== undefined && d.women !== undefined);

  const acceptanceRateData = Object.values(data).map(yearData => ({
    year: yearData.year,
    totalAcceptanceRate: yearData.total_app ? (yearData.total_adm / yearData.total_app) * 100 : null,
  })).filter(d => d.totalAcceptanceRate !== null);

  return (
    <Container>
      <LeftColumn>
        <Section>
          <Title>Rankings</Title>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={rankings}>
                <XAxis dataKey="year" />
                <YAxis domain={[0, Math.max(...rankings.map(r => r.ranking)) + 3]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ranking" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Section>
        <Section>
          <Title>General Statistics</Title>
          <p>Total Undergrads: <BoldNumber>{totalUndergrads.value}</BoldNumber> {totalUndergrads.year && `(From ${totalUndergrads.year})`}</p>
          <p>Acceptance Rate Men: <BoldNumber>{(acceptanceRateMen * 100).toFixed(2)}%</BoldNumber> {totalUndergrads.year && `(From ${totalUndergrads.year})`}</p>
          <p>Acceptance Rate Women: <BoldNumber>{(acceptanceRateWomen * 100).toFixed(2)}%</BoldNumber> {totalUndergrads.year && `(From ${totalUndergrads.year})`}</p>
          <p>Total Acceptance Rate: <BoldNumber>{(totalAcceptanceRate * 100).toFixed(2)}%</BoldNumber> {totalUndergrads.year && `(From ${totalUndergrads.year})`}</p>
          <p>Admit to Enroll Rate: <BoldNumber>{(admitToEnrollRate * 100).toFixed(2)}%</BoldNumber> {totalUndergrads.year && `(From ${totalUndergrads.year})`}</p>
        </Section>
      </LeftColumn>
      <MiddleColumn>
        <Section>
          <Title>Common Data Set Links</Title>
          {data[2022]?.link && <p><a href={data[2022].link} target="_blank" rel="noopener noreferrer">2022</a></p>}
          {data[2023]?.link && <p><a href={data[2023].link} target="_blank" rel="noopener noreferrer">2023</a></p>}
          {data[2024]?.link && <p><a href={data[2024].link} target="_blank" rel="noopener noreferrer">2024</a></p>}
        </Section>
        <Section>
          <Title>Admitted Student Statistics</Title>
          <Subtitle>Admitted ACT Scores</Subtitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={Object.values(data)}>
                <XAxis dataKey="year" />
                <YAxis domain={[30, 36]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="act_25" stroke="#8884d8" name="25th Percentile" />
                <Line type="monotone" dataKey="act_50" stroke="#82ca9d" name="50th Percentile" />
                <Line type="monotone" dataKey="act_75" stroke="#ffc658" name="75th Percentile" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <Subtitle>Admitted SAT Scores</Subtitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={Object.values(data)}>
                <XAxis dataKey="year" />
                <YAxis domain={[1400, 1600]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sat_25" stroke="#8884d8" name="25th Percentile" />
                <Line type="monotone" dataKey="sat_50" stroke="#82ca9d" name="50th Percentile" />
                <Line type="monotone" dataKey="sat_75" stroke="#ffc658" name="75th Percentile" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <Subtitle>Average Admitted GPA</Subtitle>
          {data[2024]?.avg_gpa ? (
            <p><BoldNumber>{data[2024].avg_gpa}</BoldNumber></p>
          ) : (
            <p>No GPA information provided</p>
          )}
        </Section>
      </MiddleColumn>
      <RightColumn>
        <Section>
          <Title>Waitlist Information</Title>
          {waitlistData.length ? (
            <ChartContainer>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={waitlistData}>
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, maxRate]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value, name, props) => `${props.payload.accepts}/${props.payload.offers}`} />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#82ca9d" name="Waitlist Acceptance Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p>No information regarding waitlists provided by this university.</p>
          )}
        </Section>
        <Section>
          <Title>Applicants Per Year</Title>
          {applicantsData.length ? (
            <ChartContainer>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={applicantsData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="men" stroke="#8884d8" name="Men Applicants" />
                  <Line type="monotone" dataKey="women" stroke="#82ca9d" name="Women Applicants" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p>No applicant information provided.</p>
          )}
        </Section>
        <Section>
          <Title>Acceptance Rate Per Year</Title>
          {acceptanceRateData.length ? (
            <ChartContainer>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={acceptanceRateData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalAcceptanceRate" stroke="#ffc658" name="Acceptance Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p>No acceptance rate information provided.</p>
          )}
        </Section>
      </RightColumn>
    </Container>
  );
};

export default DataDisplay;
