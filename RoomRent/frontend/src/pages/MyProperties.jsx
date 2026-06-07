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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
  if (user?.role === 'tenant') {
  return   <div className="bg-white   p-16 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-6">
        This is owner page 
      </h1>
          <p className="text-gray-500">
            Tenant not allowed
          </p>
        </div>
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      

      {properties.length === 0&&user?.role==="owner" ? (
        <div className="bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-6">
        My Properties
      </h1>
          <p className="text-gray-500">
            No properties added yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <h1 className="text-3xl font-bold mb-6">
        My Properties
      </h1>
            <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
              <h2 className="text-xl font-bold mb-2">
                {property.propertyName}
              </h2>

              <p className="text-gray-600 mb-2">
                📍 {property.location}
              </p>

              <p className="text-gray-500">
                {property.description}
              </p>

              <div className="mt-4 text-sm text-gray-400">
                Created:
                {" "}
                {new Date(
                  property.createdAt
                ).toLocaleDateString()}
                  </div>
                  <Link
                to={`/property/${property.id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                View Details
              </Link>
              <button
          onClick={() =>
            navigate(`/edit-property/${property.id}`)
          }
          className="bg-blue-500 text-right mx-4 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;