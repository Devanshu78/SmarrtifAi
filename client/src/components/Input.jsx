import clsx from "clsx";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    { className, type = "text", name, value, onChange, placeholder, ...props },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all duration-200 placeholder:text-gray-400",
          className,
        )}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
