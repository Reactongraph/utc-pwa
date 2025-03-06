"use client";

import { Input, Select } from "@/components";
import type React from "react";

import { useState } from "react";

export default function RegisterForm() {
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
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          inline={true}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          inline={true}
        />

        <Select
          label="Site"
          name="site"
          value={formData.site}
          onChange={handleChange}
          placeholder="Select Site"
          options={[
            { value: "site1", label: "Site 1" },
            { value: "site2", label: "Site 2" },
            { value: "site3", label: "Site 3" },
          ]}
        />

        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Select Role"
          options={[
            { value: "admin", label: "Admin" },
            { value: "manager", label: "Manager" },
            { value: "user", label: "User" },
          ]}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md font-semibold text-lg mt-6"
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
}
