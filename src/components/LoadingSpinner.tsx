import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-sage border-t-transparent"></div>
    </div>
  );
}