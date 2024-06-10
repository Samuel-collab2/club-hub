"use client";

import Image from "next/image";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import heroSectionStyles from './heroSection.module.scss';
import infoTabsSectionStyles from './infoTabsSection.module.scss';
import upcomingEventsSectionStyles from './upcomingEventsSection.module.scss';
import pastEventsSectionStyles from './pastEventsSection.module.scss';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gtmtrddwcdkwtcqkabfr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bXRyZGR3Y2Rrd3RjcWthYmZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDI2MzI3NywiZXhwIjoyMDI5ODM5Mjc3fQ.b1HSvxxQtUjVEUnMHCNlkW66AqRYtUlZIRx2GR88qgg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ClubPageEvents() {

  const router = useRouter();
  const pathname = usePathname();
  const club_id = pathname.split("/")[2];

  const [clubName, setClubName] = useState();
  const [clubBanner, setClubBanner] = useState("");

  const [campusId, setCampusId] = useState(0);
  const [campusName, setCampusName] = useState("");
  const [campusAddress, setCampusAddress] = useState("");

  const [events, setEvents] = useState([]);

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
  
  useEffect(() => {
    getEvents();
    getCampus();
  }, []);

  useEffect(() => {
    fetch(`/api/club/${club_id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubName(data.name);
        setCampusId(data.campusId);
        setClubBanner(data.banner);
      });
    }, [club_id]);

  async function getEvents() {
    const {data} = await supabase
    .from("event")
    .select()
    .eq('clubId', club_id);
    setEvents(data);
  }

  async function getCampus() {
    const {data} = await supabase
    .from("campus")
    .select()
    .eq('id', 2)
    .single();
    setCampusName(data.name);
    setCampusAddress(data.address);
  }

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
            <input type="image" className={heroSectionStyles.heroIcon2}
              src={'/assets/bebb8c21b089f3ea8c7135d46aaafe06.svg'}
              alt="alt text"/>
          </div>

          <div className={heroSectionStyles.campusInfoRow}>
            <img
              className={heroSectionStyles.campusIcon}
              src={'/assets/fedbafb18efae7dfc6c39662c0c03719.svg'}
              alt="alt text"
            />
            <h3 className={heroSectionStyles.campusSubtitle}>{campusName}</h3>
          </div>

          <div className={heroSectionStyles.memberInfoRow}>
            <img
              className={heroSectionStyles.memberIcon}
              src={'/assets/b79b5e5075715bc76b7fefcc22eccc97.svg'}
              alt="alt text"
            />
            <h3 className={heroSectionStyles.memberSubtitle}>236 members</h3>
          </div>

          <button className={heroSectionStyles.subscribeButton}>SUBSCRIBE</button>
        </div>
      </div>

      <div className={infoTabsSectionStyles.infoTabs}>
        <button className={infoTabsSectionStyles.tab}>About</button>
        <button className={infoTabsSectionStyles.tab}>Events</button>
        <button className={infoTabsSectionStyles.tab}>Members</button>
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

        <div className={upcomingEventsSectionStyles.eventDetails}>
          <img
            className={upcomingEventsSectionStyles.eventImage}
            src={'/assets/e9f82d7e596b1775099b9869af8622b5.png'}
            alt="alt text"
          />
          <h4 className={upcomingEventsSectionStyles.eventHighlight}>{event.name}</h4>

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

        <div className={pastEventsSectionStyles.pastEventDetails}>
          <img
            className={pastEventsSectionStyles.pastEventImage}
            src={'/assets/e9f82d7e596b1775099b9869af8622b5.png'}
            alt="alt text"
          />
          <h4 className={pastEventsSectionStyles.pastEventHighlight}>Hackathon 101</h4>

          <div className={pastEventsSectionStyles.pastEventDateRow}>
            <img
              className={pastEventsSectionStyles.pastEventDateIcon}
              src={'/assets/7a6e450170995261970b12ccaa46c917.svg'}
              alt="alt text"
            />
            <div className={pastEventsSectionStyles.pastEventDateInfo}>Friday, Jan 31, 2024 at 1:00 p.m.</div>
          </div>

          <div className={pastEventsSectionStyles.pastEventStats}>
            <div className={pastEventsSectionStyles.pastGoingCountRow}>
              <img
                className={pastEventsSectionStyles.pastGoingCountIcon}
                src={'/assets/61d82a469537c3dbe80133f49d8b9913.svg'}
                alt="alt text"
              />
              <div className={pastEventsSectionStyles.pastGoingCountInfo}>10 going</div>
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
      </div>
    </section>
  );
}
