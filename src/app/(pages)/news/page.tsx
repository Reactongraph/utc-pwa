import { Card, Header } from "@/components";
import React from "react";

export default function News() {
  return (
    <>
      <Header title="News/Updates" />
      <Card>
        {/* News/Update""s Section */}
        <div>
          <div className="">
            <img
              src="/images/news-example.png"
              alt="Listen illustration"
              width="100%"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 flex-1">
            <h2 className="text-3xl font-bold mb-2">
              R U Okay? Day - Thursday 9th September
            </h2>
            <p className="text-gray-600 italic mb-6">September 06, 2021</p>

            <h3 className="text-4xl font-bold mb-6">
              Are they really OK? Ask them today.
            </h3>

            <p className="mb-6">
              Do you know how the people in your world are really going?
            </p>

            <p className="mb-6">
              Life's ups and downs happen to all of us. So chances are someone
              you know might be struggling. Your genuine support can make a
              difference whatever they are facing, big or small.
            </p>

            <p className="mb-6">
              So, don't wait until someone's visibly distressed or in crisis.
              Make a moment meaningful and ask them how they're really going.
            </p>

            <p className="mb-6">
              Are they really OK? Ask them today. Your conversation could change
              a life.
            </p>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="flex justify-center">
            <div className="w-1/2 h-[2px] bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </Card>
    </>
  );
}
