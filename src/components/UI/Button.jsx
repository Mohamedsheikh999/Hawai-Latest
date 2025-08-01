import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props 
}) => {
  const { theme } = useTheme(); // Get current theme

  const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: theme === 'dark' 
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
      : 'bg-green-600 hover:bg-green-500 text-white',
    secondary: theme === 'dark'
      ? 'bg-gray-700 hover:bg-gray-600 text-white'
      : 'bg-white hover:bg-gray-100 text-green-600 border border-green-600',
    ghost: theme === 'dark'
      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
  };
  
  return (
    <Component
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;