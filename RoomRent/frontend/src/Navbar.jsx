import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./redux/userSlice"

const Navbar = () => {

  const user = useSelector(
    (state) => state.user.user
  );
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
  dispatch(clearUser())
localStorage.removeItem("token")
navigate("/login")
  }
  return (
    <nav className={`${user?.role=='tenant'?'bg-gray-500':'bg-blue-600'} text-white shadow-md px-8 py-4`}>

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        

        
        <Link className="flex gap-6 font-medium">

        

        <div className="flex items-center gap-3">

         

          {user?.image && (
            <img
              src={user.image}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          )}

        </div>


          <Link
            to="/"
            className="hover:text-blue-100"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-100"
          >
            Profile
          </Link>

          {/* Owner Links */}

          {user?.role === "owner" && (
            <>
              <Link
                to="/add-property"
                className="hover:text-blue-100"
              >
                Add Property
              </Link>

              <Link
                to="/my-properties"
                className="hover:text-blue-100"
              >
                My Properties
              </Link>

              <Link
                to="/owner-payments"
                className="hover:text-blue-100"
              >
                Owner Payments
              </Link>
            </>
          )}

          {/* Tenant Links */}

          {user?.role === "tenant" && (
            <>
              <Link
                to="/my-room"
                className="hover:text-blue-100"
              >
                My Room
              </Link>
            </>
          )}

        </Link>
        <button className="px-4 text-xl font-bold cursor-pointer"
        onClick={handleLogout}
        >
        Logout
        
        </button>
        
      </div>

    </nav>
  );
};

export default Navbar;