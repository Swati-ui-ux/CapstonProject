import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosInstance'
import Loader from '../components/Loader'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSending(true)
      const res = await axiosInstance.post(
  "/users/forgot-password",
  { email }
);
toast.success(res.data.message)
setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
         {isSending?<Loader size={20} text="Sending..."color="#fff"/>:"Send Reset Link"}
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">
            {message}
          </p>
        )}
      </form>

    </div>
  )
}

export default ForgotPassword