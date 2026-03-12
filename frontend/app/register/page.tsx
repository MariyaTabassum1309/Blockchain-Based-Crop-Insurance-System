"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
    language: "english",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.mobile ||
        !formData.location ||
        !photo
      ) {
        setMessage("Please fill all fields and upload photo");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("photo", photo);

      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registered Successfully!");
        setTimeout(() => (window.location.href = "/login"), 1200);
      } else {
        setMessage(data.message || "Registration Failed");
      }

    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="relative min-h-screen">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/j.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Center Layout */}
      <div className="relative flex items-center justify-center min-h-screen px-4">

        {/* Enhanced Card */}
       <div
  className="relative rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] w-full max-w-2xl p-10 transition-all duration-500 hover:scale-[1.01] overflow-hidden"
  style={{
    backgroundImage: "url('/card-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

          {/* Heading */}
        
           <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-2">
 Join Crop Insurance
          </h2>
          <p className="text-center text-amber-50 mb-8 tracking-wide">
            Smart Farming • Secure Future
          </p>

          {/* Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-600 focus:outline-none transition duration-300"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-600 focus:outline-none transition duration-300"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-600 focus:outline-none transition duration-300"
            onChange={handleChange}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-600 focus:outline-none transition duration-300"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Village / District / State"
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-600 focus:outline-none transition duration-300"
            onChange={handleChange}
          />

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Farmer Photo
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) =>
                setPhoto(e.target.files ? e.target.files[0] : null)
              }
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/80"
            />
          </div>

          {/* Language */}
          <select
            name="language"
            className="w-full mb-6 p-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-600 focus:outline-none transition duration-300"
            onChange={handleChange}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi (हिंदी)</option>
            <option value="telugu">Telugu (తెలుగు)</option>
          </select>

          {/* Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-green-500/40 hover:scale-[1.02] transition duration-300"
          >
            Create Account
          </button>

          {/* Message */}
          {message && (
            <p className="text-center mt-4 font-semibold text-green-700">
              {message}
            </p>
          )}

          {/* Login */}
          <p className="text-center mt-6 text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Login Here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}