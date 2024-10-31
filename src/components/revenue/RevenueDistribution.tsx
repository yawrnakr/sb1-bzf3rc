import React from 'react';
import { Website } from '../../types';

interface RevenueDistributionProps {
  websites: Website[];
  totalRevenue: number;
}

export default function RevenueDistribution({ websites, totalRevenue }: RevenueDistributionProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 className="text-lg font-bold text-white mb-6">Revenue Distribution</h2>
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {websites.map((site, index) => {
            const height = (parseFloat(site.revenue.replace(/[^0-9.-]+/g, '')) / totalRevenue) * 100;
            return (
              <div key={index} className="w-8 group">
                <div
                  className="bg-sage rounded-t transition-all duration-500 group-hover:opacity-80"
                  style={{ height: `${height}%` }}
                >
                  <div className="invisible group-hover:visible absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {site.revenue}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-400">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}