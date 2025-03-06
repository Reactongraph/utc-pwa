"use client";

import { Topbar } from "@/components";
import { usePathname } from "next/navigation";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-[100vh] flex bg-[url('/images/main_menu_background.png')] bg-contain bg-center bg-no-repeat">
      <Topbar version="2.2" backButton={pathname !== "/"} />
      <div className="mt-16 w-full">{children}</div>
    </div>
  );
}
