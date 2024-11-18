
import '../app/globals.css'
import React from 'react';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <NavBar />
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          Robin's Inventory Control and Mileage Tracker
        </h1>
      </div>
    </div>
  );
}




