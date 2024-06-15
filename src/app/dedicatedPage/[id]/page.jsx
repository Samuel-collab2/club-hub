"use client";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import section2Styles from './section2.module.scss';
import section3Styles from './section3.module.scss';
import section4Styles from './section4.module.scss';

export default function DedicatedPage() {

  const router = useRouter();
  const pathname = usePathname();
  const club_id = pathname.split("/")[2];

  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubCampusId, setClubCampusId] = useState(0);
  const [clubEmail, setClubEmail] = useState("");
  const [clubBanner, setClubBanner] = useState("");
  const [clubIsPrivate, setClubIsPrivate] = useState("Private");
  const [campuses, setCampuses] = useState([]);
  const [clubDetails, setClubDetails] = useState({});
  const { isSignedIn } = useUser();

  useEffect(() => {
    fetch(`/api/club/${club_id}/?${isSignedIn ? "subscribed=true" : ""}`)
      .then((response) => response.json())
      .then((data) => {
        setClubDetails(data);
      });
  }, [club_id, isSignedIn]);
  
  useEffect(() => {
    fetch(`/api/club/${club_id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubName(data.name);
        setClubDescription(data.description);
        setClubCampusId(data.campusId);
        setClubEmail(data.email);
        setClubBanner(data.banner);

        if(data.isPrivate == false){
          setClubIsPrivate("Public");
        }
      });
    }, [club_id]);

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
    <section className={section2Styles.section2}>
      <form onSubmit={handleSubmit}>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image7} src={clubBanner} alt="alt text" />

        <div className={section2Styles.flex_col}>
          <div className={section2Styles.flex_row1}>
            <h1 className={section2Styles.hero_title}>{clubName}</h1>
            <input type="image" className={section2Styles.image3}
                src={'/assets/7ca9d58c7e64329a243f5270e4daacc4.png'}
                alt="alt text"/>
            <a href={`../../dedicatedPageEdit/${club_id}`}>
            <input type="image" className={section2Styles.image4}
                src={'/assets/5fb51c06444454205dbde50d3c538e97.png'}
                alt="alt text"/>
            </a>
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image31}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            {campuses.map((campus) => (
              <span key={campus.id}>
                {clubCampusId === campus.id && <h3 className={section2Styles.subtitle}>{campus.name}</h3>}
              </span>
            ))}
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

      <div className={section4Styles.flex_row}>
        <h5 className={section4Styles.highlight1}>
          {clubDescription}
        </h5>
        <div className={section4Styles.flex_col}>
          <h4 className={section4Styles.highlight3}>Send Us a Message 📬</h4>

          <div className={section4Styles.content_box1}>
            <form action={"mailto:" + clubEmail} method="post" enctype="text/plain">
              <textarea className={section4Styles.content_box}/>
              <input type="image" className={section4Styles.image5}
                    src={'/assets/d58a14e2e1e7721ffe1193453276d567.png'}
                    alt="Submit"/>
            </form>
          </div>

          <div className={section4Styles.flex_row1}>
            <img
              className={section4Styles.image4}
              src={'/assets/8961133439bbbf471da5bd11f08914fc.png'}
              alt="alt text"
            />
            <h5 className={section4Styles.highlight11}>{clubEmail}</h5>
          </div>

          <div className={section4Styles.flex_row2}>
            <img
              className={section4Styles.image4}
              src={'/assets/6922a51e98d3431ae8de16a12e63d27d.png'}
              alt="alt text"
            />
            {campuses.map((campus) => (
              <span key={campus.id}>
                {clubCampusId === campus.id && <h5 className={section4Styles.highlight11}>{campus.address}</h5>}
              </span>
            ))}
          </div>
        </div>
      </div>
      </form>
    </section>
  );
}
