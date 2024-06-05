"use client"

import { useEffect, useState } from "react";
import CalendarIcon from "@mui/icons-material/EventNoteTwoTone";


import styled from "styled-components";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../data'

//components
import EventCard from "./eventCard"

export default function UniversalLanding({}) {
  const [events, setEvents] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/event');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      setEvents(await response.json())
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <SectionTitle>
        <CalendarIcon className="title-icon" /> Upcoming Events
      </SectionTitle>

      <Temp>
        {events && (
            <Carousel 
              responsive={responsive}
              itemClass="carousel-item-width-200px"
            >
              {events.map(event => (
                <EventCard key = {event.id} event = {event}></EventCard>
              ))}
            </Carousel>
          )}
      </Temp>
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


const Temp = styled.div`

  // Use to alter carousel items
  ul > li {
    max-width: 250px;
  }
`;