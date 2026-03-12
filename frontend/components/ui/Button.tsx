"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2 rounded-lg font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400",
    secondary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}
