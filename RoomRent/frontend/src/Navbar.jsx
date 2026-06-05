import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Navbar = () => {
    
  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        

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
            <Link
            to="/add-property"
            className="hover:text-blue-500"
            >
            Add Property
            </Link>
            <Link to="/my-properties">
            My Properties
          </Link>
          <Link to='/my-room'>My Room</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;