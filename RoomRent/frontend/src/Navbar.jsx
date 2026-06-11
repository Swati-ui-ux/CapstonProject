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

            {/* Theme Toggle */}

            <button
              onClick={() =>
                dispatch(toggleTheme())
              }
              className="
              p-2 rounded-full
              bg-white/20
              hover:bg-white/30
              transition
            "
            >
              {darkMode ? (
                <FaSun size={18} />
              ) : (
                <FaMoon size={18} />
              )}
            </button>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="
              flex items-center gap-2
              bg-red-500
              px-4 py-2
              rounded-lg
              hover:bg-red-600
              transition
            "
            >
              <FaSignOutAlt />
              Logout
            </button>

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

      <div
        className={`
          fixed top-0 left-0 h-full w-72
          bg-white text-gray-800
          dark:bg-slate-900 dark:text-white
          shadow-2xl z-50
          transform transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">

          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <FaTimes
            size={22}
            className="cursor-pointer"
            onClick={() =>
              setIsOpen(false)
            }
          />
        </div>

        {/* Links */}

        <div className="p-4 flex flex-col gap-3">

          <Link
            to="/"
            onClick={() =>
              setIsOpen(false)
            }
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/profile"
            onClick={() =>
              setIsOpen(false)
            }
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
          >
            <FaUser />
            Profile
          </Link>

          {user?.role === "owner" && (
            <>
              <Link
                to="/add-property"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
              >
                <FaBuilding />
                Add Property
              </Link>

              <Link
                to="/my-properties"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
              >
                <FaBuilding />
                My Properties
              </Link>

              <Link
                to="/owner-payments"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
              >
                <FaMoneyBillWave />
                Payments
              </Link>
            </>
          )}

          {user?.role === "tenant" && (
            <Link
              to="/my-room"
              onClick={() =>
                setIsOpen(false)
              }
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
            >
              <FaDoorOpen />
              My Room
            </Link>
          )}

          {/* Theme Toggle */}

          <button
            onClick={() =>
              dispatch(toggleTheme())
            }
            className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            bg-gray-200
            dark:bg-slate-700
            hover:opacity-90
            transition
          "
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}

            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            bg-red-500 text-white
            hover:bg-red-600
            transition
          "
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>

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