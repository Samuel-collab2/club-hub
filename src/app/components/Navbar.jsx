"use client";

import styled from "styled-components";
import LoginIcon from "@mui/icons-material/LoginTwoTone";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { useClerk } from "@clerk/clerk-react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar({}) {
  return (
    <NavbarContainer>
      <Logo id="logo" />
      <SearchBar id="search-bar" />
      <SignedOut>
        <LoginBtn id="login-btn" />
      </SignedOut>
      <SignedIn>
        <UserButton userProfileMode="modal" />
      </SignedIn>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 15px;

    #search-bar {
      grid-row: 2;
      grid-column: span 2;
      gap: 10px;
      justify-self: center;
    }

    #login-btn {
      justify-self: end;
    }
  }
`;

function LoginBtn({ ...props }) {
  const clerk = useClerk();

  return (
    <BlueBtn type="button" onClick={() => clerk.openSignIn({})} {...props}>
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
  max-width: 100px;
`;
