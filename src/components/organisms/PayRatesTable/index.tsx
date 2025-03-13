"use client";

import { Card } from "@/components";
import { useState } from "react";

interface PayRate {
  classification: string;
  base_hourly: string;
  shift_morning: string;
  shift_night: string;
  penalty_saturday: string;
  penalty_sunday: string;
  penalty_holiday: string;
  over_first_two: string;
  over_after_two: string;
}

interface PayRatesTableProps {
  payRates: PayRate[];
  category?: string;
  label?: string;
  note?: string;
}

export function PayRatesTable({
  payRates,
  category,
  label,
  note,
}: PayRatesTableProps) {
  const [activeTab, setActiveTab] = useState("Base Rates");

  const getTableColumns = () => {
    switch (activeTab) {
      case "Base Rates":
        return [
          { header: "Classification", key: "classification" },
          { header: "Hourly Base Rate", key: "base_hourly" },
        ];
      case "Shiftwork":
        return [
          { header: "Classification", key: "classification" },
          { header: "Early Morning", key: "shift_morning" },
          { header: "Night", key: "shift_night" },
        ];
      case "Penalty Rates":
        return [
          { header: "Classification", key: "classification" },
          { header: "Saturday", key: "penalty_saturday" },
          { header: "Sunday", key: "penalty_sunday" },
          { header: "Public Holiday", key: "penalty_holiday" },
        ];
      case "Overtime":
        return [
          { header: "Classification", key: "classification" },
          { header: "First Two Hours", key: "over_first_two" },
          { header: "After Two Hours", key: "over_after_two" },
        ];
      default:
        return [];
    }
  };

  return (
    <Card>
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4">
            {category?.toUpperCase()} {label}
          </h2>

          <p className="text-gray-800 mb-6">Note: {note}</p>

          {/* Tabs */}
          <div className="flex border rounded-md overflow-hidden mb-4">
            {["Base Rates", "Shiftwork", "Penalty Rates", "Overtime"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 px-2 text-center ${
                    activeTab === tab
                      ? "bg-yellow-500 text-white font-bold"
                      : "bg-white text-yellow-600 border-r"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {getTableColumns().map((column) => (
                    <th
                      key={column.key}
                      className="bg-yellow-500 border border-yellow-600 p-3 text-left"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payRates.map((row, index) => (
                  <tr key={index}>
                    {getTableColumns().map((column) => (
                      <td
                        key={column.key}
                        className={`${
                          column.key === "classification"
                            ? "bg-yellow-500"
                            : "bg-white"
                        } border border-gray-300 p-3 ${
                          column.key === "classification" ? "" : "text-center"
                        }`}
                      >
                        {row[column.key as keyof PayRate]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
}
