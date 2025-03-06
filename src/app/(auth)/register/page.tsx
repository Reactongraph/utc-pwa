import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Boundary from "@/components/common/Boundary";
import { RegisterForm } from "@/components";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <Boundary>
      <RegisterForm />
    </Boundary>
  );
}
