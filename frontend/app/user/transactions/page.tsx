"use client";

import { useEffect, useState } from "react";

interface Policy {
  _id: string;
  coverage: number;
  riskType: string;
  premiumAmount: number;
  duration: number;
  cropType: string;
  acres: number;
  status: string;
  txHash?: string;
}

export default function Transactions() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    setUserId(parsedUser._id);

    fetch(`http://localhost:5000/api/policies/by-user/${parsedUser._id}`)
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to fetch policies:", err));
  }, []);

  return (
  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat relative py-8 px-6"
    style={{ backgroundImage: "url('/okk.jpg')" }}
  >

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <div className="relative max-w-6xl mx-auto">

      {/* ===== BLOCKCHAIN INTRO SECTION ===== */}
      <div className="bg-white/95 p-10 rounded-3xl shadow-2xl mb-12 border border-green-100">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent mb-6">
          🔗 Secure Blockchain Transactions
        </h1>

        <p className="text-lg leading-relaxed text-[#064e3b] font-medium tracking-wide">
          All premium payments are securely processed through the Ethereum 
          blockchain (Sepolia Test Network). Each transaction is immutable, 
          transparent, and verifiable through Etherscan. This ensures 
          tamper-proof financial records, decentralized validation, and 
          enhanced trust between policyholders and the system. 
          Blockchain guarantees security, accountability, and complete 
          visibility of every insurance transaction.
        </p>
      </div>

      {/* ===== TRANSACTION TABLE ===== */}
      <div className="bg-white/95 p-10 rounded-3xl shadow-2xl border border-green-100">

        <h2 className="text-2xl font-bold text-green-800 mb-8">
          📄 Transaction History
        </h2>

        {policies.length === 0 ? (
          <p className="text-gray-700 font-medium">
            No policies or transactions found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="min-w-full text-left border-collapse">

              <thead className="bg-green-700 text-white text-lg uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-extrabold">Policy ID</th>
                  <th className="px-6 py-4 font-extrabold">Crop</th>
                  <th className="px-6 py-4 font-extrabold">Coverage (₹)</th>
                  <th className="px-6 py-4 font-extrabold">Premium (₹)</th>
                  <th className="px-6 py-4 font-extrabold">Status</th>
                  <th className="px-6 py-4 font-extrabold">Blockchain Tx</th>
                </tr>
              </thead>

              <tbody className="bg-white text-gray-900 font-semibold">
                {policies.map((policy, index) => (
                  <tr
                    key={policy._id}
                    className={`border-b border-green-100 transition hover:bg-green-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-green-50/30"
                    }`}
                  >
                    <td className="px-6 py-4 text-green-800 font-bold truncate max-w-[150px]">
                      {policy._id}
                    </td>

                    <td className="px-6 py-4">
                      {policy.cropType}
                    </td>

                    <td className="px-6 py-4 text-blue-700">
                      ₹{policy.coverage.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-emerald-700">
                      ₹{policy.premiumAmount.toLocaleString()}
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

                    <td className="px-6 py-4">
                      {policy.txHash ? (
                        <a
                          href={`https://sepolia.etherscan.io/tx/${policy.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold"
                        >
                          View on Etherscan
                        </a>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  </div>
);
}