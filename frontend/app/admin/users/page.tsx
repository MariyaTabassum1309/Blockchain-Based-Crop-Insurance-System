"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBlock = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";

    await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId ? { ...u, status: newStatus } : u
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Manage Users 👥
      </h2>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === "Blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.status || "Active"}
                  </span>
                </td>

           <td className="p-4">
  {user.role !== "admin" ? (
    <button
      onClick={() =>
        toggleBlock(user._id, user.status || "Active")
      }
      className={`px-4 py-2 rounded-lg text-white text-sm ${
        user.status === "Blocked"
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {user.status === "Blocked" ? "Unblock" : "Block"}
    </button>
  ) : (
    <span className="text-gray-400 text-sm">
      Protected
    </span>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}