import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Database from "../../../../database";

const getClubId = (req) => req.url.split("/").slice(-2, -1)[0];
const getCurrentUserId = async () => {
  const user = await currentUser();
  const userId = await Database.from("user")
    .select("id")
    .eq("clerkId", user.id)
    .single()
    .then((user) => user.data.id);
  return userId;
};

// POST /api/club/[id]/save
// to save an club based on the current user
export async function POST(req) {
  try {
    const clubId = getClubId(req);
    const userId = await getCurrentUserId();
    const { data, error } = await Database.from("savedClubs")
      .upsert([
        {
          clubId: clubId,
          userId: userId,
        },
      ])
      .select();

    if (error) {
      throw new Error(new Error("Error saving club"));
    }
    return NextResponse.json({ message: "Club saved successfully!" });
  } catch (error) {
    console.error(`Error saving event: ${error}`);
    return NextResponse.error(error);
  }
}

// DELETE /api/club/[id]/save
// to unsave an club based on the current user
export async function DELETE(req) {
  try {
    const clubId = getClubId(req);
    const { data, error } = await Database.from("savedClubs")
      .delete()
      .eq("clubId", clubId)
      .eq("userId", await getCurrentUserId());

    if (error) {
      throw new Error(new Error("Error saving club"));
    }
    return NextResponse.json({ message: "Club deleted successfully!" });
  } catch (error) {
    console.error(`Error saving club: ${error}`);
    return NextResponse.error(error);
  }
}

// GET /api/club/[id]/save
// to check if an club is saved by the current user
export async function GET(req) {
  try {
    const clubId = getClubId(req);
    const { data, error } = await Database.from("savedClubs")
      .select()
      .eq("clubId", clubId)
      .eq("userId", await getCurrentUserId());

    if (error) {
      throw new Error(new Error("Error saving club"));
    }
    return NextResponse.json({ isSaved: data.length > 0 });
  } catch (error) {
    console.error(`Error checking event: ${error}`);
    return NextResponse.error(error);
  }
}
