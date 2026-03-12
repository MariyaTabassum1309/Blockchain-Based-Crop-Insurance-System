"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // 🚨 Protect Admin Page
    if (parsedUser.role !== "admin") {
      alert("Access Denied! Admins only.");
      window.location.href = "/dashboard";
      return;
    }

    setUser(parsedUser);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Users
          </h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            120
          </p>
        </div>

        {/* Total Policies */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Policies
          </h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            45
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Revenue
          </h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            ₹5,20,000
          </p>
        </div>

      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {user.name}
        </h2>

        <p className="text-gray-600">
          You are logged in as <strong>Admin</strong>.
        </p>
      </div>

    </div>
  );
}