"use client";

import { Card, Header } from "@/components";
import dynamic from "next/dynamic";
import React from "react";

const NewsletterFrame = dynamic(
  () =>
    Promise.resolve(({ url }: { url: string }) => (
      <iframe
        src={url}
        width="100%"
        height="100%"
        title="Newsletter"
        style={{
          border: "none",
          width: "100%",
          minHeight: "800px",
          overflow: "hidden",
        }}
        onLoad={(e) => {
          const iframe = e.target as HTMLIFrameElement;
          if (iframe.contentWindow) {
            const style = document.createElement("style");
            style.textContent = `
            img {
              width: 100% !important;
              height: auto !important;
            }
            body {
              margin: 0;
              overflow: hidden;
            }
          `;
            iframe.contentDocument?.head.appendChild(style);

            // Adjust iframe height to match content
            const resizeIframe = () => {
              if (iframe.contentDocument?.body) {
                const height = iframe.contentDocument.body.scrollHeight;
                iframe.style.height = `${height}px`;
                if (iframe.parentElement) {
                  iframe.parentElement.style.height = `${height}px`;
                }
              }
            };

            resizeIframe();
            // Handle dynamic content changes
            const observer = new MutationObserver(resizeIframe);
            observer.observe(iframe.contentDocument?.body!, {
              subtree: true,
              childList: true,
            });
          }
        }}
      />
    )),
  { ssr: false }
);

export default function News() {
  return (
    <>
      <Header title="News/Updates" />
      <Card>
        <div className="w-full" style={{ minHeight: "800px" }}>
          <NewsletterFrame url="/api/newsletter" />
        </div>
      </Card>
    </>
  );
}
