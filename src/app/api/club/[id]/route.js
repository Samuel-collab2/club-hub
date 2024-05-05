import Database from "../../../database";
import { NextResponse } from "next/server";

// PATCH /api/event
export async function PATCH(req) {
    try {
        
        // Must pass in club id as part of req body
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