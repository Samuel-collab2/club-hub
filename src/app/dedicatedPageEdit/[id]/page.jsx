"use client";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import section2Styles from './section2.module.scss';
import section3Styles from './section3.module.scss';
import section4Styles from './section4.module.scss';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gtmtrddwcdkwtcqkabfr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bXRyZGR3Y2Rrd3RjcWthYmZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDI2MzI3NywiZXhwIjoyMDI5ODM5Mjc3fQ.b1HSvxxQtUjVEUnMHCNlkW66AqRYtUlZIRx2GR88qgg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ClubPageEvents() {

  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [campusId, setCampusId] = useState(0);
  const [clubEmail, setClubEmail] = useState("");
  const [clubBanner, setClubBanner] = useState("");

  const [campusName, setCampusName] = useState("");
  const [campusAddress, setCampusAddress] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const club_id = pathname.split("/")[2];

  const handleSubmit = async (e) => {
    e.preventDefault();

    submitClub();
    submitCampus();
  };

  useEffect(() => {
    fetch(`/api/club/${club_id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubName(data.name);
        setClubDescription(data.description);
        setCampusId(data.campusId);
        setClubEmail(data.email);
        setClubBanner(data.banner);
      });
  }, [club_id]);
  
  useEffect(() => {
    getCampus();
  }, []);

  async function getCampus() {
    const {data} = await supabase
    .from("campus")
    .select()
    .eq('id', 2)
    .single();
    setCampusName(data.name);
    setCampusAddress(data.address);
  }

  async function submitClub() {
    const {error} = await supabase
    .from("club")
    .update({name : clubName, description: clubDescription, email : clubEmail})
    .eq('id', club_id)
    .single();
  }

  async function submitCampus() {
    const {error} = await supabase
    .from("campus")
    .update({address : campusAddress})
    .eq('id', 2)
    .single();
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image6} src={clubBanner} alt="alt text" />
        {/* '/assets/aea99ada115ff3911f9f589ad27ae004.png' */}
        <div className={section2Styles.flex_col}>
          <input className={section2Styles.content_box} value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder={clubName}/>
          <div className={section2Styles.flex_row1}>
            <img
              className={section2Styles.image3}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle}>{campusName}</h3>
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image3}
              src={'/assets/b736f8b9fc449e59127e240c8a4f7643.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle1}>236 members</h3>
          </div>

          <button className={section2Styles.btn} type="submit">SAVE</button>
        </div>
      </div>
      <div className={section3Styles.flex_row}>
        <button className={section3Styles.subtitle1}>About</button>
        <button className={section3Styles.subtitle1}>Events</button>
        <button className={section3Styles.subtitle1}>Members</button>
      </div>
      <div className={section4Styles.flex_row}>
        <textarea className={section4Styles.content_box1} value={clubDescription} onChange={(e) => setClubDescription(e.target.value)} placeholder={clubDescription}></textarea>

        <div className={section4Styles.flex_col}>
          <div className={section4Styles.flex_row1}>
            <img
              className={section4Styles.image4}
              src={'/assets/8961133439bbbf471da5bd11f08914fc.png'}
              alt="alt text"
            />
            <input className={section4Styles.content_box2} value={clubEmail} onChange={(e) => setClubEmail(e.target.value)} placeholder={clubEmail}/>
          </div>

          <div className={section4Styles.flex_row2}>
            <img
              className={section4Styles.image41}
              src={'/assets/6922a51e98d3431ae8de16a12e63d27d.png'}
              alt="alt text"
            />
            <textarea className={section4Styles.content_box2} value={campusAddress} onChange={(e) => setCampusAddress(e.target.value)} placeholder={campusAddress}/>
          </div>
        </div>
      </div>
      </form>
    </section>
  );
}
