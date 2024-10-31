import React from 'react';
import { Globe } from 'lucide-react';
import { PieChart } from '../charts/PieChart';

interface Props {
  totalTraffic: number;
  trafficSources: Record<string, number>;
}

export default function OverallTrafficCard({ totalTraffic, trafficSources }: Props) {
  const pieData = Object.entries(trafficSources).map(([source, percentage]) => ({
    name: source,
    value: percentage
  }));

  const colors = ['#48a77f', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Globe className="h-6 w-6 text-sage mr-2" />
          <h2 className="text-lg font-bold text-white">Overall Traffic Sources</h2>
        </div>
        <div className="text-sm text-gray-400">
          Total Traffic: {totalTraffic.toLocaleString()}K visits
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.entries(trafficSources).map(([source, percentage], index) => (
            <div key={source}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{source}</span>
                <span className="font-medium text-white">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: colors[index % colors.length]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="h-64">
          <PieChart
            data={pieData}
            colors={colors}
            title="Traffic Distribution"
          />
        </div>
      </div>
    </div>
  );
}