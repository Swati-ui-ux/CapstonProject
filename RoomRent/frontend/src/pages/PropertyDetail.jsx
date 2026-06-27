import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import RoomList from "./RoomList"
import axiosInstance from "../utils/axiosInstance"
import { useSelector } from "react-redux"

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] =
    useState(null);

  const [totalFloors, setTotalFloors] =
    useState("");

  const [roomsPerFloor, setRoomsPerFloor] =
    useState("");

  const [rent, setRent] =
    useState("");

  const getProperty = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:9000/property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperty(response.data.property);
    } catch (error) {
      console.log(error);
    }
  };
const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  useEffect(() => {
    getProperty();
  }, []);

  const generateRooms = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await axiosInstance.post(
        "/room/create",
        {
          propertyId: id,
          totalFloors,
          roomsPerFloor,
          rent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message
      );
    }
  };

  if (!property) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

return (
  <>
    <div
      className={`min-h-screen p-6 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800"
          : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-3xl overflow-hidden ${
          darkMode
            ? "bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl"
            : "bg-white shadow-2xl"
        }`}
      >
        {/* Hero Image */}

        <div className="relative">
          <img
            src={property.image}
            alt={property.propertyName}
            className="w-full h-96 object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-8 left-8">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Property
            </span>

            <h1 className="text-5xl font-bold text-white mt-4">
              {property.propertyName}
            </h1>

            <p className="text-gray-200 mt-3 text-lg">
              📍 {property.location}
            </p>
          </div>
        </div>

        {/* Details */}

        <div className="grid lg:grid-cols-2 gap-10 p-8">

          {/* Left */}

          <div>

            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              About Property
            </h2>

            <p
              className={`mt-5 leading-8 text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {property.description}
            </p>

          </div>

          {/* Right */}

          <div
            className={`rounded-3xl p-8 ${
              darkMode
                ? "bg-white/10 border border-gray-700"
                : "bg-gray-50 shadow-lg"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-8 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Generate Rooms
            </h2>

            <form
              onSubmit={generateRooms}
              className="space-y-5"
            >
              <input
                type="number"
                placeholder="Total Floors"
                value={totalFloors}
                onChange={(e) =>
                  setTotalFloors(e.target.value)
                }
                required
                className={`w-full p-4 rounded-xl outline-none transition ${
                  darkMode
                    ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                    : "border border-gray-300 focus:border-blue-500"
                }`}
              />

              <input
                type="number"
                placeholder="Rooms Per Floor"
                value={roomsPerFloor}
                onChange={(e) =>
                  setRoomsPerFloor(e.target.value)
                }
                required
                className={`w-full p-4 rounded-xl outline-none transition ${
                  darkMode
                    ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                    : "border border-gray-300 focus:border-blue-500"
                }`}
              />

              <input
                type="number"
                placeholder="Default Rent"
                value={rent}
                onChange={(e) =>
                  setRent(e.target.value)
                }
                required
                className={`w-full p-4 rounded-xl outline-none transition ${
                  darkMode
                    ? "bg-gray-800 border border-gray-600 text-white focus:border-blue-500"
                    : "border border-gray-300 focus:border-blue-500"
                }`}
              />

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] ${
                  darkMode
                    ? "bg-gradient-to-r from-indigo-700 to-blue-700 text-white"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                }`}
              >
                Generate Rooms
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>

    <RoomList propertyId={id} />
  </>
);
};

export default PropertyDetails;