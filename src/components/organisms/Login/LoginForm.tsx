"use client";

import { Input } from "@/components";
import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { isAxiosError } from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("error", error);
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setIsLoading(true);
      setError(null);

      if (!formData.email) {
        setError("Email is required");
        return;
      }

      const result = await signIn("credentials", {
        email: formData.email,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to verify OTP");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[20rem] m-4 mb-10">
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
          disabled={isLoading}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold text-lg mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>SIGNING IN...</span>
            </div>
          ) : (
            "SIGN IN"
          )}
        </button>
        <div className="flex items-center justify-center pt-4">
          <p className="text-md">Don't have an account?</p>
        </div>
        <button
          type="button"
          className="w-full bg-green-500 text-white py-3 rounded-md font-semibold text-lg mt-2"
          onClick={() => router.push("/register")}
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
}
