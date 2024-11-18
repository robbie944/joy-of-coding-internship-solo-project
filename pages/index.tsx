import '../app/globals.css'
import React from 'react';
import NavBar from '../components/NavBar';
import { FaCarOn } from 'react-icons/fa6';
import { GiTakeMyMoney } from 'react-icons/gi';

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start pt-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center">
          Robin's Inventory Control and Mileage Tracker
        </h1>
      
        {/* Icons (placed below the heading) */}
        <div className="flex items-center mt-4">
          <FaCarOn className="mr-2 text-7xl" /> {/* Adjust size with text-3xl */}
          <GiTakeMyMoney className="mr-2 text-7xl" />
        </div>
      </div>
    </div>
  );
}






