import React from 'react';
import Link from 'next/link';


const NavBar = () => {
  return (
    <div className="bg-gray-400 w-full border-b-2 border-b-gray-500 mb-5 h-14">
      <nav className="flex items-center w-full max-w-screen-xl mx-auto px-4 h-full">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="flex items-center text-xl font-bold hover:text-blue-500 mr-6">
            
            <span>Home</span>
          </a>
        </Link>
        {/* Mileage Link */}
        <Link href="/mileage" legacyBehavior>
          <a className="text-lg hover:text-blue-500 active:text-blue-700">
            Mileage
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;





