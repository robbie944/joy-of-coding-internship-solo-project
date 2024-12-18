"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the structure of a mileage record
type MileageRecord = {
  id: number;
  date: string;
  beginning_location: string;
  ending_location: string;
  total_miles: number;
  comment: string;
};

export default function MileageDashboard() {
  const [mileageData, setMileageData] = useState<MileageRecord[]>([]);
  const [filteredData, setFilteredData] = useState<MileageRecord[]>([]);


  // Fetch mileage data from the API
  const fetchMileageData = async () => {
    try {
      const response = await fetch("/api/getMileageData");
      const data = await response.json();
      console.log("Fetched Mileage Data:", data);
      setMileageData(data); // Save all data
      setFilteredData(data); // Show all data initially
    } catch (error) {
      console.error("Error fetching mileage data:", error);
    }
  };

  // Handle deletion of a record
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/deleteMileage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete record with ID ${id}: ${response.status}`);
      }

      console.log(`Record with ID ${id} deleted successfully`);
      fetchMileageData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchMileageData();
  }, []);
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase(); // Convert query to lowercase for case-insensitive matching
  
    const filtered = mileageData.filter((record) => {
      const recordDate = new Date(record.date); // Convert the date string to a Date object
      const month = recordDate.toLocaleString("default", { month: "long" }).toLowerCase(); // e.g., "november"
      const year = recordDate.getFullYear().toString(); // e.g., "2024"
  
      // Return true if the query matches the month or year
      return month.includes(lowerQuery) || year.includes(lowerQuery);
    });
  
    setFilteredData(filtered); // Update filteredData with matching records
  };

   // Function to calculate total mileage
   const calculateTotalMiles = (data: MileageRecord[]) => {
    return data.reduce((sum, record) => sum + record.total_miles, 0); // Start sum at 0
  };

  const totalMiles = calculateTotalMiles(mileageData); // Total for all data
  const filteredMiles = calculateTotalMiles(filteredData); // Total for filtered data
  
  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mileage Dashboard</h1>
        <Link
          href="/mileage/add"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Mileage
        </Link>
      </div>
      <div className="mb-4">
  <p className="text-lg font-bold">Total Mileage: {totalMiles} miles</p>
  <p className="text-lg font-bold">
    Filtered Mileage: {filteredMiles} miles
  </p>
</div>

      <div className="mb-4">
  <input
    type="text"
    placeholder="Search by month or year (e.g., November or 2024)"
    className="w-full px-4 py-2 border rounded"
    onChange={(e) => handleSearch(e.target.value)}
  />
</div>

      {/* Table Section */}
      <table className="table-auto w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Beginning Location</th>
            <th className="px-4 py-2">Ending Location</th>
            <th className="px-4 py-2">Total Miles</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="px-4 py-2">{record.date}</td>
              <td className="px-4 py-2">{record.beginning_location}</td>
              <td className="px-4 py-2">{record.ending_location}</td>
              <td className="px-4 py-2">{record.total_miles}</td>
              <td className="px-4 py-2">{record.comment}</td>
              <td className="px-4 py-2">
                <Link href={`/mileage/edit/${record.id}`}>
                  <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this record?")) {
                      handleDelete(record.id);
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

