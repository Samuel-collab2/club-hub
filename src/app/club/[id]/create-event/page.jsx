"use client";

import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UploadImage from "../../../components/UploadImage";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import CalendarIcon from "@mui/icons-material/CalendarMonthTwoTone";
import LocationIcon from "@mui/icons-material/LocationOnTwoTone";
import ParticiapantIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import VeideoCamIcon from "@mui/icons-material/VideocamTwoTone";

export default function CreateEventPage() {
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);

  const [startDate, setDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [noParticipantLimit, setNoParticipantLimit] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [clubName, setClubName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [role, setRole] = useState(null);
  const [validClubIds, setValidClubIds] = useState([]);

  useEffect(() => {
    async function checkRole() {
      const res = await fetch(`/api/checkRole`);
      const data = await res.json();
      setRole(data.role);
      setValidClubIds(data.clubIds);
    }
    checkRole();
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const clubId = pathname.split("/")[2];

  useEffect(() => {
    if (role !== "Admin"){
      if (!validClubIds.includes(parseInt(clubId))) {
        return;
      }
    }

    fetch(`/api/club/${clubId}`)
      .then((res) => res.json())
      .then((data) => setClubName(data.name));
  }, [clubId]);

  if (role === null) {
    return <p>Loading...</p>;
  }

  if (role !== "Admin") {
    if (!validClubIds.includes(parseInt(clubId))) {
      return (
        <div>
          <h1>You do not have permission to view this page</h1>
        </div>
      );
    }
  }

  const createEvent = async () => {
    const res = await fetch("/api/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubId,
        name: eventName,
        dateTime: startDate,
        description: eventDescription,
        location: eventLocation,
        isVirtual,
        maxCapacity: noParticipantLimit ? null : maxParticipants,
        banner: previewImage,
      }),
    });

    if (res.status === 200) {
      let eventId;
      res.json().then((data) => {
        eventId = data.id;
        router.push(`/event/${eventId}`);
      });
    } else {
      console.log("Error creating event");
    }
  };

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
        <EventDescription>
          <TextField
            placeholder="Event Description"
            multiline
            maxRows={10}
            minRows={6}
            id="event-description-input"
            onChange={(e) => {
              e.preventDefault();
              setEventDescription(e.target.value);
            }}
          />
          <ActionButtonContainer>
            <SubmitButton
              className="create-event-action-btn"
              type="submit"
              disabled={false}
              onClick={(e) => {
                e.preventDefault();
                console.log(
                  eventName,
                  eventDescription,
                  eventLocation,
                  startDate,
                  isVirtual,
                  maxParticipants
                );
                createEvent();
              }}
            >
              Create Event
            </SubmitButton>
            <CancelButton
              className="create-event-action-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              Cancel
            </CancelButton>
          </ActionButtonContainer>
        </EventDescription>
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

const EventDescription = styled.div`
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
