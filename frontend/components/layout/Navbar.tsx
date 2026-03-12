"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="relative w-full shadow-md z-50 overflow-hidden">

      {/* Background Image */}
      <img
        src="/sok.jpg"
        alt="Top Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Navbar Content */}
<div className="relative max-w-7xl mx-auto px-8 py-7 flex justify-between items-center text-white">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          AgriSecure
        </Link>

<div className="space-x-8 flex items-center text-lg font-semibold">

          <Link href="/" className="hover:text-green-400 transition">
            Home
          </Link>

          {user && user.role === "user" && (
            <>
              <Link href="/user/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>

              <Link href="/user/policies" className="hover:text-green-400 transition">
                Policies
              </Link>

              <Link href="/user/create-policy" className="hover:text-green-400 transition">
                Create Policy
              </Link>

              <Link href="/user/analytics" className="hover:text-green-400 transition">
                Analytics
              </Link>

              <Link href="/user/claim" className="hover:text-green-400 transition">
                Claim
              </Link>

              <Link href="/user/transactions" className="hover:text-green-400 transition">
                Transactions
              </Link>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link href="/admin/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>

              <Link href="/admin/users" className="hover:text-green-400 transition">
                Users
              </Link>

              <Link href="/admin/policies" className="hover:text-green-400 transition">
                Policies
              </Link>

              <Link href="/admin/transactions" className="hover:text-green-400 transition">
                Transactions
              </Link>

              <Link href="/admin/settings" className="hover:text-green-400 transition">
                Settings
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link href="/login" className="hover:text-green-400 transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-green-400 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-green-300">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}