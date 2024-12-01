"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMileage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true); // Add loading state
  const [date, setDate] = useState("");
  const [beginning_location, setBeginningLocation] = useState("");
  const [ending_location, setEndingLocation] = useState("");
  const [total_miles, setTotalMiles] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchMileageData = async () => {
      try {
        const response = await fetch(`/api/getMileageData/${id}`);
        const data = await response.json();

        const formattedDate = data.date ? data.date.split("T")[0] : "";

        setDate(formattedDate);
        setBeginningLocation(data.beginning_location);
        setEndingLocation(data.ending_location);
        setTotalMiles(data.total_miles);
        setComment(data.comment);
      } catch (error) {
        console.error("Error fetching mileage data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (id) {
      fetchMileageData();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/editMileage/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          beginning_location,
          ending_location,
          total_miles,
          comment,
        }),
      });

      if (response.ok) {
        router.push("/mileage");
      } else {
        console.error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Avoid mismatched content
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 py-8">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-center mt-4">Edit Mileage</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
          <label>
            Beginning Location:
            <input
              type="text"
              value={beginning_location}
              onChange={(e) => setBeginningLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
          <label>
            Ending Location:
            <input
              type="text"
              value={ending_location}
              onChange={(e) => setEndingLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
          <label>
            Total Miles:
            <input
              type="number"
              value={total_miles}
              onChange={(e) => setTotalMiles(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
