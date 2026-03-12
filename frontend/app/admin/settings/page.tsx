"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPolicies, setTotalPolicies] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setAdmin(user);
    setName(user.name);

    // Fetch platform stats
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.length));

    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setTotalPolicies(data.length));
  }, []);

  const handleUpdateProfile = async () => {
    if (!admin) return;

    const res = await fetch(
      `http://localhost:5000/api/users/${admin._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      }
    );

    if (res.ok) {
      alert("Profile updated successfully");
      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated));
    } else {
      alert("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleClearPolicies = async () => {
    if (!confirm("Are you sure you want to delete ALL policies?")) return;

    await fetch("http://localhost:5000/api/policies/clear-all", {
      method: "DELETE",
    });

    alert("All policies cleared!");
    window.location.reload();
  };

  if (!admin) return null;

  return (
    <div
      className={`min-h-screen p-10 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8">
        Admin Settings ⚙️
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Profile Settings
          </h3>

          <label className="block text-sm mb-2">Email</label>
          <input
            type="text"
            value={admin.email}
            disabled
            className="w-full px-4 py-2 mb-4 rounded-lg border bg-gray-100"
          />

          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border"
          />

          <label className="block text-sm mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border"
          />

          <button
            onClick={handleUpdateProfile}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Profile
          </button>
        </div>

        {/* Platform Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Platform Overview
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>Total Users</p>
              <p className="text-2xl font-bold text-green-600">
                {totalUsers}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p>Total Policies</p>
              <p className="text-2xl font-bold text-indigo-600">
                {totalPolicies}
              </p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Preferences
          </h3>

          <div className="flex items-center justify-between mb-4">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() =>
                setEmailNotifications(!emailNotifications)
              }
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-red-600 mb-4">
            Danger Zone 🚨
          </h3>

          <button
            onClick={handleClearPolicies}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete All Policies
          </button>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}