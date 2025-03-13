import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Boundary from "@/components/common/Boundary";
import { RegisterForm } from "@/components";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

async function getSites() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sites`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.status ? data.results : [];
  } catch (error) {
    console.error("Error fetching sites:", error);
    return [];
  }
}
export default async function RegisterPage() {
  const session = await getServerSession();
  const sites = await getSites();
  if (session) {
    redirect("/");
  }

  return (
    <Boundary>
      <RegisterForm sites={sites} />
    </Boundary>
  );
}
