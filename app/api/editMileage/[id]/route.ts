
import db from "../../../../src/db/database";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = (params);

  try {
    const { date, beginning_location, ending_location, total_miles, comment } = await request.json();

    // Validate and format the date
    const formattedDate = date.split("T")[0]; // Convert ISO date to `YYYY-MM-DD`

    // Validate total_miles (optional, but good for data consistency)
    if (isNaN(total_miles) || total_miles < 0) {
      throw new Error("Invalid value for total_miles. Must be a positive number.");
    }

    const query = `
      UPDATE mileage_table
      SET date = ?, beginning_location = ?, ending_location = ?, total_miles = ?, comment = ?
      WHERE id = ?
    `;

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [formattedDate, beginning_location, ending_location, total_miles, comment, id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    return NextResponse.json({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}

