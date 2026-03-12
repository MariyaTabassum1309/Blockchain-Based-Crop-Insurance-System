"use client";

import { useEffect, useState } from "react";

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/claims");
      const data = await res.json();
      setClaims(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

const updateStatus = async (id: string, action: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/${action}/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("✅ Claim Approved Successfully!\n📲 Please ask user to check SMS.");

      fetchClaims(); // Refresh list after popup
    } else {
      alert("❌ Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("🚨 Server Error");
  }
};

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Pending Diseased Claims</h1>

      {claims.length === 0 ? (
        <p>No pending claims</p>
      ) : (
        <div className="grid gap-6">
          {claims.map((claim) => (
            <div
              key={claim._id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">

                {/* IMAGE */}
                <img
                  src={`http://localhost:5000/${claim.imageUrl}`}
                  alt="Claim"
                  className="rounded-lg w-full h-64 object-cover"
                />

                {/* DETAILS */}
                <div>
                  <p><strong>User:</strong> {claim.userId?.name}</p>
                  <p><strong>Email:</strong> {claim.userId?.email}</p>
<p><strong>Prediction:</strong> {claim.predictedDisease}</p>
<p><strong>Confidence:</strong> {claim.confidence?.toFixed(2)}%</p>
                  <p><strong>Status:</strong> {claim.status}</p>

                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() =>
                        updateStatus(claim._id, "approve-claim")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(claim._id, "reject-claim")
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}