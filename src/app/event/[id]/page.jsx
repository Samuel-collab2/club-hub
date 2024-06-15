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
import LocationIcon from "@mui/icons-material/LocationOnTwoTone";
import VirtualLocationIcon from "@mui/icons-material/VideocamTwoTone";
import PeopleIcon from "@mui/icons-material/PeopleAltTwoTone";
import PencilIcon from "@mui/icons-material/CreateTwoTone";
import { Edit } from "@mui/icons-material";
import UploadImage from "../../components/UploadImage";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import ParticiapantIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import VeideoCamIcon from "@mui/icons-material/VideocamTwoTone";
import CloseIcon from "@mui/icons-material/Close";

export default function Event({}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const id = pathname.replace("/event/", "");

  const [isEditMode, setEditMode] = useState(false);
  const [isItemBookmarked, setIsItemBookmarked] = useState(false);
  const [eventDetail, setEventDetail] = useState({});
  const [clubDetail, setClubDetail] = useState({});
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    console.log("In Edit Mode" + isEditMode);  
  }, [isEditMode])

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

  const fetchParticipants = () => {
    fetch("/api/participant/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setParticipants(data);
        setShowParticipants(true);
      });
  };



  if (eventDetail && !isEditMode) {
    return (
      <div
        style={{
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
              {new Date(eventDetail.dateTime) > new Date() && (
                <PencilIcon
                  className="cursor-item"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(true);
                  }}
                />
              )}
            </Title>
            <span
              id="club-event-hyperlink"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/dedicatedPage/${eventDetail.clubId}`);
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
                  <LocationIcon fontSize="medium" />
                )}

                {eventDetail.location}
              </span>
              <span className="event-information">
                <PeopleIconStyled onClick={fetchParticipants} fontSize="medium" />
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
        {showParticipants && (
          <ParticipantsModal>
            <ModalContent>
              <CloseIcon
                className="close-icon"
                onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                onClick={() => setShowParticipants(false)}
              />
              <h2>Participants</h2>
              <ParticipantsList>
                {participants.map((participant) => (
                  <li key={participant.email}> {participant.firstName} {participant.lastName} - {participant.email}</li>
                ))}
              </ParticipantsList>
            </ModalContent>
          </ParticipantsModal>
        )}
      </div>
    );
  } else {
    <div>Loading...</div>;
  }

  if (isEditMode) {
    return (
      // <p>Edit Mode</p>
      <EventEditMode
        eventData={eventDetail}
        clubName={clubDetail.name}
        revokeEditMode={() => {
          setEditMode(false);
        }}
      />
    );
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

  @media (max-height: 768px) {
    margin-bottom: 10em;
  }
`;

const PeopleIconStyled = styled(PeopleIcon)`
  cursor: pointer;
`

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

function EventEditMode({ eventData, clubName, revokeEditMode }) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(eventData.banner);
  const [eventName, setEventName] = useState(eventData.name);
  const [eventDescription, setEventDescription] = useState(
    eventData.description
  );
  const [eventLocation, setEventLocation] = useState(eventData.location);
  const [startDate, setDate] = useState(null);
  const [isVirtual, setIsVirtual] = useState(eventData.isVirtual);
  const [maxParticipants, setMaxParticipants] = useState(eventData.maxCapacity);
  const [noParticipantLimit, setNoParticipantLimit] = useState(
    eventData.maxCapacity === null
  );

  useEffect(() => {
    setDate(convertDateString(eventData.dateTime));
  }, []);

  function convertDateString(inputDate) {
    const date = new Date(inputDate);

    // Extract the parts we need
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  }

  async function updateEvent() {
    const res = await fetch("/api/event/" + eventData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventName,
        dateTime: startDate,
        description: eventDescription,
        location: eventLocation,
        isVirtual,
        maxCapacity: noParticipantLimit ? null : maxParticipants,
        banner: previewImage !== eventData.banner ? previewImage : undefined,
      }),
    });

    if (res.status === 200) {
      res.json().then(() => {
        window.location.reload();
      });
    } else {
      console.log("Error updating event");
    }
  }

  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        <UploadImage
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          style={{ height: "300px" }}
        />
        <EventInfoContainer>
          <div>
            <TextField
              placeholder="Event Title"
              value={eventName}
              onChange={(e) => {
                e.preventDefault();
                setEventName(e.target.value);
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "30px",
                },
              }}
            />
            <p>by {clubName}</p>
          </div>
          <EventInfoInputContainer>
            <div className="mini-info-input-form">
              <CalendarIcon />
              <input
                type="datetime-local"
                id="date-picker-input"
                value={startDate}
                onChange={(e) => {
                  e.preventDefault();
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="mini-info-input-form">
              {isVirtual ? <VeideoCamIcon /> : <LocationIcon />}
              <TextField
                placeholder={isVirtual ? "Event Link" : "Location"}
                value={eventLocation}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setEventLocation(e.target.value);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isVirtual}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsVirtual(!isVirtual);
                      setEventLocation("");
                    }}
                  />
                }
                label="virtual event"
              />
            </div>
            <div className="mini-info-input-form">
              <ParticiapantIcon />
              <TextField
                placeholder="Max Particiapants"
                size="small"
                type="number"
                value={maxParticipants}
                disabled={noParticipantLimit}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  e.preventDefault();
                  setMaxParticipants(e.target.value);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noParticipantLimit}
                    onClick={(e) => {
                      e.preventDefault();
                      setNoParticipantLimit(!noParticipantLimit);
                      setMaxParticipants(null);
                    }}
                  />
                }
                label="no participants limit"
              />
            </div>
          </EventInfoInputContainer>
        </EventInfoContainer>
        <EventDescriptionEdit>
          <TextField
            placeholder="Event Description"
            multiline
            maxRows={10}
            minRows={6}
            id="event-description-input"
            value={eventDescription}
            onChange={(e) => {
              e.preventDefault();
              setEventDescription(e.target.value);
            }}
          />
          <ActionButtonContainer>
            <DeleteButton
              className="create-event-action-btn"
              onClick={(e) => {
                e.preventDefault();
                fetch("/api/event/" + eventData.id, {
                  method: "DELETE",
                }).then(() => {
                  router.push("/");
                });
              }}
            >
              Delete Event
            </DeleteButton>
            <SubmitButton
              className="create-event-action-btn"
              type="submit"
              disabled={false}
              onClick={(e) => {
                e.preventDefault();
                updateEvent();
              }}
            >
              Update Event
            </SubmitButton>
            <CancelButton
              className="create-event-action-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                revokeEditMode();
              }}
            >
              Cancel
            </CancelButton>
          </ActionButtonContainer>
        </EventDescriptionEdit>
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin: 2em;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 20px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  height: 300px;
  margin-bottom: 30px;
`;

const EventInfoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-evenly;

  #date-picker-input {
    border: solid 1px #d1d1d1;
    padding: 10px;
    border-radius: 3px;
  }

  .mini-info-input-form {
    display: flex;
    gap: 10px;
    align-items: center;

    #max-participant-input {
      margin-left: 40px;
    }
  }
`;

const EventDescriptionEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-column: 2;
  padding: 10px;

  .create-event-action-btn {
    width: 100px;
    height: 40px;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff3333;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  align-self: flex-end;
`;

const CancelButton = styled.button`
  background-color: white;
  color: black;
  text-align: center;
  border: none;
  cursor: pointer;
  border: solid 2px #000;
  border-radius: 5px;
  align-self: flex-end;
`;

const SubmitButton = styled.button`
  background-color: #000a3e;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  align-self: flex-end;
`;

const ParticipantsModal = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  position: relative;
  border-radius: 15px;
`;

const ParticipantsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }

  li:last-child {
    border-bottom: none;
  }
`;
