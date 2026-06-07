import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader"

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
console.log("from sign up ")
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
    const res = await axios.post(
      "http://localhost:9000/users/signup",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    <h2 className="text-2xl font-bold text-center text-blue-600 mb-1">
      Create Account
    </h2>

    <p className="text-center text-gray-500 text-sm mb-5">
      Join Room Rent App
    </p>

    <input
      className="w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Full Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      className="w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Phone Number"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />

    <input
      className="w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Email Address"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <input
      className="w-full border border-gray-300 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
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
      className="w-full border border-gray-300 p-2.5 mb-3 rounded-lg mt-1"
      type="file"
      name="image"
      onChange={handleChange}
      required
    />

    <select
      className="w-full border border-gray-300 p-2.5 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      name="role"
      value={formData.role}
      onChange={handleChange}
    >
      <option value="owner">Owner</option>
      <option value="tenant">Tenant</option>
    </select>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
    >
      {isLoading ? (
        <Loader text="Creating..." />
      ) : (
        "Create Account"
      )}
    </button>

    <p className="text-sm text-center mt-4 text-gray-600">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-blue-600 font-semibold hover:underline"
      >
        Login
      </Link>
    </p>
  </form>
</div>
     
</>
  );
}