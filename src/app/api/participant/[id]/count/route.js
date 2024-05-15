import {NextResponse} from "next/server";
import Database from "../../../../database";

// POST /api/participants/[id]/count
export async function POST(req) {
    try {
        const {participantId} = await req.json()

        if (!participantId) {
            return NextResponse.json(
              { error: "Missing required properties" },
              { status: 400 }
            );
          }

        const { data, error } = await Database.from("eventparticipants")
            .select()
            .eq('id', participantId)

        if (error) {
            throw new Error(error);
        } else if (Object.keys(data).length === 0) {
            throw new Error("passed in participant id not found in database");
        }

        const eventData = await Database.from("event")
            .select()
            .eq('id', data[0].eventId)

        if (eventData.error) {
            throw new Error(eventData.error);
        } else if (Object.keys(eventData.data).length === 0) {
            throw new Error("event id associated with participant id not found in database");
        }

        return NextResponse.json({
            "eventId": eventData.data[0].id, 
            "participantsCount": eventData.data[0].participantsCount
        });

    } catch (error) {
        console.error(`Error fetching event participants count: ${error}`);
        return NextResponse.error(error);
    }
}