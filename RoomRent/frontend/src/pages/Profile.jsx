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
  <div
    className={`min-h-screen flex justify-center items-center p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800"
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100"
    }`}
  >
    <div
      className={`w-full max-w-5xl rounded-[30px] overflow-hidden transition-all duration-500 ${
        darkMode
          ? "bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl"
          : "bg-white shadow-2xl"
      }`}
    >
      {/* Cover */}
      <div
        className={`h-56 ${
          darkMode
            ? "bg-gradient-to-r from-slate-800 via-indigo-900 to-black"
            : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
        }`}
      ></div>

      <div className="relative px-8 pb-10">

        {/* Profile */}
        <div className="flex flex-col items-center">

          <img
            src={user.image}
            alt={user.name}
            className="w-44 h-44 rounded-full border-[6px] border-white object-cover shadow-2xl -mt-24"
          />

          <h1
            className={`text-4xl font-bold mt-5 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {user.name}
          </h1>

          <p
            className={`capitalize mt-2 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {user.role}
          </p>

          <span
            className={`mt-4 px-5 py-2 rounded-full font-semibold ${
              user.isActive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {user.isActive ? "🟢 Active" : "🔴 Inactive"}
          </span>
        </div>

        {/* Details */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {[
            {
              title: "Full Name",
              value: user.name,
            },
            {
              title: "Email",
              value: user.email,
            },
            {
              title: "Phone Number",
              value: user.phone,
            },
            {
              title: "Role",
              value: user.role,
            },
            {
              title: "Created",
              value: new Date(user.createdAt).toLocaleDateString(),
            },
            {
              title: "Last Updated",
              value: new Date(user.updatedAt).toLocaleDateString(),
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] ${
                darkMode
                  ? "bg-white/10 border border-gray-700"
                  : "bg-gray-50 shadow-md"
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.title}
              </p>

              <h2
                className={`font-semibold text-lg break-all mt-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {item.value}
              </h2>
            </div>
          ))}

        </div>

        {/* Edit Form */}

        {isEditing && (
          <div
            className={`mt-10 rounded-3xl p-8 ${
              darkMode
                ? "bg-white/10 border border-gray-700"
                : "bg-gray-50 shadow-lg"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Edit Profile
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-4 rounded-xl mb-5 outline-none transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                  : "border border-gray-300 focus:border-blue-500"
              }`}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-4 rounded-xl mb-5 outline-none transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                  : "border border-gray-300 focus:border-blue-500"
              }`}
            />

            <input
              type="file"
              onChange={handleFileChange}
              className={`w-full p-4 rounded-xl mb-5 ${
                darkMode
                  ? "bg-gray-800 border border-gray-600 text-white"
                  : "border border-gray-300"
              }`}
            />

            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-36 h-36 rounded-full object-cover shadow-lg mb-6 border-4 border-blue-500"
              />
            )}

            <button
              onClick={handleUpdateProfile}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition text-white font-bold text-lg"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-gradient-to-r from-indigo-700 to-blue-700 text-white"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            }`}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>

          <button
            onClick={handleLogout}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition-all duration-300 text-white font-semibold"
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