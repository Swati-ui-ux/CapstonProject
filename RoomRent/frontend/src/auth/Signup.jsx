import axios from "axios"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async(e) => {
    e.preventDefault();
  try {
     console.log("User Data:", formData);
      const res = await axios.post("http://localhost:9000/users/signup",formData)
      console.log(res)
    alert("Signup Form Submitted");

    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "tenant",
    });
  } catch (error) {
    console.log("from sign up",error)
  }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 w-80 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">
          Signup
        </h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          className="w-full border p-2 mb-3"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="owner">Owner</option>
          <option value="tenant">Tenant</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white w-full p-2 mb-3"
        >
          Create Account
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}