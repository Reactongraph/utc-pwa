"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button, Card, Input, Select } from "@/components";

export default function IncidentReportForm() {
  const [currentTime] = useState(
    new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  return (
    <Card>
      {/* Form Content */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">
            Report your Incident, Near Miss or Hazard instantly.
          </h2>
          <p className="mb-4">
            UTC are then able to provide you with the assistance you require to
            manage the situation effectively and comply with all Legal
            Requirements.
          </p>
          <p>
            Incidents MUST be reported immediately from site unless there is an
            injured person to attend to first.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Input
              label="Your full name"
              name="fullName"
              placeholder="Add your contact name"
              className="w-full p-4 border border-gray-300 rounded"
            />
          </div>

          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="add your contact email"
              className="w-full p-4 border border-gray-300 rounded"
            />
          </div>

          <div>
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="add your contact phone number"
              className="w-full p-4 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="location" className="text-xl font-bold block mb-2">
              Location of the incident
            </label>
            <div className="flex items-center border border-gray-300 rounded p-4">
              <MapPin className="text-red-500 mr-2" size={24} />
              <span className="flex-1">No location</span>
              <Button className="font-bold px-6 py-2 rounded">ADD »</Button>
            </div>
          </div>

          <div>
            <label htmlFor="time" className="text-xl font-bold block mb-2">
              Time of the incident
            </label>
            <div className="flex items-center border border-gray-300 rounded p-4">
              <span className="flex-1">{currentTime}</span>
              <Button className="font-bold px-6 py-2 rounded">CHANGE »</Button>
            </div>
          </div>

          <div>
            <Input
              label="Address of incident"
              name="address"
              type="tel"
              placeholder="Please enter the address of the incident or name of the shopping centre. Please add additional detail such as level of Carpark if applicable."
              className="w-full p-4 border border-gray-300 rounded"
              rows={4}
            />
          </div>

          <Select
            labelClass="text-xl font-bold"
            label="State of incident"
            name="state"
            value={""}
            onChange={() => {}}
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

          <div>
            <Input
              label="Description of the incident"
              name="description"
              type="text"
              placeholder="Tell us about the incident"
              className="w-full p-4 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="time" className="text-xl font-bold block mb-2">
              Related Image
            </label>
            <div className="flex items-center border border-gray-300 rounded p-4">
              <span className="flex-1"></span>
              <Button className="font-bold px-6 py-2 rounded">
                ADD PHOTO »
              </Button>
            </div>
          </div>

          <Button className="bg-primary hover:bg-yellow-500 text-black text-xl font-bold px-6 py-2 rounded">
            SUBMIT »
          </Button>
        </div>
      </div>
    </Card>
  );
}
