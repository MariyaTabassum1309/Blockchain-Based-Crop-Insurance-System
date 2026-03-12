"use client";

import { useEffect, useState } from "react";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => {
        // Filter only policies that have txHash
        const txOnly = data.filter((p: any) => p.txHash);
        setTransactions(txOnly);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredTransactions = transactions.filter((tx) =>
    tx.txHash?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Blockchain Transactions 💰
      </h2>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by transaction hash..."
          className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-indigo-600 text-white text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Tx Hash</th>
              <th className="p-4">Premium</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">View</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((tx) => (
              <tr
                key={tx._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 font-medium">
                  {tx.userId?.name}
                  <div className="text-xs text-gray-500">
                    {tx.userId?.email}
                  </div>
                </td>

                <td className="p-4 text-xs text-gray-600 max-w-xs truncate">
                  {tx.txHash.slice(0, 20)}...
                </td>

                <td className="p-4 font-semibold text-purple-600">
                  {tx.premiumAmount} ETH
                </td>

                <td className="p-4">
                  <span
  className={`px-3 py-1 rounded-full text-sm font-semibold ${
    tx.claimStatus === "Approved"
      ? "bg-green-100 text-green-700"
      : tx.claimStatus === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : tx.claimStatus === "Rejected"
      ? "bg-red-100 text-red-700"
      : tx.status === "Active"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {tx.claimStatus
    ? `Claim ${tx.claimStatus}`
    : tx.status}
</span>
                </td>

                <td className="p-4 text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-sm"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}