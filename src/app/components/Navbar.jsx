"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/LoginTwoTone";

import React from "react";
import Logo from "./Logo";

export default function Navbar({}) {
  return (
    <NavbarContainer>
      <Logo />
      <LoginBtn />
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function LoginBtn({}) {
  const router = useRouter();

  return (
    <BlueBtn
      type="button"
      onClick={() => {
        router.push("/login");
      }}
    >
      <LoginIcon /> Login
    </BlueBtn>
  );
}

const BlueBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000a3e;
  border: none;
  border-radius: 15px;
  color: white;
  padding: 5px 10px;
  gap: 5px;
  cursor: pointer;
`;
