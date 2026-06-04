import axios from "axios";
import React, { useEffect, useState } from "react";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProperties = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:9000/property/my-properties",
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
    getProperties();
  }, []);

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Properties
      </h1>

      {properties.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;