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

const EditProperty = () => {
  const { id } = useParams();

  const navigate = useNavigate();

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
        await axios.put(
          `http://localhost:9000/property/update/${id}`,
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(response.data);

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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Edit Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Property Name
            </label>

            <input
              type="text"
              name="propertyName"
              value={
                formData.propertyName
              }
              onChange={
                handleChange
              }
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Change Image
            </label>

            <input
              type="file"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading
              ? "Updating..."
              : "Update Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;