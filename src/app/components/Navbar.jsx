"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/LoginTwoTone";

import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar({}) {
  return (
    <NavbarContainer>
      <Logo id="logo" />
      <SearchBar id="search-bar" />
      <LoginBtn id="login-btn" />
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
  const router = useRouter();

  return (
    <BlueBtn
      type="button"
      onClick={() => {
        router.push("/login");
      }}
      {...props}
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
  max-width: 100px;
`;
