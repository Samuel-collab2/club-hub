import { NextResponse, NextRequest } from "next/server";
import Database from "../../../database";
import { currentUser } from "@clerk/nextjs/server";

// Get currently logged in user id
const getCurrentUserId = async () => {
  const user = await currentUser();
  const userId = await Database.from("user")
    .select("id")
    .eq("clerkId", user.id)
    .single()
    .then((user) => user.data.id);
  return userId;
};

// GET /api/club/[id]
export async function GET(req) {
  const isQueryingSubscribed = req.nextUrl.searchParams.get("subscribed");

  try {
    const clubId = req.nextUrl.pathname.slice(
      req.nextUrl.pathname.lastIndexOf("/") + 1
    );
    console.log("clubId: ", clubId);
    let { data: club, error } = await Database.from("club")
      .select()
      .eq("id", clubId);
    if (!req) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    } else if (!clubId) {
      return NextResponse.json(
        { error: "Club id is required." },
        { status: 404 }
      );
    }

    if (isQueryingSubscribed && isQueryingSubscribed === "true") {
      const userId = await getCurrentUserId();
      if (!userId) {
        return NextResponse.error(new Error("User not found"), { status: 404 });
      }

      const { data: subscribed, error: subError } = await Database.from(
        "clubSubscriber"
      )
        .select()
        .eq("userId", userId)
        .eq("clubId", clubId);

      if (subError) {
        throw new Error(subError);
      }
      club[0].isSubscribed = subscribed.length > 0;
    }

    const { data: subscriberCount, error: subCountError } = await Database.from(
      "clubSubscriber"
    )
      .select("clubId")
      .eq("clubId", clubId);

    club[0].subscriberCount = subscriberCount.length;
    return NextResponse.json(club[0]);
  } catch (error) {
    console.error(`Error getting club: ${error} for club id: ${clubId}`);
    return NextResponse.error(error);
  }
}


// PATCH /api/club/[id]
export async function PATCH(req) {
  try {
    // Must pass in club id as part of req body
    // NOTE: Make sure fields in req body align with what is in current supabase schema for 'clubs'
    const reqData = await req.json();
    const clubId = req.url.slice(req.url.lastIndexOf("/") + 1);

    if (!clubId) {
      return NextResponse.json({ error: "club id not found" }, { status: 400 });
    } else if (!reqData) {
      return NextResponse.json(
        { error: "Nothing submitted for update" },
        { status: 400 }
      );
    }
    const { data, error } = await Database.from("club")
      .update(reqData)
      .eq("id", parseInt(clubId))
      .select();

    // If we attempted to PATCH using a club id that does not exist, supabase returns an empty object
    // Change below 3 lines depending on how we want to react to this
    if (Object.keys(data).length === 0) {
      throw new Error("Attempted to update club with non existing club id");
    }

    if (error) {
      throw new Error(error);
    } else {
      return NextResponse.json(data[0]);
    }
  } catch (error) {
    console.error(`Error found during club update: ${JSON.stringify(error)}`);
    return NextResponse.error(error);
  }
}
