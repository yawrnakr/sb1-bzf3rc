import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center p-4 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}