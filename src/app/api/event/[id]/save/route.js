import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Database from "../../../../database";

const getEventId = (req) => req.url.split("/").slice(-2, -1)[0];
const getCurrentUserId = async () => {
  const user = await currentUser();
  const userId = await Database.from("user")
    .select("id")
    .eq("clerkId", user.id)
    .single()
    .then((user) => user.data.id);
  return userId;
};

// POST /api/event/[id]/save
// to save an event based on the current user
export async function POST(req) {
  try {
    const eventId = getEventId(req);
    const { data, error } = await Database.from("savedEvents")
      .upsert([
        {
          eventId,
          userId: await getCurrentUserId(),
        },
      ])
      .select();

    if (error) {
      throw new Error(new Error("Error saving event"));
    }
    return NextResponse.json({ message: "Event saved successfully!" });
  } catch (error) {
    console.error(`Error saving event: ${error}`);
    return NextResponse.error(error);
  }
}

// DELETE /api/event/[id]/save
// to unsave an event based on the current user
export async function DELETE(req) {
  try {
    const eventId = getEventId(req);
    const { data, error } = await Database.from("savedEvents")
      .delete()
      .eq("eventId", eventId)
      .eq("userId", await getCurrentUserId());

    if (error) {
      throw new Error(new Error("Error saving event"));
    }
    return NextResponse.json({ message: "Event deleted successfully!" });
  } catch (error) {
    console.error(`Error saving event: ${error}`);
    return NextResponse.error(error);
  }
}

// GET /api/event/[id]/save
// to check if an event is saved by the current user
export async function GET(req) {
  try {
    const eventId = getEventId(req);
    const { data, error } = await Database.from("savedEvents")
      .select()
      .eq("eventId", eventId)
      .eq("userId", await getCurrentUserId());

    if (error) {
      throw new Error(new Error("Error saving event"));
    }
    console.log(data);
    return NextResponse.json({ isSaved: data.length > 0 });
  } catch (error) {
    console.error(`Error saving event: ${error}`);
    return NextResponse.error(error);
  }
}
