import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"
import { useSelector } from "react-redux"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
 const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  const token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        "/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data.user;

      setUser(userData);

      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleUpdateProfile = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      console.log(file);
      if (file) {
        data.append("image", file);
      }

      const response = await axiosInstance.put(
        "/users/update",
        data,
      );

      setUser(response.data.user);

      setFormData({
        name: response.data.user.name,
        phone: response.data.user.phone,
      });

      setFile(null);
      setIsEditing(false);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };


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
        <div className={`h-40 ${darkMode ? "bg-linear-to-r from-slate-600 to-slate-900" : "bg-linear-to-r from-blue-400 to-blue-500"}`}></div>

        <div className="relative px-6 pb-6">

          {/* Profile Info */}
          <div className="flex flex-col items-center">

            <img
              src={user.image}
              alt={user.name}
              className="w-40 h-40 rounded-full border-4 border-white object-cover -mt-16 shadow-md"
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

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold break-all">
                {user.email}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-semibold">{user.phone}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Role</p>
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

          {/* Edit Form */}
          {isEditing && (
            <div className="mt-8 bg-gray-50 p-6 rounded-xl">

              <h2 className="text-xl font-bold mb-4">
                Edit Profile
              </h2>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border p-3 rounded-lg mb-3"
              />

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              )}

              <button
                onClick={handleUpdateProfile}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Save Changes
              </button>

            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`
                ${darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-blue-600 hover:bg-blue-700"} 
                text-white 
                px-6 
                py-2 
                rounded-lg
              `}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
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