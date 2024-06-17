import { NextResponse, NextRequest } from "next/server";
import Database from "../../../../database";

const getClubId = (req) => {
  return req.nextUrl.pathname.split("/")[
    req.nextUrl.pathname.split("/").length - 2
  ];
};

// GET /api/club/[id]/campus
export async function GET(req) {
  try {
    const clubId = getClubId(req);
    
    const campusId = await Database.from("club")
      .select("campusId")
      .eq("id", clubId)
      .single()
      .then((club) => club.data.campusId);
    
    let { data, error } = await Database.from("campus")
      .select("*")
      .eq("id", campusId)
      .single();

    if (error) {
      throw new Error(error);
    } else {
      return NextResponse.json(data);
    }

  } catch (error) {
    console.error(`Error getting event: ${error}`);
    return NextResponse.error(error);
  }
}
