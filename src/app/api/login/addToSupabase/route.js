import { NextResponse } from "next/server";
import Database from "../../../database";
import { currentUser } from "@clerk/nextjs/server";

function checkIfUserExists(clerkId) {
    return Database.from("user").select("*").eq("clerkId", clerkId);
}

// POST /api/campus
export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.error(new Error("User not found"));
    }

    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const clerkId = user.id;

    if (checkIfUserExists(clerkId)) {
        return NextResponse.json(
            { message: "User already exists" }
        )
    }

    const { data, error } = await Database.from("user")
      .insert([{ firstName: firstName, 
        lastName: lastName, 
        email: email,
        clerkId: clerkId }])
      .select();

    if (error) {
      throw new Error(error);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error creating campus: ${error}`);
    return NextResponse.error(error);
  }
}
