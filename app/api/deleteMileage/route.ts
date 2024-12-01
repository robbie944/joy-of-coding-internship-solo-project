import db from "../../../src/db/database";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Extract the `id` from the request body

    const query = "DELETE FROM mileage_table WHERE id = ?";
    await new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}

