import type React from "react";
import { Metadata } from "next";
import {
  HelpCircle,
  AlertTriangle,
  DollarSign,
  Newspaper,
  FileText,
  UserCheck,
} from "lucide-react";
import { NavCard } from "@/components";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to UTC",
};

const navItems = [
  {
    icon: <HelpCircle className="w-8 h-8 text-teal-600" />,
    title: "CONTACT US",
    href: "/contact-us",
  },
  {
    icon: <Newspaper className="w-8 h-8 text-teal-600" />,
    title: "NEWS / UPDATES",
    href: "/news",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-teal-600" />,
    title: "REPORT INCIDENT",
    href: "/report-incident",
  },
  {
    icon: <FileText className="w-8 h-8 text-teal-600" />,
    title: "INDUCTION",
    href: "/induction",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-teal-600" />,
    title: "PAY RATES",
    href: "/pay-rates",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-teal-600" />,
    title: "EMPLOYEE DETAILS",
    href: "/employee-details",
  },
];

const rulesContent = [
  {
    title: "1 - UNIFORMS",
    description:
      "All Team Members are to work in full UTC uniform - UTC shirt, hat, black pants, black shoes, bumbag, name tag, lanyard and induction details. Dont forget to wear your smile!",
  },
  {
    title: "2 - TEN TROLLEYS",
    description:
      "Never push more than 10 trolleys at any one time. Push less trolleys when traffic or site conditions are dangerous.",
  },
  {
    title: "3 - CLEAN UP",
    description:
      "Remove rubbish from trolleys and internal/external trolley bays. Clean car parks of trolleys at the end of your shift. Lock up trolleys at night at applicable sites.",
  },
  {
    title: "4 - SAFETY",
    description:
      "Work consciously and safely at all times. Keeping yourself, your team, store staff, customers and general public safe is vital. Work with care.",
  },
  {
    title: "5 - ROSTERS",
    description:
      "Always work to the site coverage hours provided by UTC. Do not work more or less hours than you are paid for. Sign in/out for all hours worked for each shift.",
  },
  {
    title: "6 - FULL BAYS",
    description:
      "Aim to keep internal trolley bays at least 80% full at all times.",
  },
  {
    title: "7 - STREET RUNS",
    description:
      "Make sure thorough street runs are performed by your team. Less trolleys on the streets = more trolleys in the store.",
  },
  {
    title: "8 - VEHICLE AND TRAILER SITES",
    description:
      "Check that the vehicle and trailer are safe to use before you start your shift. Complete the Vehicle and trailer checklist daily Do not operate a vehicle if in doubt.",
  },
  {
    title: "9 - INDUCTIONS",
    description:
      "All Team Members must complete both site specific and UTC online induction and training requirements prior to commencing employment. Induction cards must be carried at all times in lanyards provided.",
  },
  {
    title: "10 - BE PROUD",
    description:
      "Smile and wear your uniform with pride. Make a difference everyday! Your efforts to be courteous, considerate and helpful ensure that UTC continue to set the standards for our industry. BE HAPPY - You are an important and valued part of a great team.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Navigation Cards */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {navItems.map((item, index) => (
          <NavCard
            key={index}
            icon={item.icon}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>

      {/* 10 Golden Rules */}
      <div className="mt-4 px-4 flex justify-center">
        <div className="flex items-center">
          <div className="text-5xl font-black">10</div>
          <div className="ml-1">
            <div className="text-xl font-black">GOLDEN</div>
            <div className="text-xl font-black">RULES</div>
          </div>
          <div className="ml-2 flex items-center">
            <Image
              src="/ic_launcher.png"
              alt="UTC Logo"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      {/* Rules Content */}
      <div className="my-4 bg-cyan-300 p-4 flex-grow">
        {rulesContent.map((rule, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{rule.title}</h2>
            <p>{rule.description}</p>
          </div>
        ))}
        {/* Bottom */}
        <div className="flex justify-center h-1 mb-2 text-lg">
          UTC - Setting Industry Standards
        </div>
      </div>
    </div>
  );
}
