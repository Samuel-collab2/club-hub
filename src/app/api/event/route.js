import Database from "../../database";
import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";

// POST /api/event
export async function POST(req) {
  try {
    const {
      clubId,
      name,
      dateTime,
      description,
      location,
      isVirtual,
      maxCapacity,
      banner,
    } = await req.json();

    if (!clubId || !dateTime || !location) {
      return NextResponse.json(
        { error: "Missing required properties" },
        { status: 400 }
      );
    }

    const eventImage = banner.split("base64,")[1];
    let bannerUrl;

    const { data: bannerImageData, error: uploadBannerError } =
      await Database.storage
        .from("eventImage")
        .upload(`${clubId}-${name}-${dateTime}`, decode(eventImage), {
          contentType: "image/png",
          upsert: true,
        });

    if (uploadBannerError) {
      throw new Error(uploadBannerError);
    } else {
      const imagePath = bannerImageData.path;
      const { data: url } = Database.storage
        .from("eventImage")
        .getPublicUrl(imagePath);
      bannerUrl = url.publicUrl;
    }

    const { data, error } = await Database.from("event")
      .insert([
        {
          clubId: clubId,
          name: name,
          dateTime: dateTime,
          description: description,
          location: location,
          isVirtual: isVirtual ? isVirtual : false,
          maxCapacity: maxCapacity,
          banner: bannerUrl,
        },
      ])
      .select();

    if (error) {
      throw new Error(error);
    } else {
      return NextResponse.json(data[0]);
    }
  } catch (error) {
    console.error(`Error found during event creation: ${error}`);
    return NextResponse.error(error);
  }
}

// GET /api/event
// Fetch upcoming events for landing page
export async function GET() {
  try {
    // Fetch upcoming events
    let { data, error } = await Database.from("event")
      .select()
      .gt('dateTime', new Date().toISOString())
      .order('dateTime', {ascending: true})
      .range(0, 9)

    if (error) {
      throw new Error(error);
    }

    // insert club name to response data (need to show in landing page)
    // Note: Currently doesn't handle scenario where passed in club id doesn't exist in db ... will result in 'club.data[0].name' resulting in error 
    for (var item of data) {
      let club = await Database.from("club")
        .select()
        .eq('id', item.clubId)
      item.clubName = club.data[0].name
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error(`Error fetching events: ${error}`);
    return NextResponse.error(error);
  }
}
