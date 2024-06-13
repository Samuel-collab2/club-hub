import Database from "../../../database";
import { NextResponse } from "next/server";

// POST /api/landing/savedEvents
export async function POST(req) {
  try {
    const {
      clerkId,
    } = await req.json();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Missing required properties" },
        { status: 400 }
      );
    }

    const { data, error } = await Database.from("user")
      .select()
      .eq('clerkId', clerkId);

    if (error) {
      throw new Error(error);
    } else if (Object.keys(data).length === 0) {
        throw new Error("Passed in Clerk Id does not exist in DB");    
    }

    //use data to find and return saved events

    const savedEventsData = await Database.from("savedEvents")
        .select()
        .eq('userId', data[0].id);

    if (savedEventsData.error) {
        throw new Error(savedEventsData.error);
    } 
    
    // handle if there are no saved events associated with passed clerkId
    if (Object.keys(savedEventsData.data).length === 0) {
        return NextResponse.json([])
    }

    let userSavedEvents = []
    // Grab events saved to user + add club name (needed for landing page)
    for (var item of savedEventsData.data) {
        let eventItem = await Database.from("event")
            .select()
            .eq('id', item.eventId)
        let clubItem = await Database.from("club")
            .select()
            .eq('id', eventItem.data[0].clubId)
        eventItem.data[0].clubName = clubItem.data[0].name
        userSavedEvents.push(eventItem.data[0])
      }

    return NextResponse.json(userSavedEvents)


  } catch (error) {
    console.error(`Error found during saved events fetch: ${error}`);
    return NextResponse.error(error);
  }
}
