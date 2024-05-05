import Database from "../../database";
import { NextResponse } from "next/server";

// POST /api/event
export async function POST(req) {
    try {
        const {clubId, name, dateTime, description, location, isVirtual, maxCapacity, banner} = await req.json()

        if ((!clubId || !dateTime || !location || !isVirtual)) {
            return NextResponse.json(
                { error: "Missing required properties"},
                { status: 400 }
                );
        }

        const {data, error} = await Database.from("event")
            .insert([{
                clubId: clubId, 
                name: name,
                dateTime: dateTime,
                description: description,
                location: location,
                isVirtual: isVirtual,
                maxCapacity: maxCapacity,
                banner: banner
            }])
            .select()

        if (error) {
            throw new Error(error);
            } else {
                return NextResponse.json(data);
            }
        
    } catch (error) {
        console.error(`Error found during event creation: ${error}`);
        return NextResponse.error(error);
    }
  }