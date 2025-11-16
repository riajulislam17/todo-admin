import React from "react";

interface DatePickerInputProps {
  title?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  className?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  title,
  required = false,
  placeholder,
  onChange,
  value,
  className,
}) => {
  return (
    <div className={`${className ? `${className}` : "mb-6"}`}>
      {title && (
        <label className="block text-gray-700 text-sm font-semibold mb-4">
          {title}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded text-black"
      />
    </div>
  );
};

export default DatePickerInput;
