"use client";

import Image from "next/image";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import section2Styles from './section2.module.scss';
import section3Styles from './section3.module.scss';
import section4Styles from './section4.module.scss';

export default function DedicatedPage() {

  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);

  const [created_at, setCreated_at] = useState(new Date());
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [campusId, setCampusId] = useState(0);
  const [isPrivate, setIsPrivate] = useState(false);
  const [email, setEmail] = useState("");
  const [clubRoom, setClubRoom] = useState(0);
  const [banner, setBanner] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const clubId = pathname.split("/")[2];

  useEffect(() => {
    fetch(`/api/club/${clubId}`)
      .then((res) => res.json())
      .then((data) => setCreated_at(data.created_at))
      .then((data) => setDescription(data.description))
      .then((data) => setName(data.name))
      .then((data) => setCampusId(data.campusId))
      .then((data) => setIsPrivate(data.isPrivate))
      .then((data) => setEmail(data.email))
      .then((data) => setClubRoom(data.clubRoom))
      .then((data) => setBanner(data.banner))
      .then((data) => setIsApproved(data.isApproved));
  }, [clubId]);

  return (
    <section className={section2Styles.section2}>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image7} src={{banner}} alt="alt text" />

        <div className={section2Styles.flex_col}>
          <div className={section2Styles.flex_row1}>
            <h1 className={section2Styles.hero_title}>{name}</h1>
            <input type="image" className={section2Styles.image3}
                src={'/assets/7ca9d58c7e64329a243f5270e4daacc4.png'}
                alt="alt text"/>
            <input type="image" className={section2Styles.image4}
                src={'/assets/5fb51c06444454205dbde50d3c538e97.png'}
                alt="alt text"/>
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image31}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle}></h3>
          </div>

          <div className={section2Styles.flex_row3}>
            <img
              className={section2Styles.image31}
              src={'/assets/b736f8b9fc449e59127e240c8a4f7643.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle1}>236 members</h3>
          </div>

          <button className={section2Styles.btn}>SUBSCRIBE</button>
        </div>
      </div>

        <div className={section3Styles.flex_col}>
        <div className={section3Styles.flex_row}>
          <button className={section3Styles.subtitle}>About</button>
          <button className={section3Styles.subtitle}>Events</button>
          <button className={section3Styles.subtitle}>Members</button>
        </div>
      </div>

      <div className={section4Styles.flex_row}>
        <h5 className={section4Styles.highlight1}>
          
        </h5>
        <div className={section4Styles.flex_col}>
          <h4 className={section4Styles.highlight3}>Send Us a Message 📬</h4>

          <div className={section4Styles.content_box1}>
            <textarea className={section4Styles.content_box}/>
            <input type="image" className={section4Styles.image5}
                  src={'/assets/d58a14e2e1e7721ffe1193453276d567.png'}
                  alt="alt text"/>
          </div>

          <div className={section4Styles.flex_row1}>
            <img
              className={section4Styles.image4}
              src={'/assets/8961133439bbbf471da5bd11f08914fc.png'}
              alt="alt text"
            />
            <h5 className={section4Styles.highlight11}>{email}</h5>
          </div>

          <div className={section4Styles.flex_row2}>
            <img
              className={section4Styles.image4}
              src={'/assets/6922a51e98d3431ae8de16a12e63d27d.png'}
              alt="alt text"
            />
            <h5 className={section4Styles.highlight11}></h5>
          </div>
        </div>
      </div>
    </section>
  );
}
