import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { LineChart } from '../charts/LineChart';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
  bg: string;
  data: Array<{ name: string; value: number }>;
}

export default function MetricCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  color,
  bg,
  data
}: MetricCardProps) {
  const chartColor = color.includes('text-') 
    ? color.replace('text-', '').replace('500', '400')
    : color;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-colors duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {label}
          </p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bg} group-hover:scale-110 transition-transform`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <div className="h-24 group-hover:opacity-80 transition-opacity">
        <LineChart
          data={data}
          color={chartColor}
          title={label}
          showTooltip={true}
          showGrid={false}
          curve="monotone"
          strokeWidth={2}
          dotSize={4}
          activeDotSize={6}
        />
      </div>
      <div className="flex items-center mt-4">
        {trend === 'up' ? (
          <ArrowUpRight className={`h-4 w-4 ${color} mr-1 group-hover:scale-110 transition-transform`} />
        ) : (
          <ArrowDownRight className={`h-4 w-4 ${color} mr-1 group-hover:scale-110 transition-transform`} />
        )}
        <span className={`text-sm font-medium ${color}`}>
          {change}
        </span>
        <span className="text-sm text-gray-400 ml-2 group-hover:text-gray-300 transition-colors">
          vs last month
        </span>
      </div>
    </div>
  );
}