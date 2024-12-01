

import db from "../../../src/db/database"; // Adjust the import path as needed
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Verify database connection (Optional)
    await new Promise((resolve, reject) => {
      db.query("SELECT 1", [], (err, results) => {
        if (err) {
          console.error("Database connection failed:", err);
          reject("Database connection failed");
        } else {
          console.log("Database connection successful:", results);
          resolve(results);
        }
      });
    });

    // Parse the request body
    const { date, beginning_location, ending_location, total_miles, comment } = await request.json();

    // Insert data into the database
    const query =
      "INSERT INTO mileage_table (date, beginning_location, ending_location, total_miles, comment) VALUES (?, ?, ?, ?, ?)";

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [date, beginning_location, ending_location, total_miles, comment],
        (err, results) => {
          if (err) {
            console.error("Error inserting data:", err);
            reject(err);
          } else {
            console.log("Insertion results:", results);
            resolve(results);
          }
        }
      );
    });

    // Respond with success
    return NextResponse.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to insert data" }, { status: 500 });
  }
}

export async function GET() {
  // Optionally implement a GET method if required later
  return NextResponse.json({ message: "This endpoint only supports POST requests" }, { status: 405 });
}

