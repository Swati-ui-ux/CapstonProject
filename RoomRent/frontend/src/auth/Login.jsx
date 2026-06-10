import axios from "axios"
import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { loginSuccess } from "../redux/authSlice"
import axiosInstance from "../utils/axiosInstance"



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axiosInstance.post(
      "/users/login",
      { email, password }
    );

    dispatch(
      loginSuccess({
        user: res.data.user,
        token: res.data.token,
      })
    );

    localStorage.setItem(
      "email",
      res.data.email
    );
    localStorage.setItem(
      "token",
      res.data.token
    );
    toast.success(res.data.message);

    navigate("/");
  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.message
    );
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="min-h-screen  flex items-center justify-center px-4">

    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Login to your Room Rent account
        </p>
      </div>

      <form onSubmit={handleLogin}>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
        </div>
        <Link
  to="/forgot-password"
  className="text-center block mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
>
  Forgot Password?
</Link>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <div className="text-center mt-6">

        <p className="text-gray-600">
          Don't have an account?
        </p>

        <Link
          to="/signup"
          className="text-blue-600 font-bold hover:text-blue-800"
        >
          Create Account
        </Link>

      </div>

    </div>

  </div>
);
}

export default React.memo(Login);