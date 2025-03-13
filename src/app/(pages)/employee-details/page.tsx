"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, Header, Input } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Validation schema
const validationSchema = Yup.object({
  employeeName: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  worksites: Yup.array()
    .of(Yup.string())
    .min(1, "At least one worksite is required"),
  inductionImages: Yup.array()
    .of(Yup.string())
    .min(1, "At least one induction card image is required"),
});

interface EmployeeData {
  employeeName: string;
  worksites: string[];
  inductionImages: string[];
}

export default function EmployeeDetails() {
  const [worksite, setWorksite] = useState("");

  // Initialize formik
  const formik = useFormik<EmployeeData>({
    initialValues: {
      employeeName: "",
      worksites: [],
      inductionImages: [],
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("employeeDetails", JSON.stringify(values));
      toast.success("Employee details saved successfully!");
    },
  });

  // Load existing data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("employeeDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formik.setValues(parsedData);
    }
  }, []);

  const addWorksite = () => {
    if (worksite.trim()) {
      formik.setFieldValue("worksites", [...formik.values.worksites, worksite]);
      setWorksite("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("inductionImages", [
          ...formik.values.inductionImages,
          reader.result as string,
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add this new function to handle image removal
  const handleRemoveImage = (index: number) => {
    const newImages = formik.values.inductionImages.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("inductionImages", newImages);
  };

  const handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };
  return (
    <>
      <Header title="Employee Details" />
      <Card>
        <form onSubmit={formik.handleSubmit} className="flex-1">
          <p className="text-xl mb-8">
            Enter your full name and all sites you work at below.
          </p>

          {/* Name Input */}
          <div className="mb-8">
            <Input
              label="Your Name"
              placeholder="Employee Name"
              name="employeeName"
              value={formik.values.employeeName}
              onChange={handleInputChange}
              error={
                formik.touched.employeeName ? formik.errors.employeeName : ""
              }
            />
          </div>

          {/* Worksites Management */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-2">
              Manage your worksites
            </label>
            <div className="flex border border-gray-300 rounded">
              <input
                type="text"
                placeholder="Type a worksite"
                className="flex-1 bg-gray-100 p-3 rounded-l outline-none"
                value={worksite}
                onChange={(e) => setWorksite(e.target.value)}
              />
              <button
                onClick={addWorksite}
                className="bg-primary text-black px-6 py-3 font-bold rounded-r"
              >
                ADD
              </button>
            </div>
          </div>

          {/* Previously Added Worksites */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">
              Previously added worksites
            </h2>
            {formik.values.worksites.length > 0 ? (
              <ul className="list-disc pl-5">
                {formik.values.worksites.map((site, index) => (
                  <li key={index} className="mb-1">
                    {site}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No worksites added yet</p>
            )}
            {formik.touched.worksites && formik.errors.worksites && (
              <p className="text-red-500">{formik.errors.worksites}</p>
            )}
          </div>

          {/* Saved Induction Card */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Saved Induction Card</h2>
            <div className="bg-gray-200 p-4 rounded">
              <div className="mt-4 grid grid-cols-2 gap-4">
                {formik.values.inductionImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Induction card ${index + 1}`}
                      className="w-full h-64 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="w-64 h-64 bg-gray-300 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center mb-4">
                    <Plus size={40} color="white" />
                  </div>
                  <span className="text-xl font-bold">ADD IMAGE</span>
                </div>
              </label>
            </div>

            {formik.touched.inductionImages &&
              formik.errors.inductionImages && (
                <p className="text-red-500">{formik.errors.inductionImages}</p>
              )}
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <p className="text-lg">
              Take a photo of each of your Induction Cards and save here. This
              provides you with a backup copy in case you lose your cards.
            </p>
          </div>

          {/* Reminder */}
          <div className="mb-8">
            <p className="text-lg font-bold">
              Remember: You must always have your Induction cards with you when
              onsite.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-black px-6 py-3 font-bold rounded w-full"
          >
            Save Details
          </button>
        </form>
      </Card>
    </>
  );
}
