// button.tsx
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={` inline-block w-full my-6 px-16 py-3.5 font-bold leading-normal text-lg text-center text-white align-middle transition-all bg-orange-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
