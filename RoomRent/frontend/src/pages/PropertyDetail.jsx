import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import RoomList from "./RoomList"

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

  useEffect(() => {
    getProperty();
  }, []);

  const generateRooms = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:9000/room/create",
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
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <img
          src={property.image}
          alt={property.propertyName}
          className="w-full h-72 object-cover"
        />

        <div className="p-6">

          <h1 className="text-3xl font-bold">
            {property.propertyName}
          </h1>

          <p className="text-gray-600 mt-2">
            📍 {property.location}
          </p>

          <p className="mt-4 text-gray-700">
            {property.description}
          </p>

          <hr className="my-6" />

          <h2 className="text-2xl font-bold mb-4">
            Generate Rooms
          </h2>

          <form
            onSubmit={generateRooms}
            className="space-y-4"
          >
            <input
              type="number"
              placeholder="Total Floors"
              value={totalFloors}
              onChange={(e) =>
                setTotalFloors(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              placeholder="Rooms Per Floor"
              value={roomsPerFloor}
              onChange={(e) =>
                setRoomsPerFloor(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              placeholder="Default Rent"
              value={rent}
              onChange={(e) =>
                setRent(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
              required
            />

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Generate Rooms
            </button>
          </form>

        </div>
      </div>
            </div>
            <RoomList propertyId={id}/>
</>
            
  );
};

export default PropertyDetails;