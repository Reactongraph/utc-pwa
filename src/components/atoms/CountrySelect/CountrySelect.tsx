import { countries } from "@/constants/countries";
import React from "react";

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      className="flex items-center bg-[#222429] gap-1 border-[1px] border-[#4F5866] px-3 py-2 text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {countries.map(({ code, dialCode }, i) => (
        <option key={i} className="p-4" value={dialCode}>
          {code} {dialCode}
        </option>
      ))}
    </select>
  );
}
