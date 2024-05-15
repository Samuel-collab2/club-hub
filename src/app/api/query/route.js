import { NextResponse } from "next/server";
import Database from "../../database";

async function query(keyword, sortBy, sort, table){
    let query = Database.from(table).select("*");

    if (keyword !== null) {
        query = query.or(`name.ilike.%${keyword}%, description.ilike.%${keyword}%`);
    }

    query = query.select("name, description")
    let ascending = true;
    if (sort === "asc") {
        ascending = true;
    } else if (sort === "desc"){
        ascending = false;
    }

    if (sortBy === "date") {
        query = query.order("created_at", { ascending });

        if (table === "event")
            query = query.order("dateTime", { ascending });
    } 

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
    return string.split(keyword).length - 1;
}

function relevanceScore(dataset, keyword, sort) {
    dataset.forEach((data) => {
        data.relevance_score = 0;

        const nameOccurrences = countKeywords(data.name, keyword);
        const descriptionOccurrences = countKeywords(data.description, keyword);
        data.relevance_score = nameOccurrences + descriptionOccurrences;
    });

    dataset.sort((a, b) => {
        if (sort === "asc") {
            return a.relevance_score - b.relevance_score;
        } else {
            return b.relevance_score - a.relevance_score;
        }
    });
}

// POST /api/query
export async function POST(req) {
    try {
        const { keyword, pageSize, page, sortBy, sort } = await req.json();

        const clubData = await query(keyword, sortBy, sort, "club");
        const eventData = await query(keyword, sortBy, sort, "event");

        // Calculate relevance score for each club and event
        if (sortBy === "relevance") {
            relevanceScore(clubData, keyword, sort);
            relevanceScore(eventData, keyword, sort);
        }

        // Return results based on page and pageSize
        const clubDataPage = clubData.slice((page - 1) * pageSize, page * pageSize);
        const eventDataPage = eventData.slice((page - 1) * pageSize, page * pageSize);
       
        if (!clubData || !eventData) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        return NextResponse.json({ clubData: clubDataPage, eventData: eventDataPage });

    } catch (error) {
        console.error(`Error querying clubs: ${error.message}`);
        return NextResponse.error(error);
    }
}