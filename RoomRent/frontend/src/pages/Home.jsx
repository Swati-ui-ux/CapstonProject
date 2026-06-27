import axios from "axios";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from "../redux/userSlice"
import OwnerDashboard from "./OwnerDashboard"
import axiosInstance from "../utils/axiosInstance"

const Home = () => {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch()
  const token = localStorage.getItem("token");
 const user = useSelector((state) => state.user.user);
  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        "/users/profile",
        );

      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-semibold text-blue-600">
          Loading profile...
        </h1>
      </div>
    );
  }

return (
  <>
    {user?.role === "tenant" ? (
      <div
        className={`min-h-screen flex items-center justify-center p-6 transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900"
            : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
        }`}
      >
        <div
          className={`w-full max-w-lg rounded-3xl overflow-hidden ${
            darkMode
              ? "bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl"
              : "bg-white shadow-2xl"
          }`}
        >
          {/* Header */}

          <div
            className={`p-8 text-center ${
              darkMode
                ? "bg-gradient-to-r from-indigo-900 to-slate-900"
                : "bg-gradient-to-r from-blue-500 to-indigo-600"
            }`}
          >
            <div className="text-6xl mb-3">🏠</div>

            <h1 className="text-4xl font-bold text-white">
              Welcome
            </h1>

            <p className="text-gray-200 mt-2">
              Room Rent Management System
            </p>
          </div>

          {/* User */}

          <div className="p-8">

            <div className="flex flex-col items-center">

              <img
                src={
                  user?.image ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-xl"
              />

              <h2
                className={`text-3xl font-bold mt-5 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {user.name}
              </h2>

              <span
                className={`mt-3 px-5 py-2 rounded-full font-semibold ${
                  user.role === "tenant"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-blue-500/20 text-blue-500"
                }`}
              >
                {user.role}
              </span>

            </div>

            {/* Details */}

            <div className="mt-8 space-y-5">

              <div
                className={`rounded-2xl p-5 ${
                  darkMode
                    ? "bg-white/10 border border-gray-700"
                    : "bg-blue-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Full Name
                </p>

                <h3
                  className={`text-xl font-bold mt-1 ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {user.name}
                </h3>
              </div>

              <div
                className={`rounded-2xl p-5 ${
                  darkMode
                    ? "bg-white/10 border border-gray-700"
                    : "bg-purple-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Email Address
                </p>

                <h3
                  className={`text-lg font-semibold break-all mt-1 ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {user.email}
                </h3>
              </div>

              <div
                className={`rounded-2xl p-5 ${
                  darkMode
                    ? "bg-white/10 border border-gray-700"
                    : "bg-green-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Account Type
                </p>

                <h3 className="text-xl font-bold text-green-500 mt-1">
                  {user.role}
                </h3>
              </div>

            </div>

          </div>

        </div>
      </div>
    ) : (
      <OwnerDashboard />
    )}
  </>
);
};

export default Home;