import axios from "axios"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { loginSuccess } from "../redux/authSlice"
import axiosInstance from "../utils/axiosInstance"



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch()
const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
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

    navigate("/home");
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
 <div
  className={`min-h-screen flex items-center justify-center px-4 py-10 transition-all duration-500 ${
    darkMode
      ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
      : "bg-linear-to-br from-blue-100 via-white to-indigo-200"
  }`}
>

    <div
  className={`w-full max-w-md rounded-3xl p-8 border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
    darkMode
      ? "bg-slate-900/80 border-slate-700 text-white"
      : "bg-white/80 border-white/40 text-gray-800"
  }`}
>

      <div className="text-center mb-8">
          <h1
            className={`text-4xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-800"
              }`}
          >
            
          Welcome Back 👋
        </h1>

        <p
            className={`mt-2 ${
              darkMode ? "text-slate-300" : "text-gray-500"
              }`}
          >
            
          Login to your Room Rent account
        </p>
      </div>

      <form onSubmit={handleLogin}>

        <div className="mb-4">
          <label className={`block font-medium mb-2 ${
              darkMode ? "text-slate-200" : "text-gray-700"
              }`}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none ${
            darkMode
              ? "bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400"
              : "bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400"
}`}
          />
        </div>

       <div className="mb-6">
  <label className="block text-gray-700 font-medium mb-2">
    Password
  </label>

  <div className="relative">
    <input
      type={isShowPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className={`w-full rounded-xl px-4 py-3 pr-12 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none ${
      darkMode
        ? "bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400"
        : "bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400"
    }`}
    />

    <button
      type="button"
      onClick={() =>
        setIsShowPassword(!isShowPassword)
      }
      className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg ${
      darkMode
        ? "text-slate-300 hover:text-white"
        : "text-gray-500 hover:text-blue-600"
    }`}
    >
      {isShowPassword ? "🙈" : "👁️"}
    </button>
  </div>
</div>
        <Link
  to="/forgot-password"
 className={`text-center block mt-2 text-sm transition ${
  darkMode
    ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-800"
}`}
>
  Forgot Password?
</Link>
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-95 ${
        darkMode
          ? "bg-linear-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800"
          : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <div className="text-center mt-6">

        <p
        className={`${
          darkMode ? "text-slate-300" : "text-gray-600"
        }`}
      >
          Don't have an account?
        </p>

        <Link
          to="/signup"
          className={`font-bold transition ${
          darkMode
            ? "text-cyan-400 hover:text-cyan-300"
            : "text-blue-600 hover:text-indigo-700"
        }`}
        >
          Create Account
        </Link>

      </div>

    </div>

  </div>
);
}

export default React.memo(Login);