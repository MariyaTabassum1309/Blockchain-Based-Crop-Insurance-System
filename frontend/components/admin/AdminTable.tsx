"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminSettingsPage() {
  const [name, setName] = useState("Admin User");
  const [email] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Admin Settings ⚙️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Profile Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              Profile Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
                />
              </div>

              <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition shadow-md">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              Security
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition shadow-md">
                Update Password
              </button>
            </div>
          </div>

          {/* Blockchain Info Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-lg text-white md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">
              Blockchain Network Info 🌐
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="opacity-80">Network</p>
                <p className="font-semibold text-lg">Ethereum Sepolia</p>
              </div>

              <div>
                <p className="opacity-80">Explorer</p>
                <a
                  href="https://sepolia.etherscan.io"
                  target="_blank"
                  className="underline font-semibold"
                >
                  View on Etherscan
                </a>
              </div>

              <div>
                <p className="opacity-80">Environment</p>
                <p className="font-semibold text-lg">Test Network</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}