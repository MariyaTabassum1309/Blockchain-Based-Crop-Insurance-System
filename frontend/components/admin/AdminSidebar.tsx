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
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "240px",
          background: "#111827",
          color: "white",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <h2>Admin Panel</h2>
        <hr />
        <p onClick={() => router.push("/admin/dashboard")}>Dashboard</p>
        <p onClick={() => router.push("/admin/users")}>Users</p>
        <p onClick={() => router.push("/admin/transactions")}>
          Transactions
        </p>
        <p onClick={() => router.push("/admin/settings")}>Settings</p>
      </div>

      <div style={{ flex: 1, padding: "40px" }}>{children}</div>
    </div>
  );
}