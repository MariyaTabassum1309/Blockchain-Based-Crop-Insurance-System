"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
 
  { name: "Users", path: "/admin/users" },
  { name: "Policies", path: "/admin/policies" },
  { name: "Transactions", path: "/admin/transactions" },
  { name: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white p-6 shadow-2xl">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-3 rounded-xl transition-all duration-300 ${
              pathname === item.path
                ? "bg-white text-indigo-700 font-semibold shadow-lg"
                : "hover:bg-white/20"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}