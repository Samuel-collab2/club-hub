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
