import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => {
    const baseClasses = 'flex h-10 w-full border border-silver bg-white/80 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gunmetal/60 focus:border-midnight focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50';
    
    return (
      <input
        type={type}
        className={`${baseClasses} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };