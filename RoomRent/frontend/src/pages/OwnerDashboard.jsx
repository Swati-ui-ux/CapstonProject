import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance"
import { useSelector } from "react-redux"


const OwnerDashboard = () => {

const darkMode=useSelector(state=>state.theme.darkMode)
  const [stats, setStats] =
    useState(null);

  const token =
    localStorage.getItem("token");

const getStats = async () => {

    try {

      const response =
        await axiosInstance.get(
          "/dashboard/stats",
        );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getStats();
  }, []);

  if (!stats) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }



  return  (
  <div
    className={`min-h-screen w-full p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black"
        : "bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100"
    }`}
  >
    {/* Heading */}
    <div className="mb-10">
      <h1
        className={`text-4xl font-extrabold tracking-wide ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        🏠 Owner Dashboard
      </h1>

      <p
        className={`mt-2 text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Monitor your properties, rooms and rental collection.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

      {/* Total Properties */}
      <div
        className={`rounded-3xl p-7 transition duration-300 hover:scale-105 hover:-translate-y-2 border ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border-gray-700 shadow-2xl"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Properties
            </p>

            <h2 className="text-4xl font-bold text-cyan-500 mt-3">
              {stats.totalProperties}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl">
            🏢
          </div>
        </div>
      </div>

      {/* Total Rooms */}
      <div
        className={`rounded-3xl p-7 transition duration-300 hover:scale-105 hover:-translate-y-2 border ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border-gray-700 shadow-2xl"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Rooms
            </p>

            <h2 className="text-4xl font-bold text-green-500 mt-3">
              {stats.totalRooms}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl">
            🚪
          </div>
        </div>
      </div>

      {/* Occupied */}
      <div
        className={`rounded-3xl p-7 transition duration-300 hover:scale-105 hover:-translate-y-2 border ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border-gray-700 shadow-2xl"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Occupied Rooms
            </p>

            <h2 className="text-4xl font-bold text-violet-500 mt-3">
              {stats.occupiedRooms}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center text-3xl">
            👥
          </div>
        </div>
      </div>

      {/* Vacant */}
      <div
        className={`rounded-3xl p-7 transition duration-300 hover:scale-105 hover:-translate-y-2 border ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border-gray-700 shadow-2xl"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Vacant Rooms
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-3">
              {stats.vacantRooms}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl">
            🛏️
          </div>
        </div>
      </div>

      {/* Rent Collected */}
      <div
        className={`rounded-3xl p-7 transition duration-300 hover:scale-105 hover:-translate-y-2 border ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border-gray-700 shadow-2xl"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Rent Collected
            </p>

            <h2 className="text-4xl font-bold text-emerald-500 mt-3">
              ₹{stats.totalRentCollected}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-3xl">
            💰
          </div>
        </div>
      </div>

      {/* Pending Rent */}
      <div
        className={`rounded-3xl p-7 transition duration-300 hover:scale-105 hover:-translate-y-2 border ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border-gray-700 shadow-2xl"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Pending Rent
            </p>

            <h2 className="text-4xl font-bold text-red-500 mt-3">
              ₹{stats.pendingRent}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-3xl">
            📄
          </div>
        </div>
      </div>

    </div>
  </div>
);
};

export default OwnerDashboard;