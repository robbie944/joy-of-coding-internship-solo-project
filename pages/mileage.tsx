import React, { useState } from "react";
import NavBar from "../components/NavBar";

const MileagePage = () => {
  const [date, setDate] = useState("");
  const [beginning_location, setBeginningLocation] = useState("");
  const [ending_location, setEndingLocation] = useState("");
  const [total_miles, setTotalMiles] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/submitMileage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        beginning_location,
        ending_location,
        total_miles,
        comment,
      }),
    });

    if (response.ok) {
      console.log("Data submitted successfully");
      setDate("");
      setBeginningLocation("");
      setEndingLocation("");
      setTotalMiles("");
      setComment("");
    } else {
      console.error("Failed to submit data");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-200 py-8">
        <div className="w-full max-w-lg bg-white p-8 rounded shadow-md border border-gray-300">
          {" "}
          {/* Added border */}
          <h1 className="text-2xl font-bold mb-4 text-center mt-4">
            Mileage Form
          </h1>
          <h3 className="text-lg text-center text-gray-700">
            Please log each leg of the trip separately.
          </h3>{" "}
          {/* Added H3 */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="block">
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </label>
            <label className="block">
              Beginning Location:
              <input
                type="text"
                value={beginning_location}
                onChange={(e) => setBeginningLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </label>
            <label className="block">
              Ending Location:
              <input
                type="text"
                value={ending_location}
                onChange={(e) => setEndingLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </label>
            <label className="block">
              Total Miles:
              <input
                type="number"
                value={total_miles}
                onChange={(e) => setTotalMiles(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </label>
            <label className="block">
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MileagePage;
