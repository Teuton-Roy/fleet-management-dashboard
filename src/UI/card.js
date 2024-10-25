import React from 'react';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-4 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};