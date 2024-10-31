import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export default function MetricCard({ label, value, subValue, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subValue && (
            <p className="text-sm text-gray-400 mt-1">{subValue}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-sage/10' : 'bg-red-500/10'
        }`}>
          <Icon className={`h-6 w-6 ${
            trend === 'up' ? 'text-sage' : 'text-red-500'
          }`} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-sage' : 'text-red-500'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-400 ml-2">vs previous period</span>
      </div>
    </div>
  );
}