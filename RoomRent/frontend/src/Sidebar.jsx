import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaDoorOpen,
  FaList,
  FaCalendarCheck,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Add Property",
      icon: <FaBuilding />,
      path: "/add-property",
    },
    {
      name: "View Properties",
      icon: <FaList />,
      path: "/my-properties",
    },
    {
      name: "Add Room",
      icon: <FaDoorOpen />,
      path: "/add-room",
    },
    {
      name: "View Rooms",
      icon: <FaHome />,
      path: "/view-rooms",
    },
    {
      name: "View Bookings",
      icon: <FaCalendarCheck />,
      path: "/view-bookings",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-white shadow-xl p-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Owner Panel
      </h2>

      <ul className="space-y-3">

        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
          >
            <li
              className="flex items-center gap-4 px-4 py-3 rounded-xl
                         text-gray-700 cursor-pointer
                         hover:bg-indigo-600 hover:text-white
                         transition-all duration-300
                         hover:translate-x-2"
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </li>
          </Link>
        ))}

        <li
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-xl
                     text-red-500 cursor-pointer
                     hover:bg-red-500 hover:text-white
                     transition-all duration-300
                     hover:translate-x-2"
        >
          <span className="text-xl">
            <FaSignOutAlt />
          </span>

          <span className="font-medium">
            Logout
          </span>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;