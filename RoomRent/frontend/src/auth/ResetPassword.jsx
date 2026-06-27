import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { useSelector } from 'react-redux'
const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState('')
  const { token } = useParams()
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  const handleSubmit = async(e) => {
      e.preventDefault()
     try {
     const res =  await axiosInstance.post(
  `/users/reset-password/${token}`,
  {
    password: resetPassword,
  }
);
         navigate("/login")
         console.log(res)
     } catch (error) {
        console.log("Error",error)
     }
    // console.log(resetPassword)
  }
 
  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 transition-all duration-500 ${
        darkMode
          ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-linear-to-br from-blue-100 via-white to-indigo-200"
      }`}
    >
      
      <form 
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? "bg-slate-900/80 border-slate-700 text-white"
          : "bg-white/80 border-white/40 text-gray-800"
      }`}
      >
        <h2 className={`text-3xl font-extrabold text-center mb-2 ${
        darkMode
          ? "text-white"
          : "text-blue-700"
      }`} >
          Reset Password
        </h2>
          <p
        className={`text-center mb-6 ${
          darkMode
            ? "text-slate-300"
            : "text-gray-500"
        }`}
      >
        Create a strong new password for your account.
      </p>
      <div className="relative mb-5">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter new password"
    value={resetPassword}
    onChange={(e) => setResetPassword(e.target.value)}
    className={`w-full rounded-xl px-4 py-3 pr-12 border outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
      darkMode
        ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
        : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-400"
    }`}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
      darkMode
        ? "text-slate-300 hover:text-white"
        : "text-gray-500 hover:text-blue-600"
    }`}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>
        <button
          type="submit"
          className={darkMode ? "w-full bg-black hover:bg-gray-800 hover:border shadow-2xl text-white p-3 rounded-lg font-semibold transition" : "w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"}
        >
          Reset Password
        </button>

      </form>

    </div>
  )
}

export default ResetPassword