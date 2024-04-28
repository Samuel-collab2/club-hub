import { NextResponse } from "next/server";
import Database from "../../database";

// GET /api/campus
export async function GET() {
  try {
    let { data: campus, error } = await Database.from("campus").select("*");
    if (error) {
      throw new Error(error);
    }
    return NextResponse.json(campus);
  } catch (error) {
    console.error(`Error fetching campus: ${error}`);
    return NextResponse.error(error);
  }
}

// POST /api/campus
export async function POST(req) {
  try {
    const { name, address } = await req.json();

    if (!name || !address) {
      return NextResponse.json(
        { error: "Missing required properties" },
        { status: 400 }
      );
    }

    const { data, error } = await Database.from("campus")
      .insert([{ name: name, address: address }])
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
