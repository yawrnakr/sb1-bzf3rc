import React from 'react';
import { Website } from '../../types';

interface WebsiteRevenueListProps {
  websites: Website[];
  totalRevenue: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function WebsiteRevenueList({ 
  websites, 
  totalRevenue, 
  sortBy, 
  onSortChange 
}: WebsiteRevenueListProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Revenue by Website</h2>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sage text-sm"
        >
          <option value="revenue">Sort by Revenue</option>
          <option value="growth">Sort by Growth</option>
          <option value="traffic">Sort by Traffic</option>
        </select>
      </div>

      <div className="space-y-6">
        {websites.map((site) => (
          <div key={site.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sage"></div>
                <span className="text-sm font-medium text-gray-200">{site.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-200">{site.revenue}</span>
                <span className="text-xs text-sage bg-sage/10 px-2 py-1 rounded-full">+12.3%</span>
              </div>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sage rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{ 
                    width: `${(parseFloat(site.revenue.replace(/[^0-9.-]+/g, '')) / totalRevenue) * 100}%` 
                  }}
                />
              </div>
              <div className="absolute inset-0">
                {site.monthlyStats.map((stat, index) => {
                  const x = (index / (site.monthlyStats.length - 1)) * 100;
                  return (
                    <div
                      key={index}
                      className="absolute top-0 w-0.5 h-2 bg-sage opacity-30"
                      style={{ left: `${x}%` }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>{site.url}</span>
              <span>{site.traffic} monthly visits</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}