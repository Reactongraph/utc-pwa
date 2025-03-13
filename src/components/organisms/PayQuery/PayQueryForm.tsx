"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@/components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  contactReason: Yup.string().required("Contact reason is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  question: Yup.string().required("Question is required"),
});

export default function PayQueryForm() {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      contactReason: "",
      name: "",
      email: "",
      phone: "",
      question: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        const formData = new FormData();

        // Add all form fields
        formData.append("sender", "submissions@unitedtrolleys.com.au");
        formData.append(
          "recipients",
          process.env.NEXT_PUBLIC_REPORT_PAY_QUERY_TO || ""
        );
        formData.append("subject", "Pay Query Submission");

        const messageBody = `Mobile App user: ${values.name}
email: ${values.email}
phoneNumber: ${values.phone}
Contact Reason: ${values.contactReason}

Question: ${values.question}`;
        formData.append("messageBody", messageBody);

        const response = await fetch("/api/email", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        toast.success("Pay query submitted successfully!");
        resetForm();
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Failed to submit pay query. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold mb-2">
          Allow us to assist you with your pay related enquires
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
              formik.touched.contactReason && formik.errors.contactReason
                ? formik.errors.contactReason
                : ""
            }
          />
          <p className="mt-2">
            Your request will be treated as confidential. We need your contact
            information so that we can get in touch.
          </p>
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
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
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
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
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
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""
            }
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
            error={
              formik.touched.question && formik.errors.question
                ? formik.errors.question
                : ""
            }
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="bg-primary hover:bg-yellow-500 text-black text-xl font-bold px-6 py-2 rounded"
        >
          {"SUBMIT »"}
        </Button>
      </form>
    </div>
  );
}
