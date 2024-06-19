"use client";

import BookmarkIcon from "@mui/icons-material/BookmarksTwoTone";
import ClubIcon from "@mui/icons-material/GroupsTwoTone";

import styled from "styled-components";

import EventCard from "../components/eventCard";
import ClubCard from "../components/clubCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../data'

import { useEffect, useState } from "react";

export default function LoggedInLanding({userId}) {

    const [savedEvents, setSavedEvents] = useState([]);
    const [savedClubs, setSavedClubs] = useState([]);
    
    const fetchSavedEvents = async () => {
        try {
            const res = await fetch("/api/landing/savedEvents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clerkId: userId,
                }),
                });
            
            if (!res.ok) {
                throw new Error('Failed to fetch savedEvents data');
            }
            setSavedEvents(await res.json());
        } catch (error) {
            console.error(error);
        }
      };
    
    const fetchSavedClubs = async () => {
    try {
        const res = await fetch("/api/landing/savedClubs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkId: userId,
            }),
            });
        
        if (!res.ok) {
            throw new Error('Failed to fetch savedClubs data');
        }
        setSavedClubs(await res.json());
    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
        fetchSavedEvents();
        fetchSavedClubs();
    }, []);

    if (Object.keys(savedEvents).length === 0 && Object.keys(savedClubs).length === 0) {
        return (
            <>
                <SectionTitle>
                    <BookmarkIcon className="title-icon" />
                    Saved Events
                </SectionTitle>
                <SectionTitle>
                    <ClubIcon className="title-icon" />
                    Your Clubs
                </SectionTitle>
            </>
        )
    } else {
        return (
            <>
                <SectionTitle>
                    <BookmarkIcon className="title-icon" />
                    Saved Events
                </SectionTitle>
                
                <div>
                    {savedEvents && (
                        <Carousel 
                        responsive={responsive}
                        itemClass="carousel-item-width-200px"
                        >
                        {savedEvents.map(savedEvent => (
                            <EventCard key = {savedEvent.id} event = {savedEvent}></EventCard>
                        ))}
                        </Carousel>
                    )}
                </div>
    
                <SectionTitle>
                    <ClubIcon className="title-icon" />
                    Your Clubs
                </SectionTitle>

                <div>
                    {savedClubs && (
                        <Carousel 
                        responsive={responsive}
                        itemClass="carousel-item-width-200px"
                        >
                        {savedClubs.map(savedClub => (
                            <ClubCard key = {savedClub.id} club = {savedClub}></ClubCard>
                        ))}
                        </Carousel>
                    )}
                </div>
            </>
        );
    }
  }

  const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;

  .title-icon {
    font-size: 1.5em;
  }
`;
