"use client";

import { Header, Card, PayQueryForm } from "@/components";

export default function PayQuery() {
  return (
    <>
      <Header title="PAY QUERY" />
      <Card>
        <PayQueryForm />
      </Card>
    </>
  );
}
