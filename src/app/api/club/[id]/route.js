import Database from "../../../database";
import { NextResponse } from "next/server";

// PATCH /api/club/[id]
export async function PATCH(req) {
    try {
        
        // Must pass in club id as part of req body
        // NOTE: Make sure fields in req body align with what is in current supabase schema for 'clubs'
        const reqData = await req.json()

        if (!reqData.id) {
            return NextResponse.json(
                { error: "club id not found"},
                { status: 400 }
                );
        } else if (!reqData) {
            return NextResponse.json(
                { error: "Nothing submitted for update"},
                { status: 400 }
                );
        }

        const {data, error} = await Database.from("club")
            .update(reqData)
            .eq('id', reqData.id)
            .select()
        
        console.log(data[0])

        // If we attempted to PATCH using a club id that does not exist, supabase returns an empty object
        // Change below 3 lines depending on how we want to react to this
        if (Object.keys(data).length === 0) {
            throw new Error('Attempted to update club with non existing club id');
        }

        if (error) {
            throw new Error(error);
            } else {
                return NextResponse.json(data);
            }
        
    } catch (error) {
        console.error(`Error found during club update: ${error}`);
        return NextResponse.error(error);
    }
  }