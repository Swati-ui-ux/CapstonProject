import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance"


const OwnerDashboard = () => {

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




  return (
  <div className="p-6 bg-gray-100 min-h-screen">
      
    
    <h1 className="text-3xl font-bold mb-8 text-gray-800">
      Owner Dashboard
      </h1>
      
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-sm font-medium text-gray-500">
          Total Properties
          </h2>
          
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {stats.totalProperties}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-sm font-medium text-gray-500">
          Total Rooms
        </h2>
        <p className="text-2xl font-bold text-green-600 mt-2">
          {stats.totalRooms}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-sm font-medium text-gray-500">
          Occupied Rooms
        </h2>
        <p className="text-2xl font-bold text-purple-600 mt-2">
          {stats.occupiedRooms}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-sm font-medium text-gray-500">
          Vacant Rooms
        </h2>
        <p className="text-2xl font-bold text-orange-500 mt-2">
          {stats.vacantRooms}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-sm font-medium text-gray-500">
          Total Rent Collected
        </h2>
        <p className="text-2xl font-bold text-emerald-600 mt-2">
          ₹{stats.totalRentCollected}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-sm font-medium text-gray-500">
          Pending Rent
        </h2>
        <p className="text-2xl font-bold text-red-500 mt-2">
          ₹{stats.pendingRent}
        </p>
      </div>

    </div>

  </div>
);
};

export default OwnerDashboard;