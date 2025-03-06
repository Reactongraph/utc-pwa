import { FileText } from "lucide-react";
import React from "react";

interface InductionLink {
  title: string;
  description?: string;
  pdfUrl: string;
}

const INDUCTION_LINKS: InductionLink[] = [
  {
    title: "Deed Of Compliance",
    description:
      "This shows the deed of compliance pdf as per ombudsman and state regulations that apply on victoria",
    pdfUrl: "/pdf/Deed-of-Compliance.pdf",
  },
  {
    title: "Speak Up",
    description: "Document that describes our speak up policy",
    pdfUrl: "/pdf/Speak-Up-Single-page.pdf",
  },
  {
    title: "Let's Talk",
    pdfUrl: "/pdf/Let_s_Talk_Poster.pdf",
  },
];

export default function InductionLinks() {
  return (
    <div className="p-4">
      {INDUCTION_LINKS.map((link, index) => (
        <React.Fragment key={link.title}>
          <div className="mb-6">
            <h2 className="text-3xl font-medium mb-4 text-amber-500">
              {link.title}
            </h2>
            <button 
              className="w-full border-2 border-gray-300 rounded-full p-3 flex items-center justify-center gap-2 mb-4"
              onClick={() => window.open(link.pdfUrl, '_blank')}
            >
              <FileText className="h-5 w-5 text-teal-500" />
              <span className="font-bold">DOWNLOAD AND VIEW PDF</span>
            </button>
            {link.description && (
              <p className="text-gray-700">{link.description}</p>
            )}
          </div>
          {index < INDUCTION_LINKS.length - 1 && (
            <hr className="border-t-2 border-gray-300 my-6" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
