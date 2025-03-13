interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (name: string, value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  inline?: boolean;
  rows?: number;
  error?: string | undefined | boolean;
}

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  className,
  inline = false,
  rows = 1,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className={`flex ${inline ? "flex-row items-center" : "flex-col"}`}>
      {label &&
        (inline ? (
          <label
            htmlFor={name}
            className="w-1/3 text-right pr-4 font-semibold text-black"
          >
            {label}
          </label>
        ) : (
          <label htmlFor={name} className="flex-1 text-xl font-bold block mb-2">
            {label}
          </label>
        ))}
      <div>
        {rows === 1 ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange?.(name, e.target.value)}
            required={required}
            placeholder={placeholder}
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
            {...props}
          />
        ) : (
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange?.(name, e.target.value)}
            required={required}
            placeholder={placeholder}
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
            rows={rows}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
