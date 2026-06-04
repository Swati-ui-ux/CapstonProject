import axios from "axios";
import React, { useState } from "react";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    location: "",
      description: "",
    image:null,
  });
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

    const response = await axios.post(
      "http://localhost:9000/property/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("Property Added Successfully");

    setFormData({
      propertyName: "",
      location: "",
      description: "",
      image: null,
    });

    setPreview("");
  } catch (error) {
    console.log(error);

    alert(
      error?.response?.data?.message ||
        "Something went wrong"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Add Property
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Property Name */}
          <div>
            <label className="block mb-2 font-medium">
              Property Name
            </label>

            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="Enter property name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Property description..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
            <div>
            <label className="block mb-2 font-medium">
                Property Image
            </label>

            <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
            />
        </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Property
          </button>
              </form>
             
      </div>
    </div>
  );
};

export default AddProperty;