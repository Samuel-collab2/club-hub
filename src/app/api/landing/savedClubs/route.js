import Database from "../../../database";
import { NextResponse } from "next/server";

// POST /api/landing/savedClubs
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

    //use data to find and return subscribed Clubs

    const clubSubscriberData = await Database.from("clubSubscriber")
        .select()
        .eq('userId', data[0].id);

    if (clubSubscriberData.error) {
        throw new Error(clubSubscriberData.error);
    } 
    
    // handle if there are no subscribed clubs associated with passed clerkId
    if (Object.keys(clubSubscriberData.data).length === 0) {
        return NextResponse.json([])
    }

    let subscribedClubs = []
    // Grab events saved to user + add club name (needed for landing page)
    for (var item of clubSubscriberData.data) {
        let clubItem = await Database.from("club")
            .select()
            .eq('id', item.clubId)

        subscribedClubs.push(clubItem.data[0])
      }

    return NextResponse.json(subscribedClubs)


  } catch (error) {
    console.error(`Error found during subscribed clubs fetch: ${error}`);
    return NextResponse.error(error);
  }
}
