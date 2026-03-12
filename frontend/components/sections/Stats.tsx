"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { number: "1,250+", label: "Policies Issued" },
    { number: "₹45L+", label: "Claims Paid" },
    { number: "98%", label: "Farmer Satisfaction" },
    { number: "24/7", label: "Smart Contract Monitoring" },
  ];

  return (
    <section className="bg-green-700 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          Platform Impact
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-green-600 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
              <p className="text-sm opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
