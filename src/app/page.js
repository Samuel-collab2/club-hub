"use client"

import LoggedInLanding from "./components/LoggedInLanding";
import UniversalLanding from "./components/UniversalLanding";

import 'react-multi-carousel/lib/styles.css';

import { useAuth } from "@clerk/nextjs";


export default function Home() {
  const { userId, sessionId } = useAuth();

  if (!sessionId) {
    return (
      <>
      <UniversalLanding></UniversalLanding>
      </>
    );
  } else {
    return (
      <>
      <UniversalLanding></UniversalLanding>

      <LoggedInLanding userId = {userId}></LoggedInLanding>
    </>
    );
  }
}
