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
   <div
  className={`min-h-screen flex items-center justify-center px-4 py-10 transition-all duration-500
  ${
    darkMode
      ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
      : "bg-linear-to-br from-blue-100 via-white to-indigo-100"
  }`}
>
  <form
    onSubmit={handleSignup}
    className={`w-full max-w-md rounded-3xl border backdrop-blur-xl p-8 shadow-2xl transition-all duration-500
${
darkMode
? "bg-slate-900/80 border-slate-700 shadow-black/40"
: "bg-white/90 border-white shadow-blue-200"
}`}
  >
    <h2
className={`text-4xl font-extrabold text-center mb-2
${darkMode?"text-white":"text-slate-800"}
`}
>
Create Account
</h2>

<p
className={`text-center mb-8
${darkMode?"text-slate-400":"text-gray-500"}
`}
>
Join RoomRent and start managing properties.
</p>

    <input
      className={`w-full m-2 px-4 py-3 rounded-xl border transition-all duration-300
focus:outline-none focus:ring-2
${
darkMode
? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500"
: "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-blue-500"
}
`} 
      placeholder="Full Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
     className={`w-full m-2 px-4 py-3 rounded-xl border transition-all duration-300
focus:outline-none focus:ring-2
${
darkMode
? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500"
: "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-blue-500"
}
`}
      placeholder="Phone Number"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />

    <input
      className={`w-full m-2 px-4 py-3 rounded-xl border transition-all duration-300
focus:outline-none focus:ring-2
${
darkMode
? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500"
: "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-blue-500"
}
`}
      placeholder="Email Address"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <input
      className={`w-full m-2 px-4 py-3 rounded-xl border transition-all duration-300
focus:outline-none focus:ring-2
${
darkMode
? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500"
: "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-blue-500"
}
`}
      placeholder="Password"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <label className={`block mb-2 font-semibold ${
darkMode?"text-slate-300":"text-gray-700"
}`}>
      Profile Image
    </label>

    <input
      className={`w-full rounded-xl border px-4 py-3 mt-4 ml-2 cursor-pointer
file:mr-4
file:px-4
file:py-2
file:border-0
file:rounded-lg
file:font-semibold
transition-all
${
darkMode
? "bg-slate-800 border-slate-700 text-white file:bg-blue-600 file:text-white"
: "bg-gray-50 border-gray-200 file:bg-blue-600 file:text-white"
}
`}
      type="file"
      name="image"
      onChange={handleChange}
      required
    />

    <select
      className={`w-full m-2 px-4 py-3 rounded-xl border transition-all
focus:outline-none focus:ring-2
${
darkMode
? "bg-slate-800 border-slate-700 text-white focus:ring-blue-500"
: "bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-500"
}
`}
      name="role"
      value={formData.role}
      onChange={handleChange}
    >
      <option value="owner">Owner</option>
      <option value="tenant">Tenant</option>
    </select>

    <button
      type="submit"
      className={`w-full mt-3 py-3 rounded-xl font-bold text-lg transition-all duration-300
hover:scale-[1.02]
active:scale-95
shadow-lg
${
darkMode
? "bg-linear-to-r ml-2 from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white"
: "bg-linear-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white"
}
`}
    >
      {isLoading ? (
        <Loader text="Creating..." />
      ) : (
        "Create Account"
      )}
    </button>

    <p
className={`text-center mt-6
${darkMode?"text-slate-400":"text-gray-600"}
`}
>
Already have an account?{" "}
<Link
to="/login"
className={`font-bold transition-colors
${
darkMode
?"text-blue-400 hover:text-blue-300"
:"text-blue-600 hover:text-blue-700"
}`}
>
Login
</Link>
</p>
  </form>
</div>
     
</>
  );
}