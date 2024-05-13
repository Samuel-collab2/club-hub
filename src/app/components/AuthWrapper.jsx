"use client";

import React from "react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

/**
 * AuthWrapper component
 *
 * This component is responsible for rendering different content based on the user's authentication state.
 * It uses the `SignedIn` and `SignedOut` components to conditionally render the children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered.
 * @param {Function} props.onClick - An optional click handler function for the signed-in content.
 * @returns {React.ReactElement} - The rendered `AuthWrapper` component.
 */
export default function AuthWrapper({ children, onClick }) {
  const clerk = useClerk();

  return (
    <>
      <SignedIn>{React.cloneElement(children, { onClick })}</SignedIn>
      <SignedOut>
        {React.cloneElement(children, { onClick: () => clerk.openSignIn({}) })}
      </SignedOut>
    </>
  );
}
