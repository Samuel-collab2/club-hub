import { NextResponse } from "next/server";
import Database from "../../../database";

// POST /api/query/events
export async function POST(req) {
    try {
      const { clubId, includePastEvents } = await req.json();
  
      let query = Database.from("event").select("*");

      if (clubId !== undefined && clubId.length > 0) {
        query = query.in('clubId', clubId);
      }
  
      if (includePastEvents === false) {
        const now = new Date().toISOString();
        query = query.gt("dateTime", now);
      }
  
      const { data, error } = await query;
  
      if (error) {
        throw new Error(error);
      }

      if (data[0] === undefined){
        return NextResponse.json({message: "No events found"});
      }

      return NextResponse.json(data);
    } catch (error) {
      console.error(`Error querying events: ${error}`);
      return NextResponse.error(error);
    }
  }