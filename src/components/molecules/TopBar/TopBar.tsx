import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface TopbarProps {
  version: string;
  backButton?: boolean;
}

export const Topbar = ({
  version = "2.2",
  backButton = false,
}: TopbarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-gray-200 px-4 shadow-sm">
      <div className="flex-1 items-center">
        {backButton && (
          <div onClick={() => window.history.back()}>
            <ChevronLeft className="text-gray-500 h-6 w-6 cursor-pointer" />
          </div>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image src="/utc_navigationbar_logo.png" alt="UTC Logo" width={150} height={150} />
      </div>
      <div className="flex text-xl flex-1 font-medium justify-end">
        <span className="text-red-600">V</span>
        <span className="text-gray-800">ersion {version}</span>
      </div>
    </div>
  );
};
