import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader"
import axiosInstance from "../utils/axiosInstance"
import { toast } from "react-toastify";
import { useSelector } from "react-redux"
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image:null,
    role: "tenant",
  });
  const [isLoading, setIsLoading] = useState(false)
  const darkMode = useSelector(
    (state) => state.theme.darkMode
  );
  
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

  if (type === "file") {
    setFormData((prev) => ({
      ...prev,
      image: files[0],
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  };
 const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("image", formData.image);
setIsLoading(true)
    const res = await axiosInstance.post(
      "/users/signup",
      data,
    );
console.log('data',res)
   setIsLoading(false)
    alert(res.data.message);
   navigate("/login")
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      image: null,
      role: "tenant",
    });

    // setPreview("");
  } catch (error) {
    error.response && toast.error(error.response.data.message);
    console.log(error);
    setIsLoading(false)
  }
};
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-300">
  <form
    onSubmit={handleSignup}
    className="bg-white p-6 w-96 rounded-2xl shadow-xl border border-gray-100"
  >
    <h2 className={darkMode ? "text-2xl font-bold text-center text-black mb-1" : "text-2xl font-bold text-center text-blue-600 mb-1"}>
      Create Account
    </h2>

    <p className={darkMode ? "text-center text-gray-500 text-sm mb-5" : "text-center text-gray-500 text-sm mb-5"}>
      Join Room Rent App
    </p>

    <input
      className={darkMode ? "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder:text-gray-300" : "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"} 
      placeholder="Full Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      className={darkMode ? "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder:text-gray-300" : "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"}
      placeholder="Phone Number"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />

    <input
      className={darkMode ? "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder:text-gray-300" : "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"}
      placeholder="Email Address"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <input
      className={darkMode ? "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder:text-gray-300" : "w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"}
      placeholder="Password"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <label className="text-sm font-medium text-gray-600">
      Profile Image
    </label>

    <input
      className={darkMode ? "w-full border border-gray-300 p-2.5 mb-3 rounded-lg mt-1 bg-gray-700 text-white" : "w-full border border-gray-300 p-2.5 mb-3 rounded-lg mt-1"}
      type="file"
      name="image"
      onChange={handleChange}
      required
    />

    <select
      className={darkMode ? "w-full border border-gray-300 p-2.5 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white" : "w-full border border-gray-300 p-2.5 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"}
      name="role"
      value={formData.role}
      onChange={handleChange}
    >
      <option value="owner">Owner</option>
      <option value="tenant">Tenant</option>
    </select>

    <button
      type="submit"
      className={darkMode ? "w-full bg-black hover:bg-gray-900 cursor-alias text-white py-2.5 rounded-lg font-semibold transition" : "w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"}
    >
      {isLoading ? (
        <Loader text="Creating..." />
      ) : (
        "Create Account"
      )}
    </button>

    <p className={darkMode ? "text-sm text-center mt-4 text-gray-400" : "text-sm text-center mt-4 text-gray-600"}>
      Already have an account?{" "}
      <Link
        to="/login"
       className={darkMode ? "text-blue-400 font-bold hover:text-blue-300" : "text-blue-600 font-bold hover:text-blue-800"}
      >
        Login
      </Link>
    </p>
  </form>
</div>
     
</>
  );
}