"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Login Successful!");

      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/dashboard";
      }

    } else {
      setMessage(data.message || "Invalid Email or Password");
    }

  } catch (error) {
    console.error(error);
    setMessage("Server Error");
  }
};
return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/j.jpg')" }}
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-green-700/50 backdrop-blur-sm" />

    {/* Card */}
    <div className="relative bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-[420px] border border-green-200">

      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-2 text-center text-green-800">
        🌱Crop Insurance
      

      </h2>

      
<br></br>
      {/* Email */}
      <div className="relative mb-6">
        <span className="absolute left-3 top-3 text-green-600 text-lg"></span>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="w-full pl-10 p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="relative mb-8">
        <span className="absolute left-3 top-3 text-green-600 text-lg"></span>
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          className="w-full pl-10 p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
          onChange={handleChange}
        />
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
      >
       Login Securely
      </button>

      {message && (
        <p className="text-center mt-4 font-semibold text-green-700 animate-pulse">
          {message}
        </p>
      )}

      <p className="text-center mt-6 text-1xl text-gray-700 font-bold">
         New Farmer?{" "}
        <Link href="/register" className="text-green-700 hover:underline font-bold">
          Register Here
        </Link>
      </p>

    </div>
  </div>
);
}
