import { NextResponse, NextRequest } from "next/server";
import Database from "../../../../database";

const getClubId = (req) => {
  return req.nextUrl.pathname.split("/")[
    req.nextUrl.pathname.split("/").length - 2
  ];
};

// GET /api/club/[id]/event
export async function GET(req) {
  try {
    const clubId = getClubId(req);
    let { data, error } = await Database.from("event")
      .select("*")
      .eq("clubId", clubId);

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
