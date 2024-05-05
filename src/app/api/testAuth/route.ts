import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "This should only send if user is logged in" });
}
