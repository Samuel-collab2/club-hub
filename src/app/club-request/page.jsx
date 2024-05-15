"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import TextField from "@mui/material/TextField";

import PublicPrivateIcon from "@mui/icons-material/VpnLockTwoTone";
import SchoolIcon from "@mui/icons-material/CorporateFareTwoTone";
import DoorIcon from "@mui/icons-material/SensorDoorTwoTone";
import EmailIcon from "@mui/icons-material/EmailTwoTone";

export default function CreateEventPage() {
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);

  const [startDate, setDate] = useState(new Date());
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [noParticipantLimit, setNoParticipantLimit] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [campuses, setCampuses] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/campus")
      .then((res) => res.json())
      .then((data) => {
        setCampuses(data);
      });
  }, []);

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
        <ClubInfoContainer>
          <TextField
            label=""
            placeholder="Club Name"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "30px",
              },
            }}
          />
          <ClubInfoInputContainer>
            <div className="mini-info-input-form">
              <SchoolIcon />
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
              <PublicPrivateIcon />
              <TextField
                label=""
                placeholder={isVirtual ? "Event Link" : "Location"}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="mini-info-input-form">
              <EmailIcon />
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
            </div>
            <div className="mini-info-input-form">
              <DoorIcon />
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
            </div>
          </ClubInfoInputContainer>
        </ClubInfoContainer>
        <EventDescription>
          <TextField
            label=""
            placeholder="Club Description"
            multiline
            maxRows={10}
            minRows={6}
          />
          <SubmitButton
            className="create-club-submit-btn"
            type="submit"
            disabled={true}
          >
            Request
          </SubmitButton>
          <CancelButton
            className="create-club-submit-btn"
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

const ClubInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  height: 300px;
  margin-bottom: 30px;
`;

const ClubInfoInputContainer = styled.div`
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

  .create-club-submit-btn {
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
