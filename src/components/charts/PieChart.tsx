import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface PieChartProps {
  data: DataPoint[];
  colors: string[];
  title: string;
}

export function PieChart({ data, colors, title }: PieChartProps) {
  const theme = {
    backgroundColor: '#111827',
    textColor: '#9CA3AF',
    tooltipBackground: '#1F2937',
    tooltipBorder: '#374151'
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => entry.name}
            labelLine={true}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
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
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}