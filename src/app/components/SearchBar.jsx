"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/CorporateFareTwoTone";

export default function SearchBar({ ...props }) {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    fetch("/api/campus")
      .then((res) => res.json())
      .then((data) => {
        setCampuses(data);
        localStorage.setItem("campuses", JSON.stringify(data));
      });
  }, []);

  return (
    <SearchbarContainer {...props}>
      <SearchIcon />
      <Searchbar
        type="text"
        placeholder="Search events or groups"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log(e.target.value);
          }
        }}
      />
      <div style={{ width: "10px" }}></div>
      <SchoolIcon />
      <CampusSelector name="campus" id="campus-select">
        {campuses.map((campus) => {
          return (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          );
        })}
      </CampusSelector>
    </SearchbarContainer>
  );
}

const SearchbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
  border: 2px solid #000a3e;
  border-radius: 15px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`;

const Searchbar = styled.input`
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  border: none;
  outline: none;
  border-right: 2px solid #000a3e;
  height: 30px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const CampusSelector = styled.select`
  outline: none;
  border: none;
  width: 90%;
`;