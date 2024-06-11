import { NextResponse } from "next/server";
import Database from "../../database";
import { decode } from "base64-arraybuffer";

// GET /api/club
// Get all clubs
export async function GET() {
  try {
    let { data: club, error } = await Database.from("club").select("*");
    if (error) {
      throw new Error(error);
    }
    return NextResponse.json(club);
  } catch (error) {
    console.error(`Error fetching club: ${error}`);
    return NextResponse.error(error);
  }
}

// POST /api/club
// Create a club
export async function POST(req) {
  try {
    const { name, description, campusId, email, clubRoom, isPrivate, banner } =
      await req.json();

    if (!name || !campusId || !description || !banner || !email) {
      return NextResponse.json(
        { error: "Missing required properties" },
        { status: 400 }
      );
    }

    const { data: clubData, error: addClubError } = await Database.from("club")
      .insert([
        {
          name: name,
          description: description,
          campusId,
          email,
          clubRoom,
          isPrivate,
          isApproved: false,
        },
      ])
      .select();

    if (addClubError) {
      throw new Error(addClubError);
    }
    const clubId = clubData[0].id;

    const clubBannerImage = banner.split("base64,")[1];
    const { data: clubBanner, error: uploadBannerError } =
      await Database.storage
        .from("clubBanner")
        .upload(`${clubId}-banner`, decode(clubBannerImage), {
          contentType: "image/png",
          upsert: true,
        });
    let bannerUrl;

    if (uploadBannerError) {
      throw new Error(uploadBannerError);
    }
    // Get club banner public URL
    const imagePath = clubBanner.path;
    const { data: url } = Database.storage
      .from("clubBanner")
      .getPublicUrl(imagePath);
    bannerUrl = url.publicUrl;

    // Update the club banner path in the club table
    const { data: updateClubBanner, error: updateClubBannerError } =
      await Database.from("club")
        .update({ banner: bannerUrl })
        .eq("id", clubId)
        .select();
    return NextResponse.json(updateClubBanner[0]);
  } catch (error) {
    console.error(`Error creating club: ${error}`);
    return NextResponse.error(error);
  }
}