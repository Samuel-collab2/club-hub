"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import ScrollableText from "../../components/ScrollableText";
import AuthWrapper from "../../components/AuthWrapper";
import UnbookmarkedIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import BookmarkedIcon from "@mui/icons-material/Bookmark";
import CalendarIcon from "@mui/icons-material/CalendarMonthTwoTone";
import Locationicon from "@mui/icons-material/LocationOnTwoTone";
import VirtualLocationIcon from "@mui/icons-material/VideocamTwoTone";
import PeopleIcon from "@mui/icons-material/PeopleAltTwoTone";
import PencilIcon from "@mui/icons-material/CreateTwoTone";

export default function Event({}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const id = pathname.replace("/event/", "");
  const [isItemBookmarked, setIsItemBookmarked] = useState(false);
  const [eventDetail, setEventDetail] = useState({});
  const [clubDetail, setClubDetail] = useState({});

  useEffect(() => {
    console.log("isSignedIn", isSignedIn);
    fetch(
      "/api/event/" +
        id +
        "?" +
        new URLSearchParams({
          joined: isSignedIn ? "true" : "false",
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setEventDetail(data);
      });

    if (isSignedIn) {
      fetch("/api/event/" + id + "/save")
        .then((res) => res.json())
        .then((data) => {
          setIsItemBookmarked(data.isSaved);
        });
    }
  }, [id, isSignedIn]);

  useEffect(() => {
    if (eventDetail.clubId) {
      fetch("/api/club/" + eventDetail.clubId)
        .then((res) => res.json())
        .then((data) => {
          setClubDetail(data);
        });
    }
  }, [eventDetail]);

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

    const formattedDate = date.toUTCString("en-US", options);
    return formattedDate;
  }

  if (eventDetail) {
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
                  fetch("/api/event/" + id + "/save", {
                    method: isItemBookmarked ? "DELETE" : "POST",
                  }).then((data) => {
                    setIsItemBookmarked(!isItemBookmarked);
                  });
                }}
              >
                {isItemBookmarked ? (
                  <BookmarkedIcon fontSize="big" className="cursor-item" />
                ) : (
                  <UnbookmarkedIcon fontSize="big" className="cursor-item" />
                )}
              </AuthWrapper>
              <PencilIcon
                className="cursor-item"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Edit event");
                }}
              />
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
                {eventDetail.participantsCount}{" "}
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
                    fetch("/api/participant/" + id, {
                      method: eventDetail.isJoined ? "DELETE" : "POST",
                    }).then((data) => {
                      setEventDetail({
                        ...eventDetail,
                        isJoined: !eventDetail.isJoined,
                        participantsCount:
                          eventDetail.participantsCount +
                          (eventDetail.isJoined ? -1 : 1),
                      });
                    });
                  }}
                >
                  <JoinButton
                    className={`cursor-item ${
                      eventDetail.isJoined ? "joined" : ""
                    }`}
                  >
                    {eventDetail.isJoined ? "Joined" : "Join"}
                  </JoinButton>
                </AuthWrapper>
                {eventDetail.maxCapacity && (
                  <span>
                    {eventDetail.maxCapacity - eventDetail.participantsCount}{" "}
                    spots left
                  </span>
                )}
              </JoinActionContainer>
            )}
          </div>
        </EventSummaryContainer>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
  max-width: 1024px;

  .cursor-item {
    cursor: pointer;
  }
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-bottom: 600px;
  }

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
    padding: 30px 30px;
    width: 100%;
    max-width: 1024px;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
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

  &.joined {
    background-color: #ccc;
    color: #000;
  }
`;
