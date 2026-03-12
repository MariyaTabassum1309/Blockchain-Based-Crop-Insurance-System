"use client";

import { useEffect, useState } from "react";

export default function Policies() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ================= FETCH POLICIES =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetch(`http://localhost:5000/api/policies/by-user/${parsedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setPolicies(data);
        setFilteredPolicies(data);
      });
  }, []);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let updated = [...policies];

    if (search) {
      updated = updated.filter(policy =>
        policy.riskType.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      updated = updated.filter(policy => policy.status === statusFilter);
    }

    setFilteredPolicies(updated);
  }, [search, statusFilter, policies]);

  if (!user) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-6 py-7"
      style={{ backgroundImage: "url('/sok.jpg')" }}
    >
      <div className="max-w-7xl mx-auto bg-emerald-100 p-5 rounded-2xl shadow-xl">

   
 <div className="relative bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50 p-10 rounded-3xl shadow-2xl mb-12 overflow-hidden">

  {/* Decorative Blur Circle */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl"></div>

  {/* Heading */}
  <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent mb-6 tracking-wide transition-all duration-500 hover:scale-105">
    🌿 Smart Crop Protection Policy
  </h2>

  {/* Subtitle */}
  <p className="text-lg italic text-emerald-800 mb-6 opacity-90">
    Securing your harvest with transparency, technology, and trust.
  </p>

  {/* Main Text */}
<p className="font-serif text-emerald-900 text-lg leading-relaxed tracking-wide italic drop-shadow-sm">
    This crop insurance policy provides structured financial protection 
    against agricultural risks such as drought, flood, and excessive rainfall. 
    The premium is calculated based on the selected coverage amount and risk category. 
    In the event of verified weather disruption, compensation is processed securely 
    through blockchain-enabled validation to ensure fairness and speed.
  </p>

  {/* Highlight Box */}
  

</div>
        {/* SEARCH & FILTER */}
                 <h1 className="text-3xl font-bold text-emerald-800 mb-8">
          Your Policies
 </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
      
 <input
            type="text"
            placeholder="Search by Risk Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 p-3 rounded-xl w-full md:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* POLICY SUMMARY (YOUR ORIGINAL COLORS KEPT) */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl shadow-lg">
            <p className="text-1xl font-bold text-gray-700">
              Total Policies
            </p>
            <h2 className="text-2xl font-bold text-green-800 mt-2">
              {filteredPolicies.length}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-cyan-200 p-6 rounded-2xl shadow-lg">
            <p className="text-1xl font-bold text-gray-700">
              Active Policies
            </p>
            <h2 className="text-2xl font-bold text-blue-800 mt-2">
              {filteredPolicies.filter(p => p.status === "Active").length}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-emerald-300 p-6 rounded-2xl shadow-lg">
            <p className="text-1xl font-bold text-gray-700">
              Total Coverage
            </p>
            <h2 className="text-2xl font-bold text-cyan-900 mt-2">
              ₹{filteredPolicies.reduce((sum, p) => sum + Number(p.coverage || 0), 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-emerald-200 to-emerald-100 p-6 rounded-2xl shadow-lg">
            <p className="text-1xl font-bold text-gray-700">
              Total Premium Paid
            </p>
            <h2 className="text-2xl font-bold text-cyan-600 mt-2">
              ₹{filteredPolicies.reduce((sum, p) => sum + Number(p.premiumAmount || 0), 0).toLocaleString()}
            </h2>
          </div>

        </div>

        {/* TABLE */}
        {filteredPolicies.length === 0 ? (
          <p className="text-slate-500">No matching policies found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full text-left border-collapse">

              <thead className="bg-green-700 text-white text-lg uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Coverage</th>
                  <th className="px-6 font-bold">Crop</th>
                  <th className="px-6 font-bold">Risk</th>
                  <th className="px-6 font-bold">Premium</th>
                  <th className="px-6 font-bold">Duration</th>
                  <th className="px-6 font-bold">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white text-gray-800 text-base font-medium">
                {filteredPolicies.map((policy, index) => (
                  <tr
                    key={policy._id}
                    className={`border-b transition hover:bg-green-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-green-50/40"
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-green-700">
                      ₹{policy.coverage}
                    </td>

                    <td className="px-6 font-semibold">
                      {policy.cropType}
                    </td>

                    <td className="px-6 capitalize">
                      {policy.riskType}
                    </td>

                    <td className="px-6 font-semibold text-emerald-700">
                      ₹{policy.premiumAmount}
                    </td>

                    <td className="px-6">
                      {policy.duration} days
                    </td>

                    <td className="px-6">
                     <span
  className={`px-4 py-1 rounded-full text-sm font-bold ${
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
          </div>
        )}

      </div>
    </div>
  );
}