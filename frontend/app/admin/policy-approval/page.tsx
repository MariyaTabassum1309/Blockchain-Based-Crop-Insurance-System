"use client";

import { useEffect, useState } from "react";

export default function PolicyApprovalPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("All");

  // ================= FETCH ALL POLICIES =================
  const fetchPolicies = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/all-policies"
      );
      const data = await res.json();
      setPolicies(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // ================= APPROVE =================
  const approvePolicy = async (id: string) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/approve-policy/${id}`,
      { method: "PUT" }
    );

    if (res.ok) {
      setMessage("✅ Policy Approved & Activated");
      fetchPolicies();
    }
  };

  // ================= REJECT =================
  const rejectPolicy = async (id: string) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/reject-policy/${id}`,
      { method: "PUT" }
    );

    if (res.ok) {
      setMessage("❌ Policy Rejected");
      fetchPolicies();
    }
  };

  // ================= FILTER =================
  const filteredPolicies =
    filter === "All"
      ? policies
      : policies.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-green-50 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-green-800 mb-6">
          📝 Policy Verification & History
        </h1>

        {message && (
          <p className="mb-6 font-semibold text-green-700">
            {message}
          </p>
        )}

        {/* FILTER DROPDOWN */}
        <div className="mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="All">All Policies</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filteredPolicies.length === 0 && (
          <p className="text-gray-600">No policies found.</p>
        )}

        {filteredPolicies.map((policy) => (
          <div
            key={policy._id}
            className="border p-6 rounded-2xl mb-6 shadow-md bg-gray-50"
          >
            <h2 className="text-xl font-bold text-green-700 mb-4">
              {policy.cropType} - ₹{policy.coverage}
            </h2>

            {/* FARMER DETAILS */}
            <p><strong>Farmer:</strong> {policy.userId?.name}</p>
            <p><strong>Email:</strong> {policy.userId?.email}</p>
            <p><strong>Mobile:</strong> {policy.userId?.mobile}</p>

            <p><strong>Survey No:</strong> {policy.surveyNumber}</p>
            <p><strong>Village:</strong> {policy.village}</p>
            <p><strong>District:</strong> {policy.district}</p>
            <p><strong>State:</strong> {policy.state}</p>
            <p><strong>Acres:</strong> {policy.acres}</p>

            <p>
              <strong>Created On:</strong>{" "}
              {new Date(policy.createdAt).toLocaleDateString()}
            </p>

            {/* STATUS BADGE */}
            <div className="mt-4">
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold ${
                  policy.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : policy.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {policy.status}
              </span>
            </div>

            {/* FARMER PHOTO */}
            {policy.userId?.photo && (
              <div className="mt-4">
                <p className="font-semibold">Farmer Photo:</p>
                <img
                  src={`http://localhost:5000/${policy.userId.photo}`}
                  alt="Farmer"
                  className="w-40 rounded-lg border mt-2"
                />
              </div>
            )}

            {/* LAND DOCUMENT */}
            {policy.landDocument && (
              <div className="mt-4">
                <p className="font-semibold">Land Document:</p>
                <a
                  href={`http://localhost:5000/${policy.landDocument}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Document
                </a>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex gap-4">

              {policy.status === "Pending" ? (
                <>
                  <button
                    onClick={() => approvePolicy(policy._id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectPolicy(policy._id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-gray-500 font-semibold">
                  No Action Needed
                </span>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}