import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()
  const getProperties = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/property/my-properties",
      );

      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
 const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  useEffect(() => {
    if (user ?. role === "owner") {
    getProperties()
    };
  }, []);

  if (user?.role==="owner"&&loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }
 
 return (
  <div
    className={`min-h-screen p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800"
        : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
    }`}
  >
    {/* Heading */}
    <div className="mb-10">
      <h1
        className={`text-4xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        🏠 My Properties
      </h1>

      <p
        className={`mt-2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Manage all your listed properties.
      </p>
    </div>

    {properties.length === 0 && user?.role === "owner" ? (
      <div
        className={`max-w-2xl mx-auto rounded-3xl p-12 text-center ${
          darkMode
            ? "bg-white/10 backdrop-blur-lg border border-gray-700"
            : "bg-white shadow-xl"
        }`}
      >
        <div className="text-7xl mb-5">🏡</div>

        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          No Properties Yet
        </h2>

        <p
          className={`mt-3 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Start by adding your first property.
        </p>
      </div>
    ) : (
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {properties.map((property) => (
          <div
            key={property.id}
            className={`overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ${
              darkMode
                ? "bg-white/10 backdrop-blur-lg border border-gray-700 shadow-2xl"
                : "bg-white shadow-xl"
            }`}
          >
            {/* Image */}

            <div className="relative overflow-hidden">
              <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-60 object-cover transition duration-500 hover:scale-110"
              />

              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Property
              </div>
            </div>

            {/* Content */}

            <div className="p-6">

              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {property.propertyName}
              </h2>

              <p
                className={`mt-3 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                📍 {property.location}
              </p>

              <p
                className={`mt-4 line-clamp-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {property.description}
              </p>

              <div
                className={`mt-5 text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                📅 {new Date(property.createdAt).toLocaleDateString()}
              </div>

              {/* Buttons */}

              <div className="flex gap-4 mt-6">

                <Link
                  to={`/property/${property.id}`}
                  className={`flex-1 text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-gradient-to-r from-indigo-700 to-blue-700 hover:scale-105 text-white"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 text-white"
                  }`}
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    navigate(`/edit-property/${property.id}`)
                  }
                  className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 transition-all duration-300 text-white"
                >
                  Edit
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    )}
  </div>
);
};

export default MyProperties;