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
        <label> Choose image</label>
           <input
          className="w-full border p-2 mb-3"
          
          type="file"
          name="image"
          // value={formData.image}
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
          {isLoading? (
    <Loader text="Creating Account..." />
  ) : (
    "Create Account"
  )}
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
     
</>
  );
}