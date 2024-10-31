import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function RevenueTrends() {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 className="text-lg font-bold text-white mb-6">Revenue Trends</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium text-gray-200">Highest Revenue Day</p>
            <p className="text-gray-400">March 15, 2024</p>
          </div>
          <p className="font-bold text-white">$12,458</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium text-gray-200">Average Daily Revenue</p>
            <p className="text-gray-400">Last 30 days</p>
          </div>
          <p className="font-bold text-white">$8,234</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium text-gray-200">Revenue Growth</p>
            <p className="text-gray-400">Month over Month</p>
          </div>
          <div className="flex items-center">
            <ArrowUpRight className="h-4 w-4 text-sage mr-1" />
            <p className="font-bold text-sage">+15.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
}