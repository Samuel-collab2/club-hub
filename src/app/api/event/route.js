import Database from "../../database";
import { NextResponse } from "next/server";

// POST /api/event
export async function POST(req) {
    try {
        // Note: dateTime string has to be in form that is readable to supabase [[supabase expects a time stamp with time zone]]
        // Ex: "05 October 2011 14:48 UTC"
        // Ex2: "11 January 1999" // doesn't need clock time or timezone, just Date is mandatory
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