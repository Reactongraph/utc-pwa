"use client";

import { Play } from "lucide-react";
import React, { useState } from "react";

// Language constant with YouTube video URLs
interface Language {
  name: string;
  title: string;
  native: string;
  videoUrl: string;
}

const LANGUAGES: Language[] = [
  {
    name: "English",
    title: "UTC INDUCTION VIDEO English",
    native: "",
    videoUrl: "https://www.youtube.com/embed/JRQ9dfMuPPk?si=-O2QgqGQ-ZqK2omm",
  },
  {
    name: "Punjabi",
    title: "UTC INDUCTION VIDEO Punjabi",
    native: "(ਪੰਜਾਬੀ)",
    videoUrl: "https://www.youtube.com/embed/UIGxgo0YO70?si=4w1PBdcDtGEhzhen",
  },
  {
    name: "Arabic",
    title: "UTC INDUCTION VIDEO Arabic",
    native: "(عربى)",
    videoUrl: "https://www.youtube.com/embed/hsm-lBxXN8M?si=bZ_TCa_zApDXLaJd",
  },
  {
    name: "Hindi",
    title: "UTC INDUCTION VIDEO Hindi",
    native: "(हिंदी)",
    videoUrl: "https://www.youtube.com/embed/ki-7Zr4lKw0?si=for5J9FT7j_I1ppg",
  },
];

export default function InductionVideos() {
  const [activeVideo, setActiveVideo] = useState<Language | null>(null);

  const handlePlayVideo = (lan: Language) => {
    setActiveVideo(lan);
  };

  return (
    <div className="pt-4">
      <div onClick={() => setActiveVideo(null)} className="border-2 border-primary rounded-full p-4 mb-6">
        <h2 className="text-2xl text-center font-bold">
          {activeVideo ? activeVideo.name : "Please Select Language"}
        </h2>
      </div>

      {/* Language Options */}
      {!activeVideo && (
        <div className="space-y-4">
          {LANGUAGES.map((language) => (
            <div
              key={language.name}
              className="bg-primary rounded-lg p-4 flex justify-between items-center"
            >
              <span className="text-xl font-bold">
                {language.name} {language.native}
              </span>
              <div
                className="bg-black rounded-full p-2 cursor-pointer"
                onClick={() => handlePlayVideo(language)}
              >
                <Play fill="white" className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
       <>
       <iframe
          width="100%"
          height="100%"
          src={activeVideo.videoUrl}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          ></iframe>
          <p className="text-center text-2xl mt-4">
            Guide to Collecting Trolleys
          </p>
          </>
      )}
    </div>
  );
}
