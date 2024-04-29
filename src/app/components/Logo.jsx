import React from "react";
import Image from "next/image";
import logo from "../../../public/bcit-logo.svg";

export default function Logo({ width = 75 }) {
  return <Image src={logo} alt="BCIT Logo" width={width} height={width} />;
}
