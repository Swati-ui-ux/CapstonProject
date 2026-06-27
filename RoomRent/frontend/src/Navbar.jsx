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
  const user = useSelector((state) => state.user.user);

  const darkMode = useSelector(
    (state) => state.theme.darkMode
  );

  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}

      <nav
        className={`${
          darkMode
            ? "bg-slate-950"
            : "bg-blue-600"
        } text-white shadow-lg min-w-screen m-0` }
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
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
                 <button
                onClick={() =>
                  dispatch(toggleTheme())
                }
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition text-left"
              >
                {darkMode ? (
                  <FaSun />
                ) : (
                  <FaMoon />
                )}
                Theme
              </button>
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
                      className="flex items-center gap-2 transition"
                    >
                      Dashboard
                      </Link>
                    <button onClick={() => dispatch(toggleTheme()) } className="flex items-center gap-3 px-4 py-3 rounded-full transition text-left" > {darkMode ? ( <FaSun /> ) : ( <FaMoon /> )} </button>
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
              setIsOpen(true)
            }
            className="md:hidden text-2xl"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Overlay */}

      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-xl z-50
        transform transition-transform duration-300 md:hidden
        ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Menu
          </h2>

          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="text-2xl text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() =>
                  setIsOpen(false)
                }
                className="px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              
             
              <Link
                to="/signup"
                onClick={() =>
                  setIsOpen(false)
                }
                className="px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                <FaHome />
                Home
              </Link>

              <Link
                to="/profile"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
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
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaBuilding />
                    Add Property
                  </Link>

                  <Link
                    to="/my-properties"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaBuilding />
                    Properties
                  </Link>

                  <Link
                    to="/owner-payments"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaMoneyBillWave />
                    Payments
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user?.role === "tenant" && (
                <Link
                  to="/my-room"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  <FaDoorOpen />
                  My Room
                </Link>
              )}


              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
              <button onClick={() => dispatch(toggleTheme()) } className="flex items-center gap-3 px-4 py-3 rounded-full transition text-left" > {darkMode ? ( <FaSun /> ) : ( <FaMoon /> )} </button>
      </div>
    </>
  );
};

export default Navbar;