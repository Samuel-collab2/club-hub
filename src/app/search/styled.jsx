import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin: auto;
  margin-bottom: 50px;
  padding: 10px; 
  border-radius: 10px; 
`;

export const KeywordInput = styled.input`
  display: block;
  padding: .375rem 1.75rem .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  color: #000A3E;
  border-radius: 10px;
  `;

export const FilterLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 5px;
  color: #000A3E; 
  font-size: 18px; 
  padding: 10px; 
  border-radius: 20px; 
  border-style: solid;
  border-color: #000A3E; 
`;

export const SelectComponent = styled.select`
display: block;
width: 100%;
padding: .375rem 1.75rem .375rem .75rem;
font-size: 1rem;
font-weight: 400;
color: white;
background-color: #000A3E;
border-radius: 10px;
`

export const PageButton = styled.button`
  background-color: #000A3E;
  color: white;
  border-radius: 20px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-color: #000A3E;
  font-weight: bold;
  font-size: 15px;
  
  `

export const FilterButton = styled.button`
  background-color: #000A3E;
  color: white;
  border-radius: 10px; 
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
  height: 50px;
  align-self: center;
  &:hover {
    background-color: #808080;
    color: #000A3E;
    cursor: pointer;
  }
  `