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