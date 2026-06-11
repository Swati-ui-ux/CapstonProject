import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./redux/userSlice";
import { toggleTheme } from "./redux/themeSlice";

import {
  FaHome,
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaDoorOpen,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbar = () => {
  const user = useSelector(
    (state) => state.user.user
  );

  const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
const  token = localStorage.getItem("token");
  const [isOpen, setIsOpen] =
    useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}

      <nav
          className={`${
    darkMode
      ? "bg-slate-900"
      : "bg-blue-600"
  } text-white shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}

          <h1 className="text-xl font-bold tracking-wide">
            RoomRent
          </h1>

          {/* Desktop Menu */}

         <div className="hidden md:flex items-center gap-6">

  {!token ? (
    <>
      <Link
        to="/login"
        className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Signup
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/"
        className="flex items-center gap-2 hover:text-gray-200 transition"
      >
        <FaHome />
        Home
      </Link>

      <Link
        to="/profile"
        className="flex items-center gap-2 hover:text-gray-200 transition"
      >
        <FaUser />
        Profile
      </Link>

      {user?.role === "owner" && (
        <>
          <Link
            to="/add-property"
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <FaBuilding />
            Add Property
          </Link>

          <Link
            to="/my-properties"
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <FaBuilding />
            Properties
          </Link>

          <Link
            to="/owner-payments"
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <FaMoneyBillWave />
            Payments
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
        </>
      )}

      {user?.role === "tenant" && (
        <Link
          to="/my-room"
          className="flex items-center gap-2 hover:text-gray-200 transition"
        >
          <FaDoorOpen />
          My Room
        </Link>
      )}

      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
      >
        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </>
  )}
</div>

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="md:hidden text-2xl"
          >
            {isOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>
      </nav>

      {/* Mobile Sidebar */}

   {!token ? (
  <>
    <Link
      to="/login"
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
    >
      Login
    </Link>

    <Link
      to="/signup"
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
    >
      Signup
    </Link>
  </>
) : (
  <>
    {/* Existing Links */}
  </>
)}

      {/* Overlay */}

      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
    </>
  );
};

export default Navbar;