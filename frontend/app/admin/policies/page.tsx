"use client";

import { useEffect, useState } from "react";

export default function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredPolicies = policies.filter((policy) =>
    policy.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    policy.cropType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Policies 📄
      </h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by user or crop type..."
          className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Crop</th>
              <th className="p-4">Coverage</th>
              <th className="p-4">Premium</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredPolicies.map((policy) => (
              <tr key={policy._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">
                  {policy.userId?.name}
                  <div className="text-sm text-gray-500">
                    {policy.userId?.email}
                  </div>
                </td>

                <td className="p-4">{policy.cropType}</td>
                <td className="p-4">₹{policy.coverage}</td>
                <td className="p-4 text-indigo-600 font-semibold">
                  ₹{policy.premiumAmount}
                </td>
                <td className="p-4">{policy.duration} days</td>

                <td className="p-4">
                 <span
  className={`px-3 py-1 rounded-full text-sm font-semibold ${
    policy.claimStatus === "Approved"
      ? "bg-green-100 text-green-700"
      : policy.claimStatus === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : policy.claimStatus === "Rejected"
      ? "bg-red-100 text-red-700"
      : policy.status === "Active"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {policy.claimStatus
    ? `Claim ${policy.claimStatus}`
    : policy.status}
</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPolicies.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No policies found.
          </div>
        )}
      </div>
    </div>
  );
}