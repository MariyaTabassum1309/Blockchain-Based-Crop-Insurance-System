"use client";

import { useEffect, useState } from "react";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Dashboard() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
const [claims, setClaims] = useState<any[]>([]);
const getDaysRemainingNumber = (endDate: string) => {
  if (!endDate) return 0;
  const today = new Date();
  const expiry = new Date(endDate);
  const diff = expiry.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getProgressPercentage = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const today = new Date().getTime();

  const total = end - start;
  const used = today - start;

  if (used <= 0) return 0;
  if (used >= total) return 100;

  return Math.floor((used / total) * 100);
};
  useEffect(() => {
    const fetchPolicies = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const res = await fetch(
  `http://localhost:5000/api/policies/by-user/${parsedUser._id}`
);

const data = await res.json();
setPolicies(data);

// 🔔 Expiry Alert Logic
// 🔔 Expiry Alert Logic (Only Show Once)
data.forEach((policy: any) => {
  if (policy.endDate) {
    const today = new Date();
    const expiry = new Date(policy.endDate);
    const diff = expiry.getTime() - today.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    const alertKey = `expiry_alert_${policy._id}`;

    if (
      daysLeft > 0 &&
      daysLeft <= 5 &&
      !localStorage.getItem(alertKey)
    ) {
      alert(
        `⚠ Your policy for ${policy.cropType} expires in ${daysLeft} days!`
      );

      localStorage.setItem(alertKey, "shown");
    }
  }
});
       const claimRes = await fetch(
      `http://localhost:5000/api/claims/user/${parsedUser._id}`
    );
    const claimData = await claimRes.json();
    setClaims(claimData);
    };

    fetchPolicies();
    window.addEventListener("focus", fetchPolicies);
    return () => window.removeEventListener("focus", fetchPolicies);
  }, []);

  if (!user) return null;

  const totalPremium = policies.reduce(
    (sum, p) => sum + Number(p.premiumAmount || 0),
    0
  );

  const activePolicies = policies.filter(
    (p) => p.status === "Active"
  ).length;
const calculateDaysRemaining = (endDate: string) => {
  if (!endDate) return null;

  const today = new Date();
  const expiry = new Date(endDate);
  const diff = expiry.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return "Expired";
  }

  if (days <= 10) {
    return `⚠ Only ${days} days left`;
  }

  return `${days} days left`;
};

  return (
  
    
   <div className="min-h-screen bg-green-100 pt-0.5">
      {/* ===== MARQUEE ===== */}

      <div className="max-w-7xl mx-auto px-6 mt-1">
<div className="bg-green-100 border-l-4 border-green-600 p-12 rounded-2xl mt-2 shadow-md">
 <p className="text-xl italic text-green-900 leading-relaxed">
  <span className="text-6xl font-extrabold text-green-900 float-left mr-3 relative -top-2">
    F
  </span>
  armers are the silent architects of our nation’s nourishment and strength.
  With unwavering determination, they transform seeds into sustenance and
  barren fields into abundance.
</p>
  <p className="mt-3 text-green-700 font-semibold">
  
  </p>
</div>
<br>
</br>
        {/* ===== HERO IMAGE ===== */}
        <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-10 shadow-xl">
          <img
            src="/oh.jpg"
            alt="Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <h2 className="ml-10 text-green-200 text-4xl font-bold drop-shadow-lg">
              Protect.<br></br><br></br>
              Insure.<br></br><br></br>
              Prosper.
            </h2>
          </div>
        </div>

        {/* ===== WELCOME ===== */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-slate-500 mt-2">
            Here’s an overview of your insurance activity.
          </p>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => window.location.href="/user/create-policy"}
            className="bg-green-600 text-white p-6 rounded-2xl shadow-lg hover:bg-green-700 transition"
          >
            🌾 Create Policy
          </button>

          <button
            onClick={() => window.location.href="/user/policies"}
            className="bg-green-600 text-white p-6 rounded-2xl shadow-lg hover:bg-green-700 transition"
          >
            📄 View Policies
          </button>

          <button
            onClick={() => window.location.href="/user/claim"}
            className="bg-green-600 text-white p-6 rounded-2xl shadow-lg hover:bg-green-700 transition"
          >
            🚨 Raise Claim
          </button>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-500">Total Policies</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {policies.length}
            </h2>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-500">Total Premium Paid</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              ₹{totalPremium.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-500">Active Policies</p>
            <h2 className="text-3xl font-bold text-purple-600 mt-2">
              {activePolicies}
            </h2>
          </div>
        </div>

        {/* ===== WEATHER ===== */}
        <div className="mb-12">
          <WeatherDashboard />
        </div>

        {/* ===== RECENT POLICIES ===== */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
          <h2 className="text-xl font-semibold mb-6">
            Recent Policies
          </h2>

          {policies.length === 0 ? (
            <p>No policies found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-sm uppercase">
                  <tr>
                    <th className="py-3 px-4">Coverage</th>
                    <th className="px-4">Crop</th>
                    <th className="px-4">Risk</th>
                    <th className="px-4">Premium</th>
                    <th className="px-4">Duration</th>
                    <th className="px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy) => (
                    <tr key={policy._id} className="border-b">
                      <td className="py-3 px-4">₹{policy.coverage}</td>
                      <td className="px-4">{policy.cropType}</td>
                      <td className="px-4">{policy.riskType}</td>
                      <td className="px-4">₹{policy.premiumAmount}</td>
           <td className="px-4">
  {policy.duration} days

  {policy.endDate && (
    <>
      {/* Days Remaining Text */}
      <div className={`text-sm mt-1 ${
        getDaysRemainingNumber(policy.endDate) <= 5
          ? "text-red-600 font-semibold"
          : getDaysRemainingNumber(policy.endDate) <= 10
          ? "text-yellow-600 font-semibold"
          : "text-gray-500"
      }`}>
        {calculateDaysRemaining(policy.endDate)}
      </div>

      {/* Progress Bar */}
      {policy.startDate && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className={`h-2 rounded-full ${
              getDaysRemainingNumber(policy.endDate) <= 5
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${getProgressPercentage(
                policy.startDate,
                policy.endDate
              )}%`,
            }}
          />
        </div>
      )}
    </>
  )}
</td>
                      <td className="px-4">
  {(() => {
    const relatedClaim = claims.find(
      (c) => c.policyId._id === policy._id
    );

    if (relatedClaim) {
      if (relatedClaim.status === "Approved")
        return <span className="text-green-600 font-semibold">Claim Approved</span>;

      if (relatedClaim.status === "Pending")
        return <span className="text-yellow-600 font-semibold">Claim Pending</span>;

      if (relatedClaim.status === "Rejected")
        return <span className="text-red-600 font-semibold">Claim Rejected</span>;
    }

    return <span className="text-blue-600">{policy.status}</span>;
  })()}
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ===== CTA ===== */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-10 rounded-3xl text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Secure Your Harvest with Confidence 🌾
          </h2>
          <p>
            Our blockchain-powered insurance ensures transparency and fast payouts.
          </p>
        </div>

      </div>
    </div>
  );
}