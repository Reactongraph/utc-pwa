"use client";

import React from "react";
import { Button, Card, Input } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Validation schema
const validationSchema = Yup.object({
  contactReason: Yup.string().required("Contact reason is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  question: Yup.string().required("Question is required"),
});

export default function ContactUsForm() {
  const handleInputChange = (name: string, value: string | boolean) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };

  const formik = useFormik({
    initialValues: {
      contactReason: "",
      isConfidential: false,
      name: "",
      email: "",
      phone: "",
      question: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // Add all form fields
        formData.append("sender", "info@unitedtrolleys.com.au");
        formData.append(
          "recipients",
          process.env.NEXT_PUBLIC_REPORT_CONTACT_US_TO || ""
        );

        const subject = values.isConfidential
          ? `${values.contactReason} - CONFIDENTIAL`
          : values.contactReason;
        formData.append("subject", subject);

        const messageBody = values.isConfidential
          ? `Question: ${values.question}`
          : `Mobile App user: ${values.name}
email: ${values.email}
phoneNumber: ${values.phone}

Question: ${values.question}`;
        formData.append("messageBody", messageBody);

        const response = await fetch("/api/email", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        toast.success("Message sent successfully!");
        resetForm();
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Failed to send message. Please try again.");
      }
    },
  });

  return (
    <Card>
      {/* Form Content */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">
            CONFIDENTIAL INTERNAL ISSUE RESOLUTION.
          </h2>
          <p className="mb-4">
            Your question goes directly to UTC management. Check the
            Confidentiality box for sensitive issue that you wish to remain
            privately resolved
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Contact Reason"
              name="contactReason"
              placeholder="Ask a Question"
              className="w-full p-4 border border-gray-300 rounded"
              value={formik.values.contactReason}
              onChange={handleInputChange}
              error={
                formik.touched.contactReason ? formik.errors.contactReason : ""
              }
            />

            <div className="mt-2">
              <input
                type="checkbox"
                name="isConfidential"
                checked={formik.values.isConfidential}
                onChange={(e) =>
                  handleInputChange("isConfidential", e.target.checked)
                }
              />{" "}
              Confidential
              <p className="mt-2">
                Your request will be treated as confidential. We need your
                contact information so that we can get in touch.
              </p>
            </div>
          </div>

          <div>
            <Input
              label="Contact Name"
              name="name"
              type="text"
              placeholder="Add your contact name"
              className="w-full p-4 border border-gray-300 rounded"
              value={formik.values.name}
              onChange={handleInputChange}
              error={formik.touched.name ? formik.errors.name : ""}
            />
          </div>

          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Add your contact email"
              className="w-full p-4 border border-gray-300 rounded"
              value={formik.values.email}
              onChange={handleInputChange}
              error={formik.touched.email ? formik.errors.email : ""}
            />
          </div>

          <div>
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Add your contact phone number"
              className="w-full p-4 border border-gray-300 rounded"
              value={formik.values.phone}
              onChange={handleInputChange}
              error={formik.touched.phone ? formik.errors.phone : ""}
            />
          </div>
          <div>
            <Input
              label="Your Question"
              name="question"
              type="text"
              placeholder="Type your question here"
              className="w-full p-4 border border-gray-300 rounded"
              value={formik.values.question}
              onChange={handleInputChange}
              error={formik.touched.question ? formik.errors.question : ""}
            />
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-yellow-500 text-black text-xl font-bold px-6 py-2 rounded"
            isLoading={formik.isSubmitting}
          >
            SUBMIT »
          </Button>
        </form>
      </div>
    </Card>
  );
}
