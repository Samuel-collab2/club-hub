"use client"

import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"

const links = [
  { name: 'Join Clubs', href: '#' },
  { name: 'Create Clubs', href: '#' },
  { name: 'View Events', href: '#' },
  { name: 'Register', href: '#' },
]
const stats = [
  { name: 'Number of BCIT Clubs', value: '10' },
  { name: 'Number of Other Clubs', value: '5' },
  { name: 'Number of Club Members', value: '60' },
  { name: 'Number of Events', value: '5' },
]

import CalendarIcon from "@mui/icons-material/EventNoteTwoTone";
import BookmarkIcon from "@mui/icons-material/BookmarksTwoTone";
import ClubIcon from "@mui/icons-material/GroupsTwoTone";

import styled from "styled-components";

export default function Example() {

  const { isSignedIn } = useUser()
  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/login/addToSupabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  }, [isSignedIn])

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
