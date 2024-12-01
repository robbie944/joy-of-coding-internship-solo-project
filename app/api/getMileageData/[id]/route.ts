import db from "../../../../src/db/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the `id` from the URL

  try {
    // Query the database for the record with the given `id`
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM mileage_table WHERE id = ?", [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]); // Return the first result
      });
    });

    // If no record is found, return a 404 response
    if (!result) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Return the record as JSON
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching mileage data by ID:", error);
    return NextResponse.json({ error: "Failed to fetch mileage data" }, { status: 500 });
  }
}
