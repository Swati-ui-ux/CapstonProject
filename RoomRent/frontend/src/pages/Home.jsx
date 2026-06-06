import axios from "axios";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from "../redux/userSlice"

const Home = () => {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch()
  const token = localStorage.getItem("token");
 const user = useSelector((state) => state.user.user);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-semibold text-blue-600">
          Loading profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 text-center">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Welcome to Room Rent App 🏠
        </h1>

        {user ? (
          <div className="space-y-4 text-left">

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Name</p>
              <p className="text-lg font-bold text-blue-700">
                {user.name}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Role</p>
              <p className="text-lg font-bold text-green-700">
                {user.role}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-lg font-bold text-purple-700 break-all">
                {user.email}
              </p>
            </div>

          </div>
        ) : (
          <p className="text-red-500 font-semibold">
            User not found
          </p>
        )}

      </div>
    </div>
  );
};

export default Home;