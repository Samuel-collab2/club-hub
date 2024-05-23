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
    console.error(`Error deleting event: ${error}`);
    return NextResponse.error(error);
  }
}

// GET /api/event/[id]
export async function GET(req) {
  try {
    const eventId = req.url.slice(req.url.lastIndexOf("/") + 1);
    let { data, error } = await Database.from("event")
      .select("*")
      .eq("id", eventId);

    if (error) {
      throw new Error(error);
    } else {
      return NextResponse.json(data[0]);
    }

  } catch (error) {
    console.error(`Error getting event: ${error}`);
    return NextResponse.error(error);
  }
}

// PATCH /api/event/[id]
export async function PATCH(req) {
  try {
    const reqData = await req.json();
    const eventId = req.url.slice(req.url.lastIndexOf("/") + 1);

    // Check if eventId is missing or invalid
    if (!eventId || isNaN(eventId)) {
      return NextResponse.json(
        { error: "Invalid or missing event id" },
        { status: 400 }
      );
    }

    // Check if request body is missing
    if (!reqData) {
      return NextResponse.json(
        { error: "No data submitted for update" },
        { status: 400 }
      );
    }

    const { data, error } = await Database.from("event")
      .update(reqData)
      .eq("id", parseInt(eventId))
      .select();

    // Check if event does not exist
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Attempted to update non-existing event" },
        { status: 404 }
      );
    }

    if (error) {
      console.error(`Database error during event update: ${JSON.stringify(error)}`);
      return NextResponse.json(
        { error: "Error updating event" },
        { status: 422 }
      );
    } else {
      return NextResponse.json(data[0]);
    }
  } catch (error) {
    console.error(`Error found during event update for eventId ${eventId}: ${JSON.stringify(error)}`);
    return NextResponse.error(error);
  }
}