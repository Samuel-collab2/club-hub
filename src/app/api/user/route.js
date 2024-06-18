import { NextResponse } from "next/server";
import Database from "../../database";

// GET /api/club
// Get all clubs
export async function GET() {
  try {
    let { data: club, error } = await Database.from("user").select("*");
    if (error) {
      throw new Error(error);
    }
    return NextResponse.json(club);
  } catch (error) {
    console.error(`Error fetching user: ${error}`);
    return NextResponse.error(error);
  }
}