import React from 'react';
import { DollarSign, TrendingUp, MoreVertical } from 'lucide-react';
import { LineChart } from './charts/LineChart';

export default function RevenueChart() {
  const metrics = [
    { label: 'Total Revenue', value: '$142,384', change: '+12.3%', trend: 'up' },
    { label: 'Average CPM', value: '$4.28', change: '+8.1%', trend: 'up' },
    { label: 'Invalid Traffic', value: '2.4%', change: '-1.2%', trend: 'down' },
  ];

  const monthlyData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 68000 },
    { name: 'Mar', value: 82000 },
    { name: 'Apr', value: 71000 },
    { name: 'May', value: 43000 },
    { name: 'Jun', value: 60000 },
    { name: 'Jul', value: 50000 },
    { name: 'Aug', value: 91000 },
    { name: 'Sep', value: 52000 },
    { name: 'Oct', value: 63000 },
    { name: 'Nov', value: 58000 },
    { name: 'Dec', value: 71000 },
  ];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-sage mr-2" />
            <h2 className="text-lg font-bold text-white">Revenue Analytics</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-300">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-xl font-bold text-white mt-1">{metric.value}</p>
              <div className={`flex items-center mt-2 ${
                metric.trend === 'up' ? 'text-sage' : 'text-red-500'
              }`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-80">
          <LineChart
            data={monthlyData}
            color="#48a77f"
            title="Monthly Revenue"
            yAxisLabel="Revenue ($)"
          />
        </div>
      </div>
    </div>
  );
}