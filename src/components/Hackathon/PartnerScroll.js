import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const PartnersContainer = styled.div`
    display: flex;
    overflow-x: auto;
    align-items: center;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    margin: 2rem;
`;

const PartnerWrapper = styled.div`
    position: relative;
    flex-shrink: 0;
    margin-right: 20px;
    scroll-snap-align: start;
    cursor: pointer;
`;

const PartnerLogo = styled.img`
    height: 200px;
    transition: opacity 0.3s ease-in-out;
    width: 200px;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in-out;

    ${PartnerWrapper}:hover & {
        opacity: 1;
    }
`;

const PartnerName = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
`;

const PartnersRow = () => {
    const data = useStaticQuery(graphql`
        query PartnersData {
            allPartnersJson {
                edges {
                    node {
                        name
                        img {
                            publicURL
                        }
                        link
                    }
                }
            }
        }
    `);

    const handlePartnerClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <PartnersContainer>
            {data.allPartnersJson.edges.map(({ node }) => (
                <PartnerWrapper
                    key={node.name}
                    onClick={() => handlePartnerClick(node.link)}
                >
                    <PartnerLogo src={node.img.publicURL} alt={node.name} />
                    <Overlay>
                        <PartnerName>{node.name}</PartnerName>
                    </Overlay>
                </PartnerWrapper>
            ))}
        </PartnersContainer>
    );
};

export default PartnersRow;
