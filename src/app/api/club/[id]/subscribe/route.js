import { NextResponse } from "next/server";
import Database from "../../../../database";
import { currentUser } from "@clerk/nextjs/server";

const getCurrentUserId = async () => {
  const user = await currentUser();
  const userId = await Database.from("user")
    .select("id")
    .eq("clerkId", user.id)
    .single()
    .then((user) => user.data.id);
  return userId;
};

const getClubId = (req) => {
  return req.nextUrl.pathname.split("/")[
    req.nextUrl.pathname.split("/").length - 2
  ];
};

// POST /api/club/[clubid]/subscribe
// subscribe to a club
export async function POST(req) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.error(new Error("User not found"));
    }
    const clubId = getClubId(req);

    const { data, error } = await Database.from("clubSubscriber")
      .upsert([{ clubId: clubId, userId: userId }])
      .select();

    if (error) {
      throw new Error(error);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error subscribing to club: ${error}`);
    return NextResponse.error(error);
  }
}

// DELETE /api/club/[clubid]/subscribe
// unsubscribe from a club
export async function DELETE(req) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.error(new Error("User not found"));
    }
    const clubId = getClubId(req);

    const { data, error: unsubscribeError } = await Database.from(
      "clubSubscriber"
    )
      .delete()
      .eq("clubId", clubId)
      .eq("userId", userId)
      .single();

    if (unsubscribeError) {
      throw new Error(unsubscribeError);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error unsubscribing from club: ${error}`);
    return NextResponse.error(error, { status: 500 });
  }
}

// GET /api/club/[clubid]/subscribe
// get list of subscribers for a club
// TODO: studentAdmin only
export async function GET(req) {
  const clubId = getClubId(req);

  const { data, error } = await Database.from("clubSubscriber")
    .select(
      `
  clubId,
  user: userId (firstName, lastName, email)
`
    )
    .eq("clubId", clubId);
  return NextResponse.json(data);
}
