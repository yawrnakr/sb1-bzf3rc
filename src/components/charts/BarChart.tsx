import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  color: string;
  title: string;
  yAxisLabel?: string;
}

export function BarChart({ data, color, title, yAxisLabel }: BarChartProps) {
  const theme = {
    backgroundColor: '#111827',
    textColor: '#9CA3AF',
    gridColor: '#374151',
    tooltipBackground: '#1F2937',
    tooltipBorder: '#374151'
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis
            dataKey="name"
            stroke={theme.textColor}
            tick={{ fill: theme.textColor }}
          />
          <YAxis
            stroke={theme.textColor}
            tick={{ fill: theme.textColor }}
            label={yAxisLabel ? {
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              style: { fill: theme.textColor }
            } : undefined}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.tooltipBackground,
              border: `1px solid ${theme.tooltipBorder}`,
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: theme.textColor }}
            itemStyle={{ color: theme.textColor }}
          />
          <Legend
            wrapperStyle={{ color: theme.textColor }}
          />
          <Bar
            dataKey="value"
            name={title}
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}