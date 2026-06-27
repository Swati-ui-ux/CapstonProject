import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosInstance'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSending(true)
      const res = await axiosInstance.post(
  "/users/forgot-password",
  { email }
      );
      console.log(res)
toast.success(res.data.message)
setMessage(res.data.message);
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsSending(false)
    }
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
        }`}>
          Forgot Password
        </h2>
        <p
          className={`text-center mb-6 ${
            darkMode
              ? "text-slate-300"
              : "text-gray-500"
          }`}
        >
          Enter your registered email to receive a password reset link.
        </p>
        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded-xl px-4 py-3 border outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-400"
        }`}
        />

        <button
          type="submit"
          className={`w-full mt-4 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
          darkMode
            ? "bg-linear-to-r from-slate-600 to-slate-800 hover:from-slate-600 hover:to-slate-800"
            : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        }`}
        >
         {isSending?<Loader size={20} text="Sending..."color="#fff"/>:"Send Reset Link"}
        </button>

        {message && (
         <p
          className={`text-center mt-5 text-sm font-medium ${
            message.toLowerCase().includes("wrong") ||
            message.toLowerCase().includes("invalid")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
            {message}
          </p>
        )}
      </form>

    </div>
  )
}

export default ForgotPassword