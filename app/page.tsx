import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-start pt-8">
        <h1 className="text-2xl font-bold text-center">
          Robin's Inventory Control and Mileage Tracker
        </h1>
        <div className="flex items-center mt-4">
          <span className="mr-2 text-7xl">🚗</span>
          <span className="mr-2 text-7xl">💰</span>
        </div>
      </div>
    </div>
  );
}

