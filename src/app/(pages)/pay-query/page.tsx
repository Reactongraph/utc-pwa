"use client";

import { Header, Card, Input, Button } from "@/components";

export default function PayQuery() {
  return (
    <>
      <Header title="PAY QUERY" />
      <Card>
        {/* Form Content */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">
              Allow us to assist you with your pay related enquires
            </h2>
            <p className="mb-4">
              Your question goes directly to UTC management. Check the
              Confidentiality box for sensitive issue that you wish to remain
              privately resolved
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Input
                label="Contact Reason"
                name="fullName"
                placeholder="Ask a Question"
                className="w-full p-4 border border-gray-300 rounded"
              />
              <p className="mt-2">
                Your request will be treated as confidential. We need your
                contact information so that we can get in touch.
              </p>
            </div>

            <div>
              <Input
                label="Contact Name"
                name="name"
                type="text"
                placeholder="Add your contact name"
                className="w-full p-4 border border-gray-300 rounded"
              />
            </div>

            <div>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Add your contact email"
                className="w-full p-4 border border-gray-300 rounded"
              />
            </div>

            <div>
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Add your contact phone number"
                className="w-full p-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <Input
                label="Your Question"
                name="question"
                type="text"
                placeholder="Type your question here"
                className="w-full p-4 border border-gray-300 rounded"
              />
            </div>

            <Button className="bg-primary hover:bg-yellow-500 text-black text-xl font-bold px-6 py-2 rounded">
              SUBMIT »
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
