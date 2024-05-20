import { NextResponse} from "next/server";
import Database from "../../../database";

// POST /api/participate/[event id]
export async function POST(req) {
  try {
    const {userId} = await req.json()
    const eventId = req.url.slice(req.url.lastIndexOf("/") + 1);

    if (!eventId || !userId) {
        return NextResponse.json(
          { error: "Missing required properties" },
          { status: 400 }
        );
      }


    // Lines 18 - 36 handle passing in event or user ID that triggers an error, or that does not exist in database
    const { data, error } = await Database.from("event")
      .select()
      .eq('id', eventId)

    if (error) {
      throw new Error(error);
    } else if (Object.keys(data).length === 0) {
      throw new Error("passed in event id not found in database");
    }

    const userData = await Database.from("user")
      .select()
      .eq('id', userId)

    if (userData.error) {
      throw new Error(userData.error);
    } else if (Object.keys(userData.data).length === 0) {
      throw new Error("passed in User id not found in database");
    }

    // Lines 39 - 50 are to prevent a user from joining same event twice
    const participantData = await Database.from("eventparticipants")
      .select()
      .eq('userId', userId)
      .eq('eventId', eventId)

    if (participantData.error) {
      throw new Error(participantData.error);
    } else if (Object.keys(participantData.data).length > 0) {
      return NextResponse.json(
        { message: "User is already signed up to this event" },
      );
    }

    // lines 53 - 78 are for attempting to join user to event
    let eventData = data[0]
    let participantsCount = eventData.participantsCount
    // If desired event has room regarding it's max capacity limit ...
    if(!eventData.maxCapacity || eventData.maxCapacity > participantsCount) {
        await Database.from("event")
            .update({'participantsCount': participantsCount + 1})
            .eq("id", parseInt(eventId));

        await Database.from("eventparticipants")
            .insert([
              {
                  eventId: eventId,
                  userId: userId
              },
            ])
            .select();
        
        return NextResponse.json(
            { message: "Success!" },
            );
    // If desired event DOES NOT have room regarding it's max capacity limit ... 
    } else {
        return NextResponse.json(
            { message: "Event Maxcapacity is reached" },
          );
    }


  } catch (error) {
    console.error(`Error joining/participating event: ${error}`);
    return NextResponse.error(error);
  }
}

// GET /api/participants/[id]
export async function GET() {
  try {
    let { data, error } = await Database.from("eventparticipants")
      .select("*");

    if (error) {
      throw new Error(error);
    }

    let resData = []
    for (let i = 0; i < data.length; i++) {
      const userData = await Database.from("user")
        .select()
        .eq("id", parseInt(data[i].userId));
      
      resData.push({
        "firstName" : userData.data[0].firstName,
        "lastName" : userData.data[0].lastName,
        "email" : userData.data[0].email,
      })
    }

    return NextResponse.json(resData);
  } catch (error) {
    console.error(`Error fetching list of event participants: ${error}`);
    return NextResponse.error(error);
  }
}
