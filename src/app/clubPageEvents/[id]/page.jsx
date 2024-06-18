"use client";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import AuthWrapper from "../../components/AuthWrapper";
import UnbookmarkedIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import BookmarkedIcon from "@mui/icons-material/Bookmark";
import section2Styles from './section2.module.scss';
import section3Styles from './section3.module.scss';
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
  const [campusName, setCampusName] = useState("");
  const [campusAddress, setCampusAddress] = useState("");
  const [events, setEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState({});
  const { isSignedIn } = useUser();
  const [isItemBookmarked, setIsItemBookmarked] = useState(false);

 useEffect(() => {
    fetch(`/api/club/${club_id}/?${isSignedIn ? "subscribed=true" : ""}`)
      .then((response) => response.json())
      .then((data) => {
        setClubDetails(data);
      });
  }, [club_id, isSignedIn]);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/club/" + club_id + "/save")
        .then((res) => res.json())
        .then((data) => {
          setIsItemBookmarked(data.isSaved);
        });
    }
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
        setClubBanner(data.banner ? data.banner : '/assets/placeholder-image.jpg');
        
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
    fetch(`/api/club/${club_id}/campus`)
      .then((res) => res.json())
      .then((data) => {
        setCampusName(data.name);
        setCampusAddress(data.address);
      });
  }, [club_id]);

  return (
    <section>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image7} src={clubBanner} alt="alt text" />

        <div className={section2Styles.flex_col}>
          <div className={section2Styles.flex_row1}>
            <h1 className={section2Styles.hero_title}>{clubName}</h1>
            
            <AuthWrapper
              onClick={(e) => {
                e.preventDefault();
                fetch("/api/club/" + club_id + "/save", {
                  method: isItemBookmarked ? "DELETE" : "POST",
                }).then((data) => {
                  setIsItemBookmarked(!isItemBookmarked);
                });
              }}
            >
              {isItemBookmarked ? (
                <BookmarkedIcon className={section2Styles.image3} />
              ) : (
                <UnbookmarkedIcon className={section2Styles.image3} />
              )}
            </AuthWrapper>
            
            <a href={`../../dedicatedPageEdit/${club_id}`}>
            <input type="image" className={section2Styles.image4}
                src={'/assets/5fb51c06444454205dbde50d3c538e97.png'}
                alt="alt text"/>
            </a>

            <a href={`../../club/${club_id}/create-event`}>
            <input type="image" className={section2Styles.heroIcon2}
              src={'/assets/create_event.png'}
              alt="alt text"/>
            </a>
    
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image31}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle}>{campusName}</h3>
          </div>

          <div className={section2Styles.flex_row3}>
            <img
              className={section2Styles.image31}
              src={'/assets/433fa6699ca1be2c2e0b2e6236e51ed5.svg'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle1}>{clubIsPrivate}</h3>
          </div>

          <button className={section2Styles.btn}
            onClick={(e) => {
              e.preventDefault();
              fetch(`/api/club/${club_id}/subscribe`, {
                method: clubDetails.isSubscribed ? "DELETE" : "POST",
              }).then((response) => {
                if (response.ok) {
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

      <div className={section3Styles.flex_col}>
        <div className={section3Styles.flex_row}>
          <a href={`../../dedicatedPage/${club_id}`}>
            <button className={section3Styles.subtitle}>About</button>
          </a>
          <a href={`../../clubPageEvents/${club_id}`}>
            <button className={section3Styles.subtitle}>Events</button>
          </a>
          <a href={`../../members/${club_id}`}>
          <button className={section3Styles.subtitle}>Members</button>
          </a>
        </div>
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
              src={event.banner ? event.banner : '/assets/placeholder-image.jpg'}
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
              src={event.banner ? event.banner : '/assets/placeholder-image.jpg'}
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
