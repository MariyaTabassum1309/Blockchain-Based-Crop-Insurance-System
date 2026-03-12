"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Policy {
  _id: string;
  cropType: string;
  premiumAmount?: number;
  coverage?: number;
  duration: number;
  status: string;
  createdAt: string;
}

export default function Analytics() {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user._id) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/policies/by-user/${user._id}`
        );
        const data = await res.json();
        setPolicies(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPolicies();
  }, []);

  // 🔥 NO GROUPING — each policy separate
  const barData = policies.map((policy, index) => ({
    name: `Policy ${index + 1}`,
    premium: policy.premiumAmount || 0,
    coverage: policy.coverage || 0,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];
return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50 py-10 px-6">

    <div className="max-w-7xl mx-auto">

      {/* ===== BLOCKCHAIN ADVANTAGE SECTION ===== */}
      
      {/* ===== CHART SECTION ===== */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl mb-12 border border-green-100">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          📊 Premium vs Coverage Overview
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />

            <XAxis
              dataKey="name"
              angle={-20}
              textAnchor="end"
              height={70}
              interval={0}
              tick={{ fontWeight: 600 }}
            />

            <YAxis
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              tick={{ fontWeight: 600 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#f0fdf4",
                borderRadius: "12px",
                border: "1px solid #16a34a",
              }}
              formatter={(value: any) =>
                `₹${Number(value).toLocaleString()}`
              }
            />

            <Legend wrapperStyle={{ fontWeight: "bold" }} />

            <Bar dataKey="premium" name="Premium" radius={[8, 8, 0, 0]}>
              {barData.map((_, index) => (
                <Cell
                  key={`premium-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>

            <Bar dataKey="coverage" name="Coverage" radius={[8, 8, 0, 0]}>
              {barData.map((_, index) => (
                <Cell
                  key={`coverage-${index}`}
                  fill={COLORS[(index + 1) % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== POLICY TABLE ===== */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-green-100">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          📄 Detailed Policy Records
        </h2>

        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="min-w-full text-left border-collapse">

            <thead className="bg-green-700 text-white text-lg uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-extrabold">Crop</th>
                <th className="px-6 py-4 font-extrabold">Premium</th>
                <th className="px-6 py-4 font-extrabold">Coverage</th>
                <th className="px-6 py-4 font-extrabold">Duration</th>
                <th className="px-6 py-4 font-extrabold">Status</th>
                <th className="px-6 py-4 font-extrabold">Created Date</th>
              </tr>
            </thead>

            <tbody className="bg-white text-gray-900 text-base font-semibold">
              {policies.map((policy, index) => (
                <tr
                  key={policy._id}
                  className={`border-b border-green-100 transition hover:bg-green-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-green-50/30"
                  }`}
                >
                  <td className="px-6 py-4 text-green-800 font-bold">
                    {policy.cropType}
                  </td>

                  <td className="px-6 py-4 text-emerald-700">
                    ₹{(policy.premiumAmount || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-blue-700">
                    ₹{(policy.coverage || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {policy.duration} days
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        policy.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {policy.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {new Date(policy.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
);
}
