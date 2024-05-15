import { NextResponse, NextRequest } from "next/server";
import Database from "../../../database";

// GET /api/club/[id]
export async function GET(req) {
    try {
        const clubId = req.url.slice(req.url.lastIndexOf("/") + 1);
        let { data: club, error } = await Database.from("club").select().eq("id", clubId);
        if (!req) {
            return NextResponse.json({ error: "Invalid request." }, { status: 400 }); 
        }
        else if (!clubId) {
            return NextResponse.json({ error: "Club id is required." }, { status: 404 }); 
        }
      return NextResponse.json(club);
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
