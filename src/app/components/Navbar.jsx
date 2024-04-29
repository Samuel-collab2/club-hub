import React from "react";
import Logo from "./Logo";

export default function Navbar({}) {
  return (
    <>
      <Logo />
      <LoginBtn />
    </>
  );
}

function LoginBtn({}) {
  return <button>Login</button>;
}
