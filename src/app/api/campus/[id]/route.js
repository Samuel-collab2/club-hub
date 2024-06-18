import { NextResponse, NextRequest } from "next/server";
import Database from "../../../database";

// DELETE /api/campus/[id]
export async function DELETE(req) {
  try {
    const campusId = req.url.slice(req.url.lastIndexOf("/") + 1);
    let { data: campus, error } = await Database.from("campus")
      .delete()
      .eq("id", campusId);
    if (error) {
      throw new Error(error);
    }
    return NextResponse.json({
      message: `Campus with id ${campusId} is deleted`,
    });
  } catch (error) {
    console.error(`Error deleting campus: ${error}`);
    return NextResponse.error(error);
  }
}

// PATCH /api/campus/[id]
export async function PATCH(req) {
  try {
    // Must pass in campus id as part of req body
    // NOTE: Make sure fields in req body align with what is in current supabase schema for 'campus'
    const reqData = await req.json();
    const campusId = req.url.slice(req.url.lastIndexOf("/") + 1);

    if (!campusId) {
      return NextResponse.json({ error: "campus id not found" }, { status: 400 });
    } else if (!reqData) {
      return NextResponse.json(
        { error: "Nothing submitted for update" },
        { status: 400 }
      );
    }
    const { data, error } = await Database.from("campus")
      .update(reqData)
      .eq("id", parseInt(campusId))
      .select();

    // If we attempted to PATCH using a campus id that does not exist, supabase returns an empty object
    // Change below 3 lines depending on how we want to react to this
    if (Object.keys(data).length === 0) {
      throw new Error("Attempted to update campus with non existing campus id");
    }

    if (error) {
      throw new Error(error);
    } else {
      return NextResponse.json(data[0]);
    }
  } catch (error) {
    console.error(`Error found during campus update: ${JSON.stringify(error)}`);
    return NextResponse.error(error);
  }
}
