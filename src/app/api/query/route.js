import { NextResponse } from "next/server";
import Database from "../../database";

async function query(keyword, sort, table){
    let query = Database.from(table).select("*");

    if (keyword !== null) {
        query = query.or(`name.ilike.%${keyword}%, description.ilike.%${keyword}%`);
    }

    query = query.select("name, description")

    // if (sortBy === "date") {
    //     query = query.order("created_at", { ascending });

    //     if (table === "event")
    //         query = query.order("dateTime", { ascending });
    // } 

    const { data, error } = await query;

    if (error) {
        console.log("Error: ",error)
        throw new Error(error);
    }

    return data;
}

// Function to count occurrences of keyword in a given text
function countKeywords(string, keyword) {
    if (!string || !keyword) {
        return 0;
    }
    return string.toLowerCase().split(keyword.toLowerCase()).length - 1;
}

function relevanceScore(dataset, keyword) {
    dataset.forEach((data) => {
        data.relevance_score = 0;

        const nameOccurrences = countKeywords(data.name, keyword);
        const descriptionOccurrences = countKeywords(data.description, keyword);
        data.relevance_score = nameOccurrences + descriptionOccurrences;
    });
}

// POST /api/query
export async function POST(req) {
    try {
        const { keyword, pageSize, page, sort } = await req.json();

        const clubData = await query(keyword, sort, "club");
        const eventData = await query(keyword, sort, "event");

        relevanceScore(clubData, keyword);
        relevanceScore(eventData, keyword);
        
        // Combine club and event data
        const combinedData = clubData.concat(eventData);

        // Sort data based on relevance score
        combinedData.sort((a, b) => {
            if (sort === "asc") {
                return a.relevance_score - b.relevance_score;
            } else {
                return b.relevance_score - a.relevance_score;
            }
        });

        const dataPage = combinedData.slice((page - 1) * pageSize, page * pageSize);
       
        if (!dataPage) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        return NextResponse.json({ data: dataPage });

    } catch (error) {
        console.error(`Error querying data: ${error.message.toString()}`);
        return NextResponse.error(error);
    }
}