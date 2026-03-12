"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Home() {
  const [wallet, setWallet] = useState("");

 const connectWallet = async () => {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);
  } catch (error) {
    console.error(error);
    alert("Wallet connection failed");
  }
};

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 px-6 overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/s.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-emerald-900/70 to-black/70" />

      <div className="relative z-10 w-full max-w-7xl">

        {/* ===== HERO ===== */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
           Smart Blockchain Crop Insurance
          </h1>

          <p className="mt-6 text-xl text-white/90 font-medium max-w-3xl mx-auto">
            Smart • Transparent • Blockchain Powered Crop Insurance 🌱
          </p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-3 gap-12 items-center">

          {/* LEFT FEATURES */}
          <div className="space-y-8 text-white">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-2">🌦 Weather Smart</h3>
              <p>Real-time weather triggers for fair premium calculation.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-2">🔐 Blockchain Secured</h3>
              <p>Immutable crop insurance records on Ethereum.</p>
            </div>
          </div>

          {/* CENTER CARD */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100/90 to-emerald-200/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl text-center border border-white/40">

              <h2 className="text-4xl font-bold text-green-900 mb-8 tracking-wide">
                 🌾 AgriSecure
              </h2>

              <div className="flex flex-col gap-5">

                <Link href="/login">
                  <button className="w-full bg-gradient-to-r from-green-700 to-emerald-800 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    🔑 Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    📝 Register
                  </button>
                </Link>

                {wallet ? (
                  <div className="bg-green-900 text-white py-3 rounded-xl font-semibold shadow-md">
                    🔗 {wallet.slice(0, 6)}...{wallet.slice(-4)}
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    🦊 Connect Wallet
                  </button>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT FEATURES */}
          <div className="space-y-8 text-white">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-2">⚡ Instant Claims</h3>
              <p>Fast AI-based disease validation and smart settlement.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-2">🌾 Farmer First</h3>
              <p>Designed to secure farmers' investments and livelihoods.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}