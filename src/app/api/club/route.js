import { NextResponse } from "next/server";
import Database from "../../database";

// GET /api/club
// Get all clubs
export async function GET() {
    try {
      let { data: club, error } = await Database.from("club").select("*");
      if (error) {
        throw new Error(error);
      }
      return NextResponse.json(club);
    } catch (error) {
      console.error(`Error fetching club: ${error}`);
      return NextResponse.error(error);
    }
  }

// POST /api/club
// Create a club
export async function POST(req) {
    try {
      const { name, description, campus_id, abbreviation, website } = await req.json();
  
      if (!name || !campus_id || !description) {
        return NextResponse.json(
          { error: "Missing required properties" },
          { status: 400 }
        );
      }
  
      const { data, error } = await Database.from("club")
        .insert([{ name: name, campus_id:campus_id, description: description, abbreviation: abbreviation, website:website }])
        .select();
  
      if (error) {
        throw new Error(error);
      }
      return NextResponse.json(data);
    } catch (error) {
      console.error(`Error creating club: ${error}`);
      return NextResponse.error(error);
    }
  }