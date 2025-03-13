"use client";

import { useState, useRef } from "react";
import { MapPin, X, Trash2 } from "lucide-react";
import { Button, Card, Input, Select } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  description: Yup.string().required("Description is required"),
  incidentTime: Yup.date().required("Time of incident is required"),
  images: Yup.array().of(
    Yup.object().shape({
      file: Yup.mixed().required(),
      preview: Yup.string().required(),
    })
  ),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

interface ImageFile {
  file: File;
  preview: string;
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
  initialLocation: { lat: number; lng: number };
}

const MapModal = ({
  isOpen,
  onClose,
  onSelectLocation,
  initialLocation,
}: MapModalProps) => {
  const [markerPosition, setMarkerPosition] = useState(initialLocation);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  const handleConfirm = () => {
    onSelectLocation(markerPosition.lat, markerPosition.lng);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full md:w-[800px] md:h-[600px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Location</h3>
          <Button type="button" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>
        <div className="h-[calc(100%-120px)]">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={markerPosition}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={(e) => {
                  if (e.latLng) {
                    setMarkerPosition({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    });
                  }
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            onClick={onClose}
            className="font-bold px-6 py-2 rounded"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="font-bold px-6 py-2 rounded"
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function IncidentReportForm() {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [tempDateTime, setTempDateTime] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      description: "",
      incidentTime: new Date(),
      images: [] as ImageFile[],
      latitude: -37.8136, // Default coordinates for Melbourne
      longitude: 144.9631,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // Add all text fields
        formData.append("sender", "submissions@unitedtrolleys.com.au");
        formData.append("subject", "INCIDENT REPORT");
        formData.append(
          "recipients",
          process.env.NEXT_PUBLIC_REPORT_INCIDENTS_TO || ""
        );

        const messageBody = `Mobile App user: ${values.fullName}
email: ${values.email}
phoneNumber: ${values.phone}

Location of the incident: http://maps.google.com/maps?q=${values.latitude},${
          values.longitude
        }
Date Of the Incident: ${formatDateTime(values.incidentTime)}
Address Of the Incident: ${values.address}
State Of the Incident: ${values.state}
Description Of the Incident: ${values.description}

Number of images attached: ${values.images.length}`;

        formData.append("messageBody", messageBody);

        // Add images
        values.images.forEach((image) => {
          formData.append(`image`, image.file);
        });

        const response = await fetch("/api/email", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        toast.success("Incident report submitted successfully!");
        resetForm();

        // Cleanup image previews
        values.images.forEach((image) => {
          URL.revokeObjectURL(image.preview);
        });
      } catch (error) {
        console.error("Error sending incident report:", error);
        toast.error("Failed to submit incident report. Please try again.");
      }
    },
  });
  const handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleTimeChange = (name: string, value: string) => {
    setTempDateTime(value);
  };

  const handleTimeSubmit = () => {
    if (tempDateTime) {
      formik.setFieldValue("incidentTime", new Date(tempDateTime));
      setIsTimePickerOpen(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImageFile[] = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      formik.setFieldValue("images", [...formik.values.images, ...newImages]);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    URL.revokeObjectURL(newImages[index].preview); // Clean up the URL
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    formik.setFieldValue("latitude", lat);
    formik.setFieldValue("longitude", lng);
  };

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">
              Report your Incident, Near Miss or Hazard instantly.
            </h2>
            <p className="mb-4">
              UTC are then able to provide you with the assistance you require
              to manage the situation effectively and comply with all Legal
              Requirements.
            </p>
            <p>
              Incidents MUST be reported immediately from site unless there is
              an injured person to attend to first.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Input
                label="Your full name"
                name="fullName"
                placeholder="Add your contact name"
                className="w-full p-4 border border-gray-300 rounded"
                value={formik.values.fullName}
                onChange={handleInputChange}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.fullName}
                </div>
              )}
            </div>

            <div>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="add your contact email"
                className="w-full p-4 border border-gray-300 rounded"
                value={formik.values.email}
                onChange={handleInputChange}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="add your contact phone number"
                className="w-full p-4 border border-gray-300 rounded"
                value={formik.values.phone}
                onChange={handleInputChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="text-xl font-bold block mb-2"
              >
                Location of the incident
              </label>
              <div className="flex items-center border border-gray-300 rounded p-4">
                <MapPin className="text-red-500 mr-2" size={24} />
                <span className="flex-1">
                  {formik.values.latitude !== -37.8136 &&
                  formik.values.longitude !== 144.9631
                    ? `Lat: ${formik.values.latitude.toFixed(
                        4
                      )}, Lng: ${formik.values.longitude.toFixed(4)}`
                    : "No location selected"}
                </span>
                <Button
                  type="button"
                  className="font-bold px-6 py-2 rounded"
                  onClick={() => setIsMapOpen(true)}
                >
                  ADD »
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="time" className="text-xl font-bold block mb-2">
                Time of the incident
              </label>
              <div className="flex items-center border border-gray-300 rounded p-4">
                <span className="flex-1">
                  {formatDateTime(formik.values.incidentTime)}
                </span>
                <Button
                  type="button"
                  className="font-bold px-6 py-2 rounded"
                  onClick={() => setIsTimePickerOpen(true)}
                >
                  CHANGE »
                </Button>
              </div>
              {formik.touched.incidentTime && formik.errors.incidentTime && (
                <div className="text-red-500 text-sm mt-1">
                  {`${formik.errors.incidentTime}`}
                </div>
              )}
            </div>

            <div>
              <Input
                label="Address of incident"
                name="address"
                type="text"
                placeholder="Please enter the address of the incident or name of the shopping centre. Please add additional detail such as level of Carpark if applicable."
                className="w-full p-4 border border-gray-300 rounded"
                value={formik.values.address}
                onChange={handleInputChange}
                rows={4}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div>
              <Select
                labelClass="text-xl font-bold"
                label="State of incident"
                name="state"
                value={formik.values.state}
                onChange={handleInputChange}
                placeholder="Select State"
                options={[
                  { value: "VIC", label: "VIC" },
                  { value: "QLD", label: "QLD" },
                  { value: "NSW", label: "NSW" },
                  { value: "WA", label: "WA" },
                  { value: "ACT", label: "ACT" },
                  { value: "TAS", label: "TAS" },
                  { value: "NA", label: "NA" },
                  { value: "NT", label: "NT" },
                ]}
              />
              {formik.touched.state && formik.errors.state && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.state}
                </div>
              )}
            </div>

            <div>
              <Input
                label="Description of the incident"
                name="description"
                type="text"
                placeholder="Tell us about the incident"
                className="w-full p-4 border border-gray-300 rounded"
                value={formik.values.description}
                onChange={handleInputChange}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="images" className="text-xl font-bold block mb-2">
                Related Images
              </label>
              <div className="border border-gray-300 rounded p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {formik.values.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-40 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {formik.values.images.length} image(s) uploaded
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      className="font-bold px-6 py-2 rounded flex items-center gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      ADD PHOTO »
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-primary hover:bg-yellow-500 text-black text-xl font-bold px-6 py-2 rounded"
              isLoading={formik.isSubmitting}
            >
              SUBMIT »
            </Button>
          </div>
        </div>
      </form>

      {/* DateTime Picker Modal */}
      {isTimePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Select Date and Time</h3>
              <Button
                type="button"
                onClick={() => setIsTimePickerOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </Button>
            </div>
            <Input
              type="datetime-local"
              name="tempDateTime"
              value={tempDateTime}
              onChange={handleTimeChange}
              className="w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => setIsTimePickerOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleTimeSubmit}
                className="px-4 py-2 bg-primary hover:bg-yellow-500 text-black"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelectLocation={handleLocationSelect}
        initialLocation={{
          lat: formik.values.latitude,
          lng: formik.values.longitude,
        }}
      />
    </Card>
  );
}
