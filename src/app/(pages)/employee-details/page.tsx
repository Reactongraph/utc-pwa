"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, Header, Input } from "@/components";

export default function EmployeeDetails() {
  const [worksite, setWorksite] = useState("");
  const [worksites, setWorksites] = useState<string[]>([]);

  const addWorksite = () => {
    if (worksite.trim()) {
      setWorksites([...worksites, worksite]);
      setWorksite("");
    }
  };

  return (
    <>
      <Header title="Employee Details" />
      <Card>
        {/* Form Content */}
        <div className="flex-1">
          <p className="text-xl mb-8">
            Enter your full name and all sites you work at below.
          </p>

          {/* Name Input */}
          <div className="mb-8">
            <Input
              label="Your Name"
              placeholder="Employee Name"
              name="employeeName"
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
            {worksites.length > 0 ? (
              <ul className="list-disc pl-5">
                {worksites.map((site, index) => (
                  <li key={index} className="mb-1">
                    {site}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No worksites added yet</p>
            )}
          </div>

          {/* Saved Induction Card */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Saved Induction Card</h2>
            <div className="bg-gray-200 p-4 rounded">
              <div className="w-64 h-64 bg-gray-300 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center mb-4">
                  <Plus size={40} color="white" />
                </div>
                <span className="text-xl font-bold">ADD IMAGE</span>
              </div>
            </div>
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
        </div>
      </Card>
    </>
  );
}
