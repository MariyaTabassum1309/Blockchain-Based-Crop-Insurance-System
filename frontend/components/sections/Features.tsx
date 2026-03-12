"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CloudRain, Wallet, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Smart Contract Security",
      description:
        "Insurance policies are secured using Ethereum smart contracts ensuring tamper-proof transactions.",
    },
    {
      icon: <CloudRain size={40} />,
      title: "Weather-Based Claims",
      description:
        "Automated claim eligibility based on real-time rainfall and weather conditions.",
    },
    {
      icon: <Wallet size={40} />,
      title: "Instant Payouts",
      description:
        "Eligible farmers receive payouts instantly without manual processing delays.",
    },
    {
      icon: <BarChart3 size={40} />,
      title: "Full Transparency",
      description:
        "All transactions are publicly verifiable via Etherscan for complete transparency.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          Why Choose AgriSecure?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-slate-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="text-green-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
