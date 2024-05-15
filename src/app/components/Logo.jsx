import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/bcit-logo.svg";

export default function Logo({ width = 75 }) {
  const router = useRouter();

  function handleClick() {
    router.push("/");
  }

  return (
    <Image
      src={logo}
      alt="BCIT Logo"
      width={width}
      height={width}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    />
  );
}
