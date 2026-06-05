import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("user", response.data.user);

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold text-red-500">
          User Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-linear-to-r from-blue-500 to-purple-600"></div>

        {/* Profile */}
        <div className="relative px-6 pb-6">

          <div className="flex flex-col items-center">
            <img
              src={user.image}
              alt={user.name}
              className="w-50 h-50 rounded-full border-4 border-white object-cover -mt-16 shadow-md"
            />

            <h2 className="text-2xl font-bold mt-4">
              {user.name}
            </h2>

            <p className="text-gray-500 capitalize">
              {user.role}
            </p>

            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                Full Name
              </p>
              <p className="font-semibold">
                {user.name}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                Email
              </p>
              <p className="font-semibold break-all">
                {user.email}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                Phone Number
              </p>
              <p className="font-semibold">
                {user.phone}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                Role
              </p>
              <p className="font-semibold capitalize">
                {user.role}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                Account Created
              </p>
              <p className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                Last Updated
              </p>
              <p className="font-semibold">
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;