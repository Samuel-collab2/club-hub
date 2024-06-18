import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

// GET /api/checkRole
// Return the role of the current user
export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ role: "Student"})
    }

    if(user.publicMetadata.clubIds !== undefined) {
        return NextResponse.json({ role: "Manager", clubIds: user.publicMetadata.clubIds });
    }

    return NextResponse.json({ role: user.publicMetadata.role });
  } catch (error) {
    console.error(`Error fetching user role: ${error}`);
    return NextResponse.error(error);
  }
}