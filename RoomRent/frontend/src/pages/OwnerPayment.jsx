import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import axiosInstance from "../utils/axiosInstance"

const OwnerPayments = () => {
  const darkMode = useSelector(
  (state) => state.theme.darkMode
);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user)
    
  const token = localStorage.getItem("token");

  const getPayments = async () => {
    try {

      const response = await axiosInstance.get(
        "/payment/owner-payments",
      );
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
    {user?.role === "owner" && (
      <div
        className={`min-h-screen p-6 transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900"
            : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
        }`}
      >
        {/* Header */}

        <div className="text-center mb-10">
          <h1
            className={`text-5xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            💳 Rent Payments
          </h1>

          <p
            className={`mt-3 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            View all rent payments made by your tenants.
          </p>
        </div>

        {payments.length === 0 ? (
          <div
            className={`max-w-3xl mx-auto rounded-3xl p-12 text-center ${
              darkMode
                ? "bg-white/10 backdrop-blur-xl border border-gray-700"
                : "bg-white shadow-2xl"
            }`}
          >
            <div className="text-6xl mb-5">💳</div>

            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              No Payments Found
            </h2>

            <p
              className={`mt-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Payment records will appear here once tenants pay rent.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">

            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  darkMode
                    ? "bg-white/10 backdrop-blur-xl border border-gray-700"
                    : "bg-white shadow-xl"
                }`}
              >
                {/* Tenant */}

                <div className="flex items-center gap-4 pb-5 border-b border-gray-300/30">

                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    {payment.user?.name?.charAt(0)}
                  </div>

                  <div>
                    <h2
                      className={`text-2xl font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {payment.user?.name || "No Tenant"}
                    </h2>

                    <p
                      className={`${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {payment.user?.email}
                    </p>

                    <p
                      className={`${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      📞 {payment.user?.phone || "-"}
                    </p>
                  </div>

                </div>

                {/* Payment Info */}

                <div className="grid grid-cols-2 gap-5 mt-6">

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-white/10"
                        : "bg-blue-50"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      Property
                    </p>

                    <h3
                      className={`font-bold mt-1 ${
                        darkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {payment.Room?.Property?.propertyName}
                    </h3>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-white/10"
                        : "bg-green-50"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      Room
                    </p>

                    <h3 className="font-bold text-green-500 mt-1">
                      {payment.Room?.roomNumber}
                    </h3>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-white/10"
                        : "bg-yellow-50"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      Floor
                    </p>

                    <h3 className="font-bold text-yellow-500 mt-1">
                      {payment.Room?.floorNumber}
                    </h3>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-white/10"
                        : "bg-purple-50"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      Month
                    </p>

                    <h3 className="font-bold text-purple-500 mt-1">
                      {payment.month}
                    </h3>
                  </div>

                </div>

                {/* Bottom */}

                <div className="mt-7 flex justify-between items-center flex-wrap gap-4">

                  <div>
                    <h2 className="text-3xl font-bold text-green-500">
                      ₹{payment.amount}
                    </h2>

                    <p
                      className={`mt-2 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Paid On :
                      {" "}
                      {payment.paymentDate
                        ? new Date(
                            payment.paymentDate
                          ).toLocaleDateString()
                        : "Not Paid"}
                    </p>
                  </div>

                  <span
                    className={`px-5 py-2 rounded-full font-bold ${
                      payment.status === "paid"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {payment.status.toUpperCase()}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    )}
  </>
);
};

export default OwnerPayments;