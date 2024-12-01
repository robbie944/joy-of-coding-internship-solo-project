import db from "../../../src/db/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM mileage_table", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching mileage data:", error);
    return NextResponse.json({ error: "Failed to fetch mileage data" }, { status: 500 });
  }
}


