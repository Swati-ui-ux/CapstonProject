import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance"

const MyRoom = () => {
  const [rooms, setRooms] = useState([]); // ✅ array fix
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("token");
const darkMode = useSelector(
  (state) => state.theme.darkMode
);
  const user = useSelector(state => state.user.user)
  console.log("user",user)
const getPayments = async () => {
    try {
     

      const response = await axiosInstance.get(
        "/payment/my-payments",
      );

       const data = response.data.payments;
     console.log("payment data",data)
    if (!data || data.length === 0) {
      setPayments([]);
      {user?.role==='tenant'&&toast.info("No payment records found")};
      return;
    }

    setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };

const getMyRoom = async () => {
    try {
     

      const response = await axiosInstance.get(
        "/room/my-room"
      );
    setRooms(response.data.room || []); // ✅ safe fallback
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to load room"
      );
    } finally {
      setLoading(false);
    }
  };

const handlePayment = async (payment) => {

  try {
    // 1. create order
    const { data } = await axiosInstance.post(
      "/payment/create-order",
      { amount: payment.amount },
    );

    // 2. Razorpay options
    const options = {
      key: "rzp_test_Sy0OM7nDgy7P8S",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,

      handler: async function (response) {
        // 3. verify + update DB
        await axiosInstance.post(
          "/payment/pay",
          {
            paymentId: payment.id,
            razorpay_payment_id: response.razorpay_payment_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       toast.success("Payment Successful");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.log(error);
    alert("Payment failed");
  }
};
    
  useEffect(() => {
    getMyRoom();
    getPayments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Loading...
        </h1>
      </div>
    );
  }

  if (rooms.length === 0 && user?.role==="tentant") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500">
            No Room Assigned
          </h2>
          <p className="text-gray-500 mt-2">
            Please contact the property owner.
          </p>
        </div>
      </div>
    );
  }
  if (user?.role === "owner"&& rooms.length===0) {
  return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          
          <p className="text-gray-500 text-2xl mt-2">
            This is tenant page owner not allowed.
          </p>
        </div>
      </div>
    );
  }
 return (
  <div
    className={`min-h-screen p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800"
        : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
    }`}
  >
    {/* Heading */}

    <div className="text-center mb-10">
      <h1
        className={`text-5xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        🏠 My Room
      </h1>

      <p
        className={`mt-2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        View your room details and rent payments.
      </p>
    </div>

    {/* Room Details */}

    {rooms.map((room) => (
      <div
        key={room.id}
        className={`max-w-6xl mx-auto rounded-3xl overflow-hidden mb-12 ${
          darkMode
            ? "bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl"
            : "bg-white shadow-2xl"
        }`}
      >
        {/* Image */}

        {room.Property?.image && (
          <div className="relative">
            <img
              src={room.Property.image}
              alt="Property"
              className="w-full h-96 object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-8 left-8">
              <h2 className="text-4xl font-bold text-white">
                {room.Property?.propertyName}
              </h2>

              <p className="text-gray-200 mt-2">
                📍 {room.Property?.location}
              </p>
            </div>
          </div>
        )}

        {/* Content */}

        <div className="p-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Room Number",
                value: room.roomNumber,
                color: "text-blue-500",
              },
              {
                title: "Floor",
                value: room.floorNumber,
                color: "text-green-500",
              },
              {
                title: "Monthly Rent",
                value: `₹${room.rent}`,
                color: "text-yellow-500",
              },
              {
                title: "Status",
                value: room.status,
                color:
                  room.status === "available"
                    ? "text-green-500"
                    : "text-red-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-5 transition hover:scale-105 ${
                  darkMode
                    ? "bg-white/10 border border-gray-700"
                    : "bg-gray-50 shadow"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {item.title}
                </p>

                <h3
                  className={`text-2xl font-bold mt-2 ${item.color}`}
                >
                  {item.value}
                </h3>
              </div>
            ))}

          </div>

          <div
            className={`mt-8 rounded-2xl p-6 ${
              darkMode
                ? "bg-white/10 border border-gray-700"
                : "bg-blue-50"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              About Property
            </h3>

            <p
              className={`leading-8 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {room.Property?.description}
            </p>
          </div>

        </div>

      </div>
    ))}

    {/* Payment Section */}

    <div className="max-w-6xl mx-auto">

      <h2
        className={`text-4xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        💳 Payment History
      </h2>

      {payments.length === 0 && user?.role === "tenant" ? (
        <div
          className={`rounded-3xl p-12 text-center ${
            darkMode
              ? "bg-white/10 border border-gray-700"
              : "bg-white shadow-xl"
          }`}
        >
          <div className="text-6xl">💳</div>

          <h3
            className={`text-3xl font-bold mt-5 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            No Payment Records
          </h3>

          <p
            className={`mt-3 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            No rent payments have been generated yet.
          </p>
        </div>
      ) : (
        payments.map((payment) => (
          <div
            key={payment.id}
            className={`rounded-3xl p-6 mb-6 transition hover:-translate-y-1 ${
              darkMode
                ? "bg-white/10 border border-gray-700"
                : "bg-white shadow-xl"
            }`}
          >
            <div className="flex justify-between flex-wrap gap-4">

              <div>
                <h3
                  className={`text-2xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  🏠 {payment.Room?.Property?.propertyName}
                </h3>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  🚪 Room {payment.Room?.roomNumber}
                </p>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  📅 {payment.month}
                </p>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-bold text-green-500">
                  ₹{payment.amount}
                </h2>

                <span
                  className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${
                    payment.status === "paid"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {payment.status}
                </span>
              </div>

            </div>

            {payment.status !== "paid" && (
              <button
                onClick={() => handlePayment(payment)}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                Pay Rent
              </button>
            )}

          </div>
        ))
      )}

    </div>
  </div>
);
};

export default MyRoom;