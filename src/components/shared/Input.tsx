import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  labelClassName?: string;
  conClassName?: string;
  error?: string;
  restrictFutureDate?: boolean;
  restrictPastDate?: boolean;
}

const Input = ({
  type = "text",
  placeholder = "",
  className = "",
  labelClassName = "",
  label = "",
  value,
  disabled = false,
  required = false,
  readOnly = false,
  error,
  conClassName = "",
  restrictFutureDate = false,
  restrictPastDate = false,
  onChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col ${conClassName}`}>
      {label && (
        <label
          htmlFor={props.id}
          className={`block font-medium md:text-sm ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
            error
              ? "border-red-500 ring-red-300"
              : "border-gray-300 focus:ring-gray-300"
          } ${className}`}
          onChange={onChange}
          {...(type === "date" &&
            restrictFutureDate && { max: getTodayDate() })}
          {...(type === "date" && restrictPastDate && { min: getTodayDate() })}
          {...props}
        />

        {type === "password" && (
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>

      {error && <p className="text-sm text-red-500 italic mt-1">{error}</p>}
    </div>
  );
};

export default Input;
