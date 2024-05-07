"use client";

import { useState } from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ScrollableText from "../../components/ScrollableText";
import AuthWrapper from "../../components/AuthWrapper";
import UnbookmarkedIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import BookmarkedIcon from "@mui/icons-material/Bookmark";
import CalendarIcon from "@mui/icons-material/CalendarMonthTwoTone";
import Locationicon from "@mui/icons-material/LocationOnTwoTone";
import VirtualLocationIcon from "@mui/icons-material/VideocamTwoTone";
import PeopleIcon from "@mui/icons-material/PeopleAltTwoTone";

export default function Event({}) {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.replace("/event/", "");
  const [isItemBookmarked, setIsItemBookmarked] = useState(false);

  const eventDetail = {
    id: 1,
    clubId: 4,
    name: "Badminton Fun Games",
    dateTime: "2025-05-06T06:44:00Z",
    description:
      "Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description Event description",
    location: "123 Moscropt St, Burnaby, BC",
    isVirtual: false,
    maxCapacity: 10,
    banner:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  const clubDetail = {
    name: "Badminton Club",
  };

  function getFormattedDate(dateString) {
    const date = new Date(dateString);

    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <div
      style={{
        width: "100vw",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <EventContainer>
        <EventTitle>
          <Title>
            {eventDetail.name}
            <AuthWrapper
              onClick={(e) => {
                e.preventDefault();
                console.log("Bookmark event");
                setIsItemBookmarked(!isItemBookmarked);
              }}
            >
              {isItemBookmarked ? (
                <BookmarkedIcon fontSize="big" />
              ) : (
                <UnbookmarkedIcon fontSize="big" />
              )}
            </AuthWrapper>
          </Title>
          <span
            id="club-event-hyperlink"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/club/${eventDetail.clubId}`);
            }}
          >
            by <u>{clubDetail.name}</u>
          </span>
        </EventTitle>
        <EventDescription>
          <Image
            src={eventDetail.banner}
            alt="banner"
            width={500}
            height={300}
            id="event-image"
          />
          <EventInformation id="event-information-conainer">
            <ScrollableText
              text={eventDetail.description}
              height="125px"
              id="event-description"
            />
            <span className="event-information">
              <CalendarIcon fontSize="medium" />
              {getFormattedDate(eventDetail.dateTime)}
            </span>
            <span className="event-information">
              {eventDetail.isVirtual ? (
                <VirtualLocationIcon fontSize="medium" />
              ) : (
                <Locationicon fontSize="medium" />
              )}

              {eventDetail.location}
            </span>
            <span className="event-information">
              <PeopleIcon fontSize="medium" />
              10{" "}
              {new Date(eventDetail.dateTime) > new Date() ? "going" : "went"}
            </span>
          </EventInformation>
        </EventDescription>
      </EventContainer>
      <EventSummaryContainer>
        <div id="event-summary-content">
          <p>
            {getFormattedDate(eventDetail.dateTime)}
            <br /> <b id="event-name-summary">{eventDetail.name}</b>
          </p>
          {new Date(eventDetail.dateTime) > new Date() && (
            <JoinActionContainer>
              <AuthWrapper
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Join event");
                }}
              >
                <JoinButton>
                  {eventDetail.maxCapacity ? "Request to Join" : "Join"}
                </JoinButton>
              </AuthWrapper>
              {eventDetail.maxCapacity && <span>10 spots left</span>}
            </JoinActionContainer>
          )}
        </div>
      </EventSummaryContainer>
    </div>
  );
}

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
  max-width: 1024px;
`;

const EventTitle = styled.div`
  margin-bottom: 36px;

  & > * {
    margin: 0;
  }

  #club-event-hyperlink {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  align-items: center;
  display: flex;
  gap: 10px;
`;

const EventDescription = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-height: 300px;

  #event-image {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 5px 3px 1 0px 5px rgba(0, 0, 0, 0.1);
  }
`;

const EventInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  #event-description {
    margin-bottom: 30px;
  }

  .event-information {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;

const EventSummaryContainer = styled.div`
  background-color: #fcfcfc;
  border: 1px solid #e0e0e0;
  padding: 40px 0px;
  box-shadow: 0 -3px 10px 2px rgba(0, 0, 0, 0.005);
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;

  #event-summary-content {
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1024px;
    gap: 10px;
  }

  #event-name-summary {
    font-size: 2em;
  }
`;

const JoinActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const JoinButton = styled.button`
  background-color: #000a3e;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  padding: 10px 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #000a3e;
  }
`;
