"use client";

import { useState } from "react";
import {
  Card,
  Header,
  InductionLinks,
  InductionTest,
  InductionVideos,
} from "@/components";

export default function UTCInduction() {
  const [activeTab, setActiveTab] = useState("VIDEOS");

  return (
    <>
      <Header title="Induction" />
      <Card>
        {/* Navigation Tabs */}
        <div className="flex border-b">
          {["VIDEOS", "QUESTIONNAIRE", "LINKS"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 text-center font-bold ${
                activeTab === tab
                  ? "border-b-4 border-primary bg-yellow-100"
                  : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "VIDEOS" && <InductionVideos />}
        {activeTab === "LINKS" && <InductionLinks />}
        {activeTab === "QUESTIONNAIRE" && <InductionTest />}
      </Card>
    </>
  );
}
