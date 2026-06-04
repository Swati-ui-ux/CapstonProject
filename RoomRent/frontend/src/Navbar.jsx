import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          RoomFinder
        </h1>

        {/* Links */}
        <div className="flex gap-8 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-600 transition duration-300"
          >
            Profile
          </Link>

          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;