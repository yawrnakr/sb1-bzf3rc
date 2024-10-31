import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color: string;
  title: string;
  yAxisLabel?: string;
  showTooltip?: boolean;
  showGrid?: boolean;
  curve?: 'linear' | 'monotone';
  strokeWidth?: number;
  dotSize?: number;
  activeDotSize?: number;
}

export function LineChart({
  data,
  color,
  title,
  yAxisLabel,
  showTooltip = true,
  showGrid = true,
  curve = 'linear',
  strokeWidth = 1,
  dotSize = 3,
  activeDotSize = 5
}: LineChartProps) {
  const theme = {
    backgroundColor: '#111827',
    textColor: '#9CA3AF',
    gridColor: '#374151',
    tooltipBackground: '#1F2937',
    tooltipBorder: '#374151'
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2">
          <p className="text-xs font-medium text-white">
            {formatValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.gridColor}
              vertical={false}
            />
          )}
          <XAxis
            dataKey="name"
            hide={true}
          />
          <YAxis
            hide={true}
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: theme.gridColor }}
            />
          )}
          <Line
            type={curve}
            dataKey="value"
            stroke={color}
            strokeWidth={strokeWidth}
            dot={{ r: dotSize, fill: color, strokeWidth: 0 }}
            activeDot={{
              r: activeDotSize,
              fill: color,
              strokeWidth: 0
            }}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}