"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/CorporateFareTwoTone";
import { sassNull } from "sass";
import { Input } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function SearchBar({ ...props }) {
  const [campuses, setCampuses] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch("/api/campus")
      .then((res) => res.json())
      .then((data) => {
        setCampuses(data);
        localStorage.setItem("campuses", JSON.stringify(data));
      });
  }, []);

  const handleSearch = () => {
    if (input !== null) {
      router.push(`/search?keyword=${input}`);
    }
  };

  return (
    <SearchbarContainer {...props}>
      <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
      <Searchbar
        type="text"
        placeholder="Search events or groups"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
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