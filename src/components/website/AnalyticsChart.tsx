import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
}

interface AnalyticsChartProps {
  data: DataPoint[];
  color: string;
  title: string;
  metric: string;
  change: {
    value: string;
    trend: 'up' | 'down';
  };
}

export default function AnalyticsChart({ data, color, title, metric, change }: AnalyticsChartProps) {
  const theme = {
    backgroundColor: '#111827',
    textColor: '#9CA3AF',
    gridColor: '#374151',
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-sm text-gray-400">
            {metric}: <span className="text-white font-medium">
              {metric === 'Revenue' ? '$' : ''}{payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center px-2 py-1 rounded-full text-sm ${
            change.trend === 'up' ? 'text-sage bg-sage/10' : 'text-red-500 bg-red-500/10'
          }`}>
            {change.trend === 'up' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {change.value}
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} vertical={false} />
            <XAxis
              dataKey="name"
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <YAxis
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}