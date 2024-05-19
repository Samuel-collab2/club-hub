"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import PublicPrivateIcon from "@mui/icons-material/VpnLockTwoTone";
import SchoolIcon from "@mui/icons-material/CorporateFareTwoTone";
import DoorIcon from "@mui/icons-material/SensorDoorTwoTone";
import EmailIcon from "@mui/icons-material/EmailTwoTone";

export default function CreateEventPage() {
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);

  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [campusOption, setCampusOption] = useState([]);
  const [campus, setCampus] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [clubRoom, setClubRoom] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let campuses = JSON.parse(localStorage.getItem("campuses"));
    if (!campuses) {
      fetch("/api/campus")
        .then((res) => res.json())
        .then((data) => {
          campuses = data;
          localStorage.setItem("campuses", JSON.stringify(data));
        });
    }
    setCampusOption(campuses);
    setCampus(campuses[0].id);
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
        <UploadImage
          style={{ height: "300px" }}
          previewImage={banner}
          setPreviewImage={setBanner}
        />
        <ClubInfoContainer>
          <TextField
            label=""
            placeholder="Club Name"
            variant="outlined"
            value={clubName}
            onChange={(e) => {
              {
                e.preventDefault();
                setClubName(e.target.value);
              }
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "30px",
              },
            }}
          />
          <ClubInfoInputContainer>
            <div className="mini-info-input-form">
              <SchoolIcon />
              <FormControl>
                <Select
                  id="campus-select"
                  value={campus}
                  label=""
                  onChange={(e) => {
                    setCampus(e.target.value);
                  }}
                  size="small"
                >
                  {campusOption.map((campus) => {
                    return (
                      <MenuItem key={campus.id} value={campus.id}>
                        {campus.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="mini-info-input-form">
              <PublicPrivateIcon />
              <FormControl>
                <Select
                  id="public-private-select"
                  value={isPrivate}
                  label=""
                  onChange={(e) => {
                    setIsPrivate(e.target.value);
                  }}
                  size="small"
                >
                  <MenuItem value={false}>Public</MenuItem>
                  <MenuItem value={true}>Private</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mini-info-input-form">
              <EmailIcon />
              <TextField
                placeholder="Email"
                variant="outlined"
                id="email-input"
                size="small"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mini-info-input-form">
              <DoorIcon />
              <TextField
                placeholder="Club Room"
                variant="outlined"
                id="club-room-input"
                size="small"
                value={clubRoom}
                onChange={(e) => {
                  e.preventDefault();
                  setClubRoom(e.target.value);
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
            value={description}
            onChange={(e) => {
              e.preventDefault();
              setDescription(e.target.value);
            }}
          />
          <SubmitButton
            className="create-club-submit-btn"
            type="submit"
            disabled={false}
            onClick={(e) => {
              e.preventDefault();
              console.log(
                clubName,
                campus,
                isPrivate,
                email,
                clubRoom,
                description,
                banner
              );
            }}
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
