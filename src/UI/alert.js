import React from 'react';

export const Alert = ({ variant = 'default', className = '', children, ...props }) => {
  const baseClasses = 'rounded-lg border p-4 mb-4 ';
  const variantClasses = variant === 'destructive' 
    ? 'bg-red-100 border-red-400 text-red-700'
    : 'bg-blue-100 border-blue-400 text-blue-700';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} role="alert" {...props}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ className = '', children, ...props }) => {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

