import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center">

        {/* Profile Image */}
        <img
          src={
            user?.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={user?.name}
          className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover shadow-md"
        />

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Welcome 👋
        </h1>

        <h2 className="text-2xl font-semibold text-blue-600 mt-2">
          {user?.name}
        </h2>

        <p className="text-gray-500 capitalize mt-1">
          {user?.role}
        </p>

        {/* Status Badge */}
        <div className="mt-4">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Active User
          </span>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

          <div className="bg-blue-50 p-5 rounded-xl">
            <p className="text-gray-500 text-sm">
              Email
            </p>
            <h3 className="font-semibold break-all">
              {user?.email}
            </h3>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl">
            <p className="text-gray-500 text-sm">
              Phone
            </p>
            <h3 className="font-semibold">
              {user?.phone}
            </h3>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-500">
            Property & Tenant Management Dashboard
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;