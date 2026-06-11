import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance"
import { useSelector } from "react-redux"

const RoomList = ({ propertyId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const token = localStorage.getItem("token");

  const getRooms = async () => {
    try {
      const response = await axiosInstance.get(
        `/room/property/${propertyId}`,
      );

      console.log("Rooms =>", response.data);

      setRooms(response.data.rooms || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load rooms"
      );
    } finally {
      setLoading(false);
    }
  };

  const getTenants = async () => {
    try {
      const response = await axiosInstance.get(
        "/users/tenants",
      );

      setTenants(response.data.tenants || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load tenants"
      );
    }
  };

  const assignTenant = async (
    roomId,
    tenantId
  ) => {
    try {
      const response = await axiosInstance.put(
        "/room/assign-tenant",
        {
          roomId,
          tenantId,
        },
        
      );

      toast.success(response.data.message);

      setShowModal(false);

      getRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Error assigning tenant"
      );
    }
  };
 const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  useEffect(() => {
    if (propertyId) {
      getRooms();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <div className="bg-white mt-8 rounded-2xl shadow-lg p-8">
        <h2 className="text-center text-lg font-semibold text-gray-500">
          Loading Rooms...
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className={`
          text-3xl 
          font-bold 
          ${darkMode ? "text-slate-900" : "text-blue-600"}
        `} >
          Rooms & Floors
        </h2>

        <span className={
`
          bg-blue-100 
          text-blue-700
&{} 
          px-4 
          py-2 
          rounded-full 
          font-medium
        `}>
          Total Rooms: {rooms.length}
        </span>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-600">
            No Rooms Found
          </h3>

          <p className="text-gray-400 mt-2">
            Generate rooms first.
          </p>
        </div>
      ) : (
        [...new Set(
          rooms.map(
            (room) => room.floorNumber
          )
        )].map((floor) => (
          <div
            key={floor}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                w-10 
                h-10 
                rounded-full 
               ${darkMode ? "bg-slate-700" : "bg-blue-600"} 
                text-white 
                flex 
                justify-center 
                items-center 
                font-bold
              `}>
                {floor}
              </div>

              <h3 className="text-2xl font-bold text-gray-700">
                Floor {floor}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {rooms
                .filter(
                  (room) =>
                    room.floorNumber === floor
                )
                .map((room) => (
                  <div
                    key={room.id}
                    className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center">

                      <h4 className="text-xl font-bold text-gray-800">
                        Room {room.roomNumber}
                      </h4>

                      <span
                        className={`
                          px-3 
                          py-1 
                          rounded-full 
                          text-sm 
                          font-semibold 
                          ${darkMode ? "bg-slate-700 text-slate-300" : "bg-blue-100 text-blue-700"}
                        `}
                      >
                        {room.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-gray-600">
                        💰 Rent:
                        <span className="font-semibold ml-2">
                          ₹{room.rent}
                        </span>
                      </p>

                      <p className="text-gray-600">
                        🏢 Floor:
                        <span className="font-semibold ml-2">
                          {room.floorNumber}
                        </span>
                      </p>
                    </div>

                    {room.User && (
                      <div className="mt-3 bg-green-50 p-3 rounded-lg">
                        <p className="font-semibold text-green-700">
                          Tenant:
                          {" "}
                          {room.User.name}
                        </p>

                        <p className="text-sm text-gray-600">
                          {room.User.email}
                        </p>
                      </div>
                    )}

                    {room.status ===
                      "available" && (
                      <button
                        onClick={() => {
                          setSelectedRoom(
                            room
                          );
                          setShowModal(
                            true
                          );
                          getTenants();
                        }}
                        className={`
                          w-full 
                          mt-5 
                          ${darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-blue-600 hover:bg-blue-700"} 
                          text-white 
                          py-2 
                          rounded-lg 
                          transition
                        `}
                      >
                        Assign Tenant
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-125 max-h-125 overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4">
              Select Tenant
            </h2>

            {tenants.length === 0 ? (
              <p className="text-center text-gray-500">
                No tenants found
              </p>
            ) : (
              tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="border rounded-lg p-3 mb-3 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">
                      {tenant.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {tenant.email}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      assignTenant(
                        selectedRoom.id,
                        tenant.id
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Assign
                  </button>
                </div>
              ))
            )}

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default RoomList;