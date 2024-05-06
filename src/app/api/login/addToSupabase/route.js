import { NextResponse } from "next/server";
import Database from "../../../database";
import { currentUser } from "@clerk/nextjs/server";

async function checkIfUserExists(clerkId) {
  
    const { data, error } = await Database
        .from("user")
        .select("*")
        .eq("clerkId", clerkId);

    if (error) {
        throw new Error(error);
    }

    if (data === undefined){
        return false;
    } else {
        return data.length > 0;
    }
}

// POST /api/login/addToSupabase
export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.error(new Error("User not found"));
    }

    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.primaryEmailAddress.emailAddress;
    const clerkId = user.id;

    const userExists = await checkIfUserExists(clerkId);
    if (userExists) {
      return NextResponse.json({ message: "User already exists" });
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
    console.error(`Error inserting user to supabase: ${error}`);
    return NextResponse.error(error);
  }
}
