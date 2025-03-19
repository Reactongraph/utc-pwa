"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useSession } from "next-auth/react";

const QuestionnaireFrame = dynamic(
  () =>
    Promise.resolve(({ url }: { url: string }) => (
      <iframe
        src={url}
        style={{
          border: "none",
          width: "100%",
          minHeight: "500px",
          overflow: "hidden",
        }}
        title="Induction Questionnaire"
        onLoad={(e) => {
          try {
            console.log("onLoad Ifram");
            const iframe = e.target as HTMLIFrameElement;
            if (iframe.contentWindow && iframe.contentDocument) {
              // Check if we have access to the document (same-origin)
              const style = document.createElement("style");
              style.textContent = `
                body {
                  background-color: #f3f4f6 !important;
                  overflow: hidden !important;
                }
              `;
              iframe.contentDocument.head.appendChild(style);
              
              // Alternative approach - applying styles directly to body
              if (iframe.contentDocument.body) {
                iframe.contentDocument.body.style.backgroundColor = "#f3f4f6";
                iframe.contentDocument.body.style.overflow = "hidden";
              }
              
              console.log("Styles applied to iframe");
            } else {
              console.log("Could not access iframe content - likely a cross-origin restriction");
            }
          } catch (error) {
            console.error("Error applying styles to iframe:", error);
          }
        }}
      />
    )),
  { ssr: false }
);

export default function InductionTest() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (!session?.user?.email) {
    return <div>User email not available</div>;
  }

  return (
    <QuestionnaireFrame url={`${process.env.NEXT_PUBLIC_API_URL}/questionnaire/${session.user.email}`} />
  );
}
