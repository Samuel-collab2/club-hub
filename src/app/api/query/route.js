import { NextResponse } from "next/server";
import Database from "../../database";

async function query(keyword, table){
    let query = Database.from(table).select("*");

    if (keyword !== null) {
        query = query.or(`name.ilike.%${keyword}%, description.ilike.%${keyword}%`);
    }

    if (table === "event") {
        query = query.select("clubId, name, description, dateTime");
    } else {
        query = query.select("name, description, campusId");
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

async function filterEventsByCampusId(data, campusId) {
    // Use club id of the event to get the campus id
    const clubIds = data.map((event) => event.clubId);

    // Convert club ids to a unique set
    let uniqueClubIds = new Set(clubIds);

    // Remove null values from the set
    uniqueClubIds.delete(null);

    const clubResponse = await Database.from("club").select("id").in("id", uniqueClubIds).eq("campusId", campusId);
    const validClubIds = clubResponse.data;

    const mappedValidClubIds = validClubIds.map((club) => club.id);

    // Filter events based on valid club ids using for loop
    return data.filter(event => mappedValidClubIds.includes(event.clubId));
}


// POST /api/query
export async function POST(req) {
    try {
        const { keyword, pageSize, page, sort, campusId, clubOrEvent, includePastEvents } = await req.json();

        let [clubData, eventData] = [[], []];

        if (clubOrEvent === "club") {
            clubData = await query(keyword, "club");
        } else if (clubOrEvent === "event") {
            eventData = await query(keyword, "event");
        } else {
            clubData = await query(keyword, "club");
            eventData = await query(keyword, "event");
        }

        relevanceScore(clubData, keyword);
        relevanceScore(eventData, keyword);

        // If campusId is provided, filter data based on campusId
        if (campusId !== null) {
            clubData = clubData.filter((club) => club.campusId === campusId);
            eventData = await filterEventsByCampusId(eventData, campusId);
        }

        // If includePastEvents is false, filter out past events
        if (includePastEvents === false) {
            const currentDate = new Date();
            eventData = eventData.filter((event) => new Date(event.dateTime) >= currentDate);
        }


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