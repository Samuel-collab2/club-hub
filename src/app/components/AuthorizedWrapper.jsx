"use client";

import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

export default function AuthWrapper({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut></SignedOut>
    </>
  );
}
