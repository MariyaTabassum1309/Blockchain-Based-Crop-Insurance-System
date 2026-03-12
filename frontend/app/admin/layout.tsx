"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    setAuthorized(true);
  }, []);

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <button onClick={() => router.push("/admin/dashboard")} className="block w-full text-left hover:text-green-400">
          Dashboard
        </button>

        <button onClick={() => router.push("/admin/users")} className="block w-full text-left hover:text-green-400">
          Users
        </button>

        <button onClick={() => router.push("/admin/policies")} className="block w-full text-left hover:text-green-400">
          Policies
        </button>
        <button onClick={() => router.push("/admin/policy-approval")} className="block w-full text-left hover:text-green-400">
          Policy-Approval
        </button>

        <button onClick={() => router.push("/admin/transactions")} className="block w-full text-left hover:text-green-400">
          Transactions
        </button>
        <button onClick={() => router.push("/admin/claims")} className="block w-full text-left hover:text-green-400">
          Claims
        </button>

        <button onClick={() => router.push("/admin/settings")} className="block w-full text-left hover:text-green-400">
          Settings
        </button>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-10">
        {children}
      </div>
    </div>
  );
}