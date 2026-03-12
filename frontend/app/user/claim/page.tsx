"use client";

import { useState, useEffect } from "react";

export default function ClaimPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);

  // ================= FETCH ELIGIBLE POLICIES =================
  const fetchPolicies = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id) return;

    const res = await fetch(
      `http://localhost:5000/api/policies/by-user/${user._id}`
    );

    const data = await res.json();

    // 🔥 Only allow policies that can still claim
const eligiblePolicies = data.filter(
  (p: any) => p.status === "Active"
);

    setPolicies(eligiblePolicies);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // ================= SUBMIT CLAIM =================
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!selectedPolicy || !image) {
      setMessage("Please select policy and upload image");
      return;
    }

    const formData = new FormData();
    formData.append("policyId", selectedPolicy);
    formData.append("userId", user._id);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/claims", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Claim Sent to Admin for Approval");

        setResult({
          prediction: data.prediction,
          confidence: data.confidence,
          status: data.status,
        });

        // 🔥 Reset selection & refresh policies
        setSelectedPolicy("");
        setImage(null);
        fetchPolicies();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-2xl font-bold text-green-700 mb-6">
          🌾 Submit Crop Claim
        </h1>

        {/* POLICY DROPDOWN */}
        <select
          className="w-full p-3 border rounded-xl mb-6"
          value={selectedPolicy}
          onChange={(e) => setSelectedPolicy(e.target.value)}
        >
          <option value="">Select Eligible Policy</option>
          {policies.map((policy) => (
            <option key={policy._id} value={policy._id}>
              {policy.cropType} - ₹{policy.coverage}
            </option>
          ))}
        </select>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="mb-6"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
        />

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
        >
          Submit Claim
        </button>

        {/* AI RESULT DISPLAY */}
        {result && (
          <div className="mt-8 p-6 rounded-2xl shadow-lg bg-green-100 border border-green-300">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              🌿 AI Detection Result
            </h3>

            <p className="text-lg">
              <strong>Disease:</strong> {result.prediction}
            </p>

            <p className="text-lg">
              <strong>Confidence:</strong> {result.confidence}%
            </p>

            <p className="text-lg font-bold text-yellow-700">
              Claim Status: {result.status}
            </p>
          </div>
        )}

        {/* MESSAGE */}
        {message && (
          <p className="mt-6 text-center font-semibold text-green-700">
            {message}
          </p>
        )}

        {/* IF NO ELIGIBLE POLICIES */}
        {policies.length === 0 && (
          <p className="mt-6 text-center text-red-600 font-semibold">
            No eligible policies available for claim.
          </p>
        )}

      </div>
    </div>
  );
}