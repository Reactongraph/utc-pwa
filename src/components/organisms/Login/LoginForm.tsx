"use client";

import { Input } from "@/components";
import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    site: "",
    role: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[20rem] m-4">
      <div className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          inline={true}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md font-semibold text-lg mt-6"
        >
          SIGN IN
        </button>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md font-semibold text-lg mt-6"
          onClick={() => router.push("/register")}
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
}
