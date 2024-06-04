import React from 'react';
import styled from 'styled-components';

const StyledSearchItem = styled.div`
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    padding: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledImage = styled.img`
    width: 20%;
    margin-right: 20px;
    object-fit: contain;

    @media (max-width: 768px) {
        width: 100%;
        margin-right: 0px;
    }
`;

const StyledContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const StyledTitle = styled.h1`
    margin: 10px;
    font-size: 1.5em;
    margin-bottom: 5px;
`;

const StyledDescription = styled.p`
    margin: 10px;
    font-size: 1em;
    line-height: 1.4;
`;

export default function SearchItem({ name, description, banner }) {
    return (
        <StyledSearchItem>
            <StyledImage src={banner} alt={name} />
            <StyledContent>
                <StyledTitle>{name}</StyledTitle>
                <StyledDescription>{description}</StyledDescription>
            </StyledContent>
        </StyledSearchItem>
    );
}
