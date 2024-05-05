import { NextResponse, NextRequest } from "next/server";
import Database from "../../../database";

async function checkIfEventExists(eventId) {
  const {data, error} = await Database.from("event")
    .select("*")
    .eq("id", eventId);

    if (data === undefined){
        return false;
    } else {
        return data.length > 0;
    }
}

// DELETE /api/event/[id]
export async function DELETE(req) {
  try {
    const eventId = req.url.slice(req.url.lastIndexOf("/") + 1);

    const eventExists = await checkIfEventExists(eventId);
    
    if (!eventExists) {
      return NextResponse.json({ message: `Event with id '${eventId}' does not exist` });
    }

    let { data, error } = await Database.from("event")
      .delete()
      .eq("id", eventId);

    if (error) {
      throw new Error(error);
    }

    return NextResponse.json({
      message: `Event with id ${eventId} is deleted`,
    });

  } catch (error) {
    console.error(`Error deleting campus: ${error}`);
    return NextResponse.error(error);
  }
}
