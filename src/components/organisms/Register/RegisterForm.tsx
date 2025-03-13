"use client";

import { Input, Select } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface Site {
  id: number;
  contractor_id: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  site: Yup.string().required("Site is required"),
  role: Yup.string().required("Role is required"),
});

export default function RegisterForm({ sites }: { sites: Site[] }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      site: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const selectedSite = sites.find(
          (site) => site.id.toString() === values.site
        );

        const payload = {
          email: values.email,
          platform: "aps",
          device: "ios",
          device_token: "your_device_token_here",
          name: values.fullName,
          address: selectedSite?.address || "",
          latitude: 0,
          longitude: 0,
          role: values.role,
          site_id: parseInt(values.site),
        };

        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || data.error || "Registration failed");
        }
        console.log("Registration successful:", data);
        if (data.status) {
          console.log("Registration successful:", data);
          toast.success("Registration successful");
          resetForm();
          window.location.href = "/login";
        } else {
          toast.error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-[20rem] m-4">
      <div className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formik.values.fullName}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          error={formik.touched.fullName && formik.errors.fullName}
          inline={true}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          error={formik.touched.email && formik.errors.email}
          inline={true}
        />

        <Select
          label="Site"
          name="site"
          value={formik.values.site}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          error={formik.touched.site && formik.errors.site}
          placeholder="Select Site"
          options={sites.map((site) => ({
            value: site.id.toString(),
            label: site.name,
          }))}
        />

        <Select
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          error={formik.touched.role && formik.errors.role}
          placeholder="Select Role"
          options={[
            { value: "Driver", label: "Driver" },
            { value: "Street Run", label: "Street Run" },
            { value: "Pusher", label: "Pusher" },
          ]}
        />

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold text-lg mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {formik.isSubmitting ? (
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
              <span>SIGNING UP...</span>
            </div>
          ) : (
            "SIGN UP"
          )}
        </button>
      </div>
    </form>
  );
}
