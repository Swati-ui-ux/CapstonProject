import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const MyRoom = () => {
  const [rooms, setRooms] = useState([]); // ✅ array fix
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("token");

  const user = useSelector(state => state.user.user)
  console.log("user",user)
const getPayments = async () => {
    try {
     

      const response = await axios.get(
        "http://localhost:9000/payment/my-payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
     

      const response = await axios.get(
        "http://localhost:9000/room/my-room",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    const { data } = await axios.post(
      "http://localhost:9000/payment/create-order",
      { amount: payment.amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2. Razorpay options
    const options = {
      key: "rzp_test_Sy0OM7nDgy7P8S",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,

      handler: async function (response) {
        // 3. verify + update DB
        await axios.post(
          "http://localhost:9000/payment/pay",
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
    <div className="min-h-screen bg-gray-100 p-6">

      {rooms.map((room) => (
        <div key={room.id} className="max-w-5xl mx-auto mb-10">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            My Rooms
          </h1>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Image */}
            {room.Property?.image && (
              <img
                src={room.Property.image}
                alt="Property"
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-8">

              {/* GRID */}
              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-blue-50 p-5 rounded-xl">
                  <h3 className="text-gray-600">Property</h3>
                  <p className="text-xl font-bold text-blue-600">
                    {room.Property?.propertyName}
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-xl">
                  <h3 className="text-gray-600">Room Number</h3>
                  <p className="text-xl font-bold text-green-600">
                    {room.roomNumber}
                  </p>
                </div>

                <div className="bg-purple-50 p-5 rounded-xl">
                  <h3 className="text-gray-600">Floor</h3>
                  <p className="text-xl font-bold text-purple-600">
                    {room.floorNumber}
                  </p>
                </div>

                <div className="bg-yellow-50 p-5 rounded-xl">
                  <h3 className="text-gray-600">Monthly Rent</h3>
                  <p className="text-xl font-bold text-yellow-600">
                    ₹{room.rent}
                  </p>
                </div>

              </div>

              {/* DETAILS */}
              <div className="mt-6 bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-700">
                  📍 {room.Property?.location}
                </p>
                <p className="text-gray-600 mt-2">
                  {room.Property?.description}
                </p>
              </div>

              {/* STATUS */}
              <div className="mt-5">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  {room.status}
                </span>
              </div>

            </div>
          </div>
        </div>
      ))}

      <div className="max-w-5xl mx-auto mt-10">

       

        {payments.length === 0 && user?.role==='tenant' ? (
          <div className="bg-white p-6 rounded-xl shadow">
             <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Payment History
        </h2>
            No payments paid
          </div>
        ) : (
          payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white shadow rounded-xl p-5 mb-4"
            >
               <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Payment History
        </h2>
              <h3 className="text-lg font-bold mb-2">
                Rent Information
              </h3>
                <p>🏠 Property: {payment.Room?.Property?.propertyName}</p>
                <p>🚪 Room No: {payment.Room?.roomNumber}</p>
              <p>💰 Monthly Rent: ₹{payment.amount}</p>
              <p>📅 Month: {payment.month}</p>
 
              <p
                className={
                  payment.status === "paid"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                Status: {payment.status}
                  </p>
                  <button
                onClick={() => handlePayment(payment)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                Pay Rent
                </button>
            </div>
          ))
        )}
      
      </div>
    </div>
  );
};

export default MyRoom;