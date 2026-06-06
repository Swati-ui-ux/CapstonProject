import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"

const OwnerPayments = () => {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user)
    
  const token = localStorage.getItem("token");

  const getPayments = async () => {
    try {

      const response = await axios.get(
        "http://localhost:9000/payment/owner-payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  console.log("Payment res",response)
      setPayments(response.data.payments);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
    if (user?.role === 'tenant') {
        return <div className="w-full h-full">
        <h1 className="text-2xl font-bold flex justify-center align-center p-10">This is owner page tenant not allowed</h1>
        </div>
    }
    if (!user) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading User...
    </div>
  );
}
  return (
      <>
          {user?.role==='owner'&& <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Rent Payments
      </h1>

      {payments.length === 0 ? (
        <div className="bg-white p-5 rounded shadow">
          No Payments Found
        </div>
      ) : (
        payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white p-5 rounded shadow mb-4"
          >
           <div className="mb-3 border-b pb-3">

  <h2 className="text-xl font-bold text-blue-600">
    {payment.user?.name || "No Tenant"}
  </h2>

  <p className="text-gray-600">
    Email : {payment.user?.email || "-"}
  </p>

  <p className="text-gray-600">
    Phone : {payment.user?.phone || "-"}
  </p>

</div>

            <p>
              Property :
              {payment.Room?.Property?.propertyName}
            </p>

            <p>
              Room :
              {payment.Room?.roomNumber}
            </p>

            <p>
              Floor :
              {payment.Room?.floorNumber}
            </p>

            <p>
              Amount :
              ₹{payment.amount}
            </p>

            <p>
              Month :
              {payment.month}
            </p>

            <p>
              Payment Date :
              {payment.paymentDate
                ? new Date(
                    payment.paymentDate
                  ).toLocaleDateString()
                : "Not Paid"}
            </p>

            <p
              className={
                payment.status === "paid"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              Status : {payment.status}
            </p>
          </div>
        ))
      )}
    </div>}
      </>
  );
};

export default OwnerPayments;