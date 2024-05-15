import { NextResponse, NextRequest } from "next/server";
import Database from "../../../database";

// GET /api/club/[id]
export async function GET(req) {
    try {
        const clubId = req.url.slice(req.url.lastIndexOf("/") + 1);
        let { data: club, error } = await Database.from("club").select().eq("id", clubId);
        if (error) {
            throw new Error(error);
      }
      return NextResponse.json(club);
    } catch (error) {
      console.error(`Error getting club: ${error} for club id: ${clubId}`);
      return NextResponse.error(error);
    }
  }