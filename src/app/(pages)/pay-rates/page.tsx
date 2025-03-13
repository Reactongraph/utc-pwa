"use client";

import { Card, Header } from "@/components";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { PAY_RATES, PAY_RATES_CATEGORIES } from "@/constants/payRates";

export default function PayRates() {
  const router = useRouter();

  return (
    <>
      <Header title="PAY RATES" />
      <Card>
        {/* Information Text */}
        <p className="text-lg">
          Trolley Collectors are paid in accordance with the cleaning Service
          Award 2020 - For more info, please click on the link to the FairWork
          Website&apos;
        </p>

        {/* Link */}
        <Link
          href="https://www.fwc.gov.au/documents/sites/awardsmodernfouryr/ma000022-pr716564.pdf"
          className="text-blue-500 underline text-lg"
        >
          https://www.fwc.gov.au/documents/sites/awardsmodernfouryr/ma000022-pr716564.pdf
        </Link>

        {/* Pay Slip Info */}
        <p className="text-lg font-medium mt-4">
          All Employees must receive their Pay Slip within one working day of
          Pay Day
        </p>

        {/* Pay Rates Sections */}

        {PAY_RATES_CATEGORIES.map((section) => (
          <div key={section.id} className="mt-6">
            <h2 className="text-xl font-bold mb-2">{section.label}</h2>
            <div className="space-y-4">
              {PAY_RATES.filter((rate) => rate.categoryId === section.id).map(
                (level) => (
                  <button
                    key={level.id}
                    className="w-full border-2 border-gray-400 rounded-full py-3 text-center text-xl"
                    onClick={() => router.push(`/pay-rates/${level.id}`)}
                  >
                    {level.label}
                  </button>
                )
              )}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <p className="text-sm font-medium my-4">
            If you believe there has been a mistake with your payment. Please
            don&apos;t hesitate to conect us below
          </p>

          <button
            onClick={() => router.push("/pay-query")}
            className="w-full border-2 border-gray-400 rounded-full py-3 text-center text-xl"
          >
            SUBMIT PAY QUERY
          </button>
        </div>
      </Card>
    </>
  );
}
