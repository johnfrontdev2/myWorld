import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-midnight text-white hover:bg-obsidian',
      outline: 'border border-silver bg-transparent hover:bg-midnight/5 text-obsidian',
      ghost: 'hover:bg-midnight/5 text-obsidian'
    };
    
    const sizes = {
      default: 'h-10 py-2 px-4 rounded-lg',
      sm: 'h-8 px-3 text-sm rounded-md',
      lg: 'h-12 px-8 rounded-lg',
      icon: 'h-10 w-10 rounded-lg'
    };
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
    
    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };