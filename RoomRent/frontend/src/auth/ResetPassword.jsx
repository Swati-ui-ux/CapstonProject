import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { useSelector } from 'react-redux'
const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState('')
    const { token } = useParams()
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className={darkMode ? "text-2xl font-bold text-center mb-6 text-black" : "text-2xl font-bold text-center mb-6 text-blue-600"} >
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={resetPassword}
          onChange={(e) => setResetPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className={darkMode ? "w-full bg-black hover:bg-gray-900 text-white p-3 rounded-lg font-semibold transition" : "w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"}
        >
          Reset Password
        </button>

      </form>

    </div>
  )
}

export default ResetPassword