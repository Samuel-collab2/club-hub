"use client";

import Image from "next/image";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import heroSectionStyles from './heroSection.module.scss';
import infoTabsSectionStyles from './infoTabsSection.module.scss';
import upcomingEventsSectionStyles from './upcomingEventsSection.module.scss';
import pastEventsSectionStyles from './pastEventsSection.module.scss';

export default function ClubPageEvents() {

  const router = useRouter();
  const pathname = usePathname();
  const club_id = pathname.split("/")[2];

  const [clubName, setClubName] = useState();
  const [clubBanner, setClubBanner] = useState("");
  const [clubCampusId, setClubCampusId] = useState(0);
  const [clubIsPrivate, setClubIsPrivate] = useState("Private");
  const [campuses, setCampuses] = useState([]);
  const [events, setEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState({});
  const { isSignedIn } = useUser();

 useEffect(() => {
    fetch(`/api/club/${club_id}/?${isSignedIn ? "subscribed=true" : ""}`)
      .then((response) => response.json())
      .then((data) => {
        setClubDetails(data);
      });
  }, [club_id, isSignedIn]);
  
  function getFormattedDate(strDate) {

    const date = new Date(strDate);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleString('en-CA', options);
  }

  function compareDates(strDate) {
    const currDate = new Date().toLocaleString('en-CA');
    const date = new Date(strDate).toLocaleString('en-CA');

    if (currDate < date) {
        return true;
      }
    else {
      return false;
    }
  }

  useEffect(() => {
    fetch(`/api/club/${club_id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubName(data.name);
        setClubCampusId(data.campusId);
        setClubBanner(data.banner);
        
        if(data.isPrivate == false){
          setClubIsPrivate("Public");
        }
      });
    }, [club_id]);

  useEffect(() => {
    fetch(`/api/club/${club_id}/event`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  });

  useEffect(() => {
    fetch(`/api/campus`)
      .then((res) => res.json())
      .then((data) => {
        setCampuses(data);
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitClubSubscribe();
  };

  return (
    <section>
      <div className={heroSectionStyles.heroMedia}>
        <img
          className={heroSectionStyles.heroImage}
          src={clubBanner}
          alt="alt text"
        />

        <div className={heroSectionStyles.heroContent}>
          <div className={heroSectionStyles.heroHeader}>
            <h1 className={heroSectionStyles.heroTitle}>{clubName}</h1>
            <input type="image" className={heroSectionStyles.heroIcon1}
              src={'/assets/2152094a31abfd70bbf32f91a9554b62.svg'}
              alt="alt text"/>
            <a href={`../../dedicatedPageEdit/${club_id}`}>
            <input type="image" className={heroSectionStyles.heroIcon2}
              src={'/assets/bebb8c21b089f3ea8c7135d46aaafe06.svg'}
              alt="alt text"/>
            </a>
            <a href={`../../club/${club_id}/create-event`}>
            <input type="image" className={heroSectionStyles.heroIcon2}
              src={'/assets/create_event.png'}
              alt="alt text"/>
            </a>
          </div>
          
          <div className={heroSectionStyles.campusInfoRow}>
            <img
              className={heroSectionStyles.campusIcon}
              src={'/assets/fedbafb18efae7dfc6c39662c0c03719.svg'}
              alt="alt text"
            />
            {campuses.map((campus) => (
              <span key={campus.id}>
                {clubCampusId === campus.id && <h3 className={heroSectionStyles.campusSubtitle}>{campus.name}</h3>}
              </span>
            ))}
          </div>

          <div className={heroSectionStyles.memberInfoRow}>
            <img
              className={heroSectionStyles.memberIcon}
              src={'/assets/433fa6699ca1be2c2e0b2e6236e51ed5.svg'}
              alt="alt text"
            />
            <h3 className={heroSectionStyles.memberSubtitle}>{clubIsPrivate}</h3>
          </div>

          <button className={heroSectionStyles.subscribeButton}
            onClick={(e) => {
              e.preventDefault();
              fetch(`/api/club/${club_id}/subscribe`, {
                method: clubDetails.isSubscribed ? "DELETE" : "POST",
              }).then((response) => {
                if (response.ok) {
                  console.log("Subscribed to club");
                  setClubDetails({
                    ...clubDetails,
                    isSubscribed: clubDetails.isSubscribed ? false : true,
                  });
                } else {
                  console.error("Error subscribing to club");
                }
              });
            }}
          >
          {clubDetails.isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
          
        </div>
      </div>

      <div className={infoTabsSectionStyles.infoTabs}>
        <a href={`../../dedicatedPage/${club_id}`}>
          <button className={infoTabsSectionStyles.tab}>About</button>
        </a>
        <a href={`../../clubPageEvents/${club_id}`}>
        <button className={infoTabsSectionStyles.tab}>Events</button>
        </a>
        <a href={`../../members/${club_id}`}>
        <button className={infoTabsSectionStyles.tab}>Members</button>
        </a>
      </div>

      <div className={upcomingEventsSectionStyles.upcomingEvents}>
        <div className={upcomingEventsSectionStyles.upcomingEventsHeader}>
          <img
            className={upcomingEventsSectionStyles.upcomingEventsIcon}
            src={'/assets/a6371a4d550e64a7dac6f4fed815fa1d.svg'}
            alt="alt text"
          />
          <h1 className={upcomingEventsSectionStyles.upcomingEventsTitle}>Upcoming Events</h1>
        </div>
        
        {events.map((event) => (

        <span key={event.id}>
        
        {compareDates(event.dateTime) == true &&
      
        <div className={upcomingEventsSectionStyles.eventDetails}>

          <a href={`../../event/${event.id}`}>
            <img
              className={upcomingEventsSectionStyles.eventImage}
              src={event.banner}
              alt="alt text"
            />
          </a>

          <a href={`../../event/${event.id}`}>
            <h4 className={upcomingEventsSectionStyles.eventHighlight}>{event.name}</h4>
          </a>

          <div className={upcomingEventsSectionStyles.eventDateRow}>
            <img
              className={upcomingEventsSectionStyles.eventDateIcon}
              src={'/assets/c560b10fd9c614d0faf122dc24e619be.svg'}
              alt="alt text"
            />
            <div className={upcomingEventsSectionStyles.eventDateInfo}>{getFormattedDate(event.dateTime)}</div>
          </div>

          <div className={upcomingEventsSectionStyles.eventStats}>
            <div className={upcomingEventsSectionStyles.goingCountRow}>
              <img
                className={upcomingEventsSectionStyles.goingCountIcon}
                src={'/assets/5f4fce8ec6fb72712bcf18e30a081afb.svg'}
                alt="alt text"
              />
              <div className={upcomingEventsSectionStyles.goingCountInfo}>{event.participantsCount} going</div>
            </div>

            <div className={upcomingEventsSectionStyles.priceInfoRow}>
              <img
                className={upcomingEventsSectionStyles.priceIcon}
                src={'/assets/4e28d56d63af8adac73e0f183ff97adc.svg'}
                alt="alt text"
              />
              <div className={upcomingEventsSectionStyles.priceInfo}>FREE</div>
            </div>
          </div>
        </div>

        }
        
        </span>
          
        ))}

      </div>

      <br/>
      
      <div className={pastEventsSectionStyles.pastEvents}>
        <div className={pastEventsSectionStyles.pastEventsHeader}>
          <img
            className={pastEventsSectionStyles.pastEventsIcon}
            src={'/assets/5374c9aca678fa6fc8a9cfbe742093fc.png'}
            alt="alt text"
          />
          <h1 className={pastEventsSectionStyles.pastEventsTitle}>Past Events</h1>
        </div>

        {events.map((event) => (
  
        <span key={event.id}>
          
        {compareDates(event.dateTime) == false &&
        
        <div className={pastEventsSectionStyles.pastEventDetails}>

          <a href={`../../event/${event.id}`}>
            <img
              className={pastEventsSectionStyles.pastEventImage}
              src={event.banner}
              alt="alt text"
            />
          </a>

          <a href={`../../event/${event.id}`}>
            <h4 className={pastEventsSectionStyles.pastEventHighlight}>{event.name}</h4>
          </a>

          <div className={pastEventsSectionStyles.pastEventDateRow}>
            <img
              className={pastEventsSectionStyles.pastEventDateIcon}
              src={'/assets/7a6e450170995261970b12ccaa46c917.svg'}
              alt="alt text"
            />
            <div className={pastEventsSectionStyles.pastEventDateInfo}>{getFormattedDate(event.dateTime)}</div>
          </div>

          <div className={pastEventsSectionStyles.pastEventStats}>
            <div className={pastEventsSectionStyles.pastGoingCountRow}>
              <img
                className={pastEventsSectionStyles.pastGoingCountIcon}
                src={'/assets/61d82a469537c3dbe80133f49d8b9913.svg'}
                alt="alt text"
              />
              <div className={pastEventsSectionStyles.pastGoingCountInfo}>{event.participantsCount} going</div>
            </div>

            <div className={pastEventsSectionStyles.pastPriceInfoRow}>
              <img
                className={pastEventsSectionStyles.pastPriceIcon}
                src={'/assets/ed8ac27a230ffb140e984962a837b0e8.svg'}
                alt="alt text"
              />
              <div className={pastEventsSectionStyles.pastPriceInfo}>FREE</div>
            </div>
          </div>
        </div>

        }
        
        </span>

        ))}
        
      </div>
      
    </section>
  );
}
