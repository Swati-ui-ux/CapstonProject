import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"

 function VerifyOtp() {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const email =
    localStorage.getItem("email");

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(
          "/users/verify-otp",
          {
            email,
            otp,
          }
        );

      localStorage.setItem("token", response.data.token  );

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    "
    >
      <div
        className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-full
        max-w-md
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-3
        "
        >
          Verify OTP
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-6
        "
        >
          OTP has been sent to
          <br />
          <span className="font-semibold">
            {email}
          </span>
        </p>

        <form
          onSubmit={handleVerify}
          className="space-y-5"
        >
          <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
            placeholder="Enter 6 Digit OTP"
            className="w-full border rounded-lg px-4
              py-3
              text-center
              text-xl
              tracking-widest
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>

        <div
          className="
          text-center
          mt-5
        "
        >
          <button
            className="
            text-blue-600
            hover:underline
          "
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;