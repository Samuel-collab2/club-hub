"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export default function Page() {
  const pathName = usePathname();
  const clubId = pathName.slice(pathName.lastIndexOf("/") + 1);
  const [clubDetails, setClubDetails] = useState({});
  const { isSignedIn } = useUser();

  useEffect(() => {
    fetch(`/api/club/${clubId}/?${isSignedIn ? "subscribed=true" : ""}`)
      .then((response) => response.json())
      .then((data) => {
        setClubDetails(data);
      });
  }, [clubId, isSignedIn]);

  return (
    <div>
      <h1>Club {clubId}</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          fetch(`/api/club/${clubId}/subscribe`, {
            method: clubDetails.isSubscribed ? "DELETE" : "POST",
          }).then((response) => {
            if (response.ok) {
              setClubDetails({
                ...clubDetails,
                isSubscribed: clubDetails.isSubscribed ? false : true,
              });
            } else {
              console.error("Error subscribing to club");
            }
          });
        }}
      >
        {clubDetails.isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
}
