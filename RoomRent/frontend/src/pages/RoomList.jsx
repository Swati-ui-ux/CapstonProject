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
  <div
    className={`mt-10 rounded-3xl p-8 transition-all duration-500 ${
      darkMode
        ? "bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl"
        : "bg-white shadow-2xl"
    }`}
  >
    {/* Header */}

    <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
      <div>
        <h2
          className={`text-4xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          🏠 Rooms
        </h2>

        <p
          className={`mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Manage all rooms in this property.
        </p>
      </div>

      <div className="bg-blue-600 text-white px-5 py-3 rounded-full font-semibold shadow-lg">
        Total Rooms : {rooms.length}
      </div>
    </div>

    {rooms.length === 0 ? (
      <div className="text-center py-16">
        <div className="text-7xl mb-4">🚪</div>

        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-700"
          }`}
        >
          No Rooms Found
        </h2>

        <p
          className={`mt-3 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Generate rooms to get started.
        </p>
      </div>
    ) : (
      [...new Set(rooms.map((room) => room.floorNumber))].map((floor) => (
        <div key={floor} className="mb-12">

          {/* Floor */}

          <div className="flex items-center gap-4 mb-6">

            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
                darkMode
                  ? "bg-indigo-700 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {floor}
            </div>

            <h3
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Floor {floor}
            </h3>

          </div>

          {/* Room Grid */}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {rooms
              .filter((room) => room.floorNumber === floor)
              .map((room) => (
                <div
                  key={room.id}
                  className={`rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ${
                    darkMode
                      ? "bg-white/10 border border-gray-700"
                      : "bg-gradient-to-br from-white to-blue-50 shadow-xl"
                  }`}
                >
                  <div className="flex justify-between items-center">

                    <h3
                      className={`text-2xl font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      🚪 Room {room.roomNumber}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        room.status === "available"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {room.status}
                    </span>

                  </div>

                  <div
                    className={`mt-6 space-y-3 ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    <p>💰 Rent : ₹{room.rent}</p>

                    <p>🏢 Floor : {room.floorNumber}</p>
                  </div>

                  {room.User && (
                    <div className="mt-5 rounded-xl bg-green-500/10 p-4 border border-green-400/30">

                      <h4 className="font-bold text-green-500">
                        👤 {room.User.name}
                      </h4>

                      <p
                        className={`text-sm mt-1 ${
                          darkMode
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {room.User.email}
                      </p>

                    </div>
                  )}

                  {room.status === "available" && (
                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowModal(true);
                        getTenants();
                      }}
                      className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition-all duration-300 text-white font-semibold"
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

    {/* Modal */}

    {showModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">

        <div
          className={`w-full max-w-lg rounded-3xl p-8 ${
            darkMode
              ? "bg-slate-900 border border-gray-700"
              : "bg-white shadow-2xl"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-8 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            👥 Select Tenant
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">

            {tenants.length === 0 ? (
              <p
                className={`text-center ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                No tenants available.
              </p>
            ) : (
              tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className={`rounded-2xl p-4 flex justify-between items-center ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-100"
                  }`}
                >
                  <div>
                    <h3
                      className={`font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {tenant.name}
                    </h3>

                    <p
                      className={`text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {tenant.email}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      assignTenant(selectedRoom.id, tenant.id)
                    }
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition"
                  >
                    Assign
                  </button>
                </div>
              ))
            )}

          </div>

          <button
            onClick={() => setShowModal(false)}
            className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 transition"
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