import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"
import { useSelector } from "react-redux";
const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const darkMode = useSelector(
  (state) => state.theme.darkMode
);

  const [loading, setLoading] =
    useState(false);

  const [image, setImage] =
    useState(null);

  const [formData, setFormData] =
    useState({
      propertyName: "",
      location: "",
      description: "",
    });

  const token =
    localStorage.getItem("token");

  const getProperty = async () => {
    try {
      const response =
        await axiosInstance.get(
          `/property/${id}`,
          
        );

      const property =
        response.data.property;

      setFormData({
        propertyName:
          property.propertyName || "",
        location:
          property.location || "",
        description:
          property.description || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        new FormData();

      data.append(
        "propertyName",
        formData.propertyName
      );

      data.append(
        "location",
        formData.location
      );

      data.append(
        "description",
        formData.description
      );

      if (image) {
        data.append(
          "image",
          image
        );
      }

      const response =
        await axiosInstance.put(
          `/property/update/${id}`,
          data,
        );


      alert(
        "Property Updated Successfully"
      );

      navigate("/my-properties");

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    className={`min-h-screen flex justify-center items-center p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800"
        : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
    }`}
  >
    <div
      className={`w-full max-w-2xl rounded-3xl overflow-hidden ${
        darkMode
          ? "bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl"
          : "bg-white shadow-2xl"
      }`}
    >
      {/* Header */}

      <div
        className={`p-8 ${
          darkMode
            ? "bg-gradient-to-r from-indigo-900 to-slate-900"
            : "bg-gradient-to-r from-blue-500 to-indigo-600"
        }`}
      >
        <h1 className="text-4xl font-bold text-white">
          🏠 Edit Property
        </h1>

        <p className="text-gray-200 mt-2">
          Update your property details below.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6"
      >
        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Property Name
          </label>

          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
            className={`w-full p-4 rounded-xl outline-none transition ${
              darkMode
                ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                : "border border-gray-300 focus:border-blue-500"
            }`}
          />
        </div>

        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={`w-full p-4 rounded-xl outline-none transition ${
              darkMode
                ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                : "border border-gray-300 focus:border-blue-500"
            }`}
          />
        </div>

        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-4 rounded-xl outline-none resize-none transition ${
              darkMode
                ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                : "border border-gray-300 focus:border-blue-500"
            }`}
          />
        </div>

        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Change Property Image
          </label>

          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className={`w-full p-4 rounded-xl ${
              darkMode
                ? "bg-gray-800 border border-gray-600 text-white"
                : "border border-gray-300"
            }`}
          />

          {image && (
            <div className="mt-5">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-56 object-cover rounded-2xl border-4 border-blue-500 shadow-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-gradient-to-r from-indigo-700 to-blue-700 hover:scale-[1.02] text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] text-white"
          }`}
        >
          {loading ? "Updating..." : "Update Property"}
        </button>

      </form>
    </div>
  </div>
);
};

export default EditProperty;