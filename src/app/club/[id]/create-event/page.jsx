"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const router = useRouter();

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
        <UploadImage style={{ height: "300px" }} />
        <EventInfoContainer>
          <TextField
            label=""
            placeholder="Event Title"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "30px",
              },
            }}
          />
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
                label=""
                placeholder={isVirtual ? "Event Link" : "Location"}
                variant="outlined"
                size="small"
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
                label=""
                placeholder="Max Particiapants"
                variant="outlined"
                size="small"
                type="number"
                value={maxParticipants}
                disabled={noParticipantLimit}
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
                      setMaxParticipants(0);
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
            label=""
            placeholder="Event Description"
            multiline
            maxRows={10}
            minRows={6}
          />
          <SubmitButton
            className="create-event-action-btn"
            type="submit"
            disabled={
              !eventName || !eventDescription || !eventLocation || !startDate
            }
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
    padding: 10px;
  }
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
