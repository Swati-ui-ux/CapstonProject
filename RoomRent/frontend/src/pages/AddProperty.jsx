import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axiosInstance from "../utils/axiosInstance"

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    location: "",
      description: "",
    image:null,
  });
  const user = useSelector(state=>state.user.user)
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const handleChange = (e) => {
  if (e.target.type === "file") {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

   
  } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    const data = new FormData();

      data.append("propertyName",formData.propertyName);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("image", formData.image);
  setIsLoading(true)
    const response = await axiosInstance.post(
      "/property/create",
      data,
    );

    console.log(response.data);

    alert("Property Added Successfully");
    navigate("/my-properties")
   setIsLoading(false)
    setFormData({
      propertyName: "",
      location: "",
      description: "",
      image: null,
    });

    
  } catch (error) {
    console.log(error);

    alert(
      error?.response?.data?.message ||
        "Something went wrong"
    );
  }
  };
  
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
 const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
return (
  <>
    {user?.role === "owner" && (
      <div
        className={`min-h-screen flex justify-center items-center p-6 transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900"
            : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
        }`}
      >
        <div
          className={`w-full max-w-xl rounded-3xl p-8 transition-all ${
            darkMode
              ? "bg-white/10 backdrop-blur-xl border border-slate-700 shadow-2xl"
              : "bg-white shadow-2xl"
          }`}
        >
          {/* Heading */}

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🏠</div>

            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Add Property
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Add your property details to start managing rooms.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Property Name */}

            <div>
              <label
                className={`block mb-2 font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Property Name
              </label>

              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Enter property name"
                className={`w-full rounded-xl p-4 border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-200 placeholder:text-gray-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500"
                }`}
                required
              />
            </div>

            {/* Location */}

            <div>
              <label
                className={`block mb-2 font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className={`w-full rounded-xl p-4 border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-200 placeholder:text-gray-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500"
                }`}
                required
              />
            </div>

            {/* Description */}

            <div>
              <label
                className={`block mb-2 font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write property description..."
                className={`w-full rounded-xl p-4 border outline-none resize-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-200 placeholder:text-gray-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500"
                }`}
              />
            </div>

            {/* Image */}

            <div>
              <label
                className={`block mb-2 font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Property Image
              </label>

              <input
                type="file"
                name="image"
                onChange={handleChange}
                required
                className={`w-full rounded-xl border file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:text-white file:font-semibold ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-300 file:bg-slate-600 hover:file:bg-slate-500"
                    : "bg-white border-gray-300 text-gray-700 file:bg-blue-600 hover:file:bg-blue-700"
                }`}
              />
            </div>

            {/* Preview */}

            {formData.image && (
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="preview"
                  className="w-48 h-32 object-cover rounded-2xl border shadow-lg"
                />
              </div>
            )}

            {/* Button */}

            <button
              type="submit"
              className={`w-full py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 ${
                darkMode
                  ? "bg-slate-700 hover:bg-slate-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <Loader text="Adding..." />
              ) : (
                "Add Property"
              )}
            </button>

          </form>
        </div>
      </div>
    )}
  </>
);
};

export default AddProperty

  