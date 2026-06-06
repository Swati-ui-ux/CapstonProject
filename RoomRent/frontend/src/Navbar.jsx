import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Navbar = () => {
    
  return (
    <nav className="bg-blue-600 text-white shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        

        {/* Links */}
        <div className="flex gap-8 font-medium">
          <Link
            to="/"
            className="hover:text-blue-100 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-100 transition duration-300"
          >
            Profile
          </Link>

          
            <Link
            to="/add-property"
            className="hover:text-blue-100"
            >
            Add Property
            </Link>
            <Link to="/my-properties" className='hover:text-blue-100 '>
            My Properties
          </Link>
          <Link to='/my-room' className='hover:text-blue-100 '>My Room</Link>
          <Link to='/owner-payments' className='hover:text-blue-100 '>Owner-payments</Link>
  
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;