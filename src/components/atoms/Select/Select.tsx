interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  labelClass?: string;
}

export default function Select({
  label,
  name,
  value,
  onChange,
  placeholder,
  options,
  required = false,
  labelClass = "text-right",
}: SelectFieldProps) {
  return (
    <div className="flex items-center">
      <label
        htmlFor={name}
        className={`w-1/3 pr-4 font-semibold text-black ${labelClass}`}
      >
        {label}
      </label>
      <div className="w-2/3 relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
