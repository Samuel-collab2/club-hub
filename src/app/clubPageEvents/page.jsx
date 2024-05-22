"use client";

import Image from "next/image";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import heroSectionStyles from './heroSection.module.scss';
import infoSectionStyles from './infoSection.module.scss';
import upcomingEventsSectionStyles from './upcomingEventsSection.module.scss';
import pastEventsSectionStyles from './pastEventsSection.module.scss';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gtmtrddwcdkwtcqkabfr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bXRyZGR3Y2Rrd3RjcWthYmZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDI2MzI3NywiZXhwIjoyMDI5ODM5Mjc3fQ.b1HSvxxQtUjVEUnMHCNlkW66AqRYtUlZIRx2GR88qgg"
const supabase = createClient(supabaseUrl, supabaseKey)

const club_id = 1;
const campus_id = 2;

export default function ClubPageEvents() {

  const [clubName, setClubName] = useState();

  const [campusId, setCampusId] = useState(0);
  const [campusName, setCampusName] = useState("");
  const [campusAddress, setCampusAddress] = useState("");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getName();
    getEvents();
    getCampus();
  }, []);

  async function getName() {
    const{data} = await supabase
    .from("club")
    .select()
    .eq('id', club_id)
    .single();
    setClubName(data.name);
    setCampusId(data.campusId);
  }

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
    .eq('id', campus_id)
    .single();
    setCampusName(data.name);
    setCampusAddress(data.address);
  }

  return (
    <section className={heroSectionStyles.heroSection}>
      <div className={heroSectionStyles.flexRow1}>
        <img className={heroSectionStyles.heroImage} src={'/assets/stargazing_beach.png'} alt="alt text" />

        <div className={heroSectionStyles.flexColumn}>
          <div className={heroSectionStyles.flexRow2}>
            <h1 className={heroSectionStyles.heroTitle}>{clubName}</h1>
            <input type="image" className={heroSectionStyles.iconImage}
              src={'/assets/8ba5e9c0d0decad4815ff6e5124a4b93.svg'}
              alt="alt text"/>
            <input type="image" className={heroSectionStyles.iconImage1}
              src={'/assets/1c0f3a83137e8ac974c8a0004d0bdeea.svg'}
              alt="alt text"/>
          </div>

          <div className={heroSectionStyles.flexRow3}>
            <img
              className={heroSectionStyles.iconImage2}
              src={'/assets/30a9be582b65094f9db605dcf8c892c3.svg'}
              alt="alt text"
            />
            <h3 className={heroSectionStyles.subtitle}>{campusName}</h3>
          </div>

          <div className={heroSectionStyles.flexRow4}>
            <img
              className={heroSectionStyles.iconImage3}
              src={'/assets/fedbafb18efae7dfc6c39662c0c03719.svg'}
              alt="alt text"
            />
            <h3 className={heroSectionStyles.subtitle1}>236 members</h3>
          </div>

          <button className={heroSectionStyles.subscribeButton}>SUBSCRIBE</button>
        </div>
      </div>
      <div className={infoSectionStyles.flexColumn1}>
        <div className={infoSectionStyles.flexRow5}>
          <h3 className={infoSectionStyles.aboutSubtitle}>About</h3>
          <h3 className={infoSectionStyles.eventsSubtitle}>
            Events
            <br />
          </h3>
          <h3 className={infoSectionStyles.membersSubtitle}>Members</h3>
        </div>
        <img
          className={infoSectionStyles.iconImage}
          src={'/assets/6f815091f2e6c12f520d2fcfbc979a8d.svg'}
          alt="alt text"
        />
      </div>
      <div className={upcomingEventsSectionStyles.flexColumn2}>
        <div className={upcomingEventsSectionStyles.flexRow6}>
          <img
            className={upcomingEventsSectionStyles.eventImage}
            src={'/assets/7990116de1623ec4d243dd57ec1ae0d6.svg'}
            alt="alt text"
          />
          <h1 className={upcomingEventsSectionStyles.title}>Upcoming Events</h1>
        </div>

        {events.map((event) => (

        <div className={upcomingEventsSectionStyles.flexRow7}>
          
          <div className={upcomingEventsSectionStyles.contentBox4}>
            <div className={upcomingEventsSectionStyles.flexColumn3}>
              
              <div className={upcomingEventsSectionStyles.contentBox3}>
                <h4 className={upcomingEventsSectionStyles.highlight3}>{event.name}</h4>
              </div>

              <div className={upcomingEventsSectionStyles.contentBox}>
                <img
                  className={upcomingEventsSectionStyles.eventImage1}
                  src={'/assets/a78c0daea149b2e43f78c80ffdba8441.svg'}
                  alt="alt text"
                />
                <div className={upcomingEventsSectionStyles.eventInfo}>{event.dateTime}</div>
              </div>

              <div className={upcomingEventsSectionStyles.flexRow8}>
                <div className={upcomingEventsSectionStyles.contentBox1}>
                  <div className={upcomingEventsSectionStyles.goingInfo}>{event.maxCapacity}</div>
                  <img
                    className={upcomingEventsSectionStyles.eventImage3}
                    src={'/assets/5b7fb8d7a3dbedcdd66e7972298bbbd8.svg'}
                    alt="alt text"
                  />
                </div>

                <div className={upcomingEventsSectionStyles.contentBox11}>
                  <div className={upcomingEventsSectionStyles.freeInfo}>FREE</div>
                  <img
                    className={upcomingEventsSectionStyles.eventImage5}
                    src={'/assets/6f4b949751fe39570326a2f341ccd6c0.svg'}
                    alt="alt text"
                  />
                </div>
              </div>
            </div>

            <img className={upcomingEventsSectionStyles.coverImage} src={'/assets/team_meeting.png'} alt="alt text" />
          </div>

          <div className={upcomingEventsSectionStyles.flexColumn4}>
            <img
              className={upcomingEventsSectionStyles.coverImage1}
              src={'/assets/group_photo_1200_burrard.png'}
              alt="alt text"
            />

            <div className={upcomingEventsSectionStyles.flexColumn5}>
              <h4 className={upcomingEventsSectionStyles.highlight31}>{event.name}</h4>

              <div className={upcomingEventsSectionStyles.flexRow9}>
                <img
                  className={upcomingEventsSectionStyles.eventImage6}
                  src={'/assets/7dc6a2bd9077533758aff88c4177e409.svg'}
                  alt="alt text"
                />
                <div className={upcomingEventsSectionStyles.eventInfo6}>{event.dateTime}</div>
              </div>

              <div className={upcomingEventsSectionStyles.flexRow8}>
                <div className={upcomingEventsSectionStyles.flexRow10}>
                  <img
                    className={upcomingEventsSectionStyles.eventImage7}
                    src={'/assets/548b0d1b5c805941e2420c3876991a57.svg'}
                    alt="alt text"
                  />
                  <div className={upcomingEventsSectionStyles.goingInfo7}>{event.maxCapacity}</div>
                </div>

                <div className={upcomingEventsSectionStyles.flexRow11}>
                  <img
                    className={upcomingEventsSectionStyles.eventImage7}
                    src={'/assets/69d069f9ad28d26e54403de54948cdc6.svg'}
                    alt="alt text"
                  />
                  <div className={upcomingEventsSectionStyles.freeInfo8}>FREE</div>
                </div>
              </div>
            </div>
          </div>
        </div> 
 ))}
  
      </div>
      <div className={pastEventsSectionStyles.flexColumn6}>
        <div className={pastEventsSectionStyles.flexRow6}>
          <img className={pastEventsSectionStyles.eventImage} src={'/assets/history_icon.png'} alt="alt text" />
          <h1 className={pastEventsSectionStyles.title}>Past Events</h1>
        </div>

        <div className={pastEventsSectionStyles.flexColumn7}>
          <img
            className={pastEventsSectionStyles.coverImage1}
            src={'/assets/group_photo_1200_burrard.png'}
            alt="alt text"
          />

          <div className={pastEventsSectionStyles.flexColumn5}>
            <h4 className={pastEventsSectionStyles.highlight31}>Networking Event</h4>

            <div className={pastEventsSectionStyles.flexRow9}>
              <img
                className={pastEventsSectionStyles.eventImage1}
                src={'/assets/41790c907c0a2bb8ca662168a2b33930.svg'}
                alt="alt text"
              />
              <div className={pastEventsSectionStyles.eventInfo6}>FRI, JAN 31 · 13:00</div>
            </div>

            <div className={pastEventsSectionStyles.flexRow8}>
              <div className={pastEventsSectionStyles.flexRow10}>
                <img
                  className={pastEventsSectionStyles.eventImage2}
                  src={'/assets/931dd89d30d2ef9dc92ccebd4c401496.svg'}
                  alt="alt text"
                />
                <div className={pastEventsSectionStyles.goingInfo7}>10 going</div>
              </div>

              <div className={pastEventsSectionStyles.flexRow11}>
                <img
                  className={pastEventsSectionStyles.eventImage2}
                  src={'/assets/72607d683b1d6c5f973065850769f8b3.svg'}
                  alt="alt text"
                />
                <div className={pastEventsSectionStyles.freeInfo8}>FREE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
