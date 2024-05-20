import {NextResponse} from "next/server";
import Database from "../../../../database";

// GET /api/participant/[id]/count
export async function GET(req) {

    try {
        const eventId = req.url.slice(req.url.lastIndexOf("participant/") + 12, req.url.lastIndexOf("/count"));

        if (!eventId) {
            return NextResponse.json(
              { error: "Missing required properties" },
              { status: 400 }
            );
          }

        const { data, error } = await Database.from("event")
            .select()
            .eq('id', eventId)

        if (error) {
            throw new Error(error);
        } else if (Object.keys(data).length === 0) {
            throw new Error("passed in event id not found in database");
        }

        return NextResponse.json({
            "eventId": eventId, 
            "participantsCount": data[0].participantsCount
        });

    } catch (error) {
        console.error(`Error fetching event participants count: ${error}`);
        return NextResponse.error(error);
    }
}