"use client";

import CalendarIcon from "@mui/icons-material/EventNoteTwoTone";
import BookmarkIcon from "@mui/icons-material/BookmarksTwoTone";
import ClubIcon from "@mui/icons-material/GroupsTwoTone";

import styled from "styled-components";

export default function Home() {
  return (
    <>
      <SectionTitle>
        <CalendarIcon className="title-icon" /> Upcoming Events
      </SectionTitle>
      <SectionTitle>
        <BookmarkIcon className="title-icon" />
        Saved Events
      </SectionTitle>
      <SectionTitle>
        <ClubIcon className="title-icon" />
        Your Clubs
      </SectionTitle>
    </>
  );
}

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;

  .title-icon {
    font-size: 1.5em;
  }
`;
