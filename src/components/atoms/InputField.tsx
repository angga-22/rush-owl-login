// input-field.tsx
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, className, ...props }) => {
  return (
    <div className="relative flex flex-col w-full">
      <input
        className={`peer w-full focus:shadow-primary-outline   text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid  bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500  focus:outline-none ${className}`}
        {...props}
      />
      {label && (
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;
