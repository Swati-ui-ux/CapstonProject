import axios from "axios"
import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { loginSuccess } from "../redux/authSlice"



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:9000/users/login",
      { email, password }
    );

    dispatch(
      loginSuccess({
        user: res.data.user,
        token: res.data.token,
      })
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    toast.success(res.data.message);

    navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 w-80 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          className="bg-black text-white w-full p-2"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default React.memo(Login);