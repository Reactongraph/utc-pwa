import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-4 min-h-screen bg-gray-100">{children}</div>;
}
