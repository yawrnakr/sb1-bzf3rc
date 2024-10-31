import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Website } from '../../types';

interface Props {
  website: Website;
}

export default function WebsiteCard({ website }: Props) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{website.name}</h3>
          <p className="text-sm text-gray-400">{website.url}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Monthly Traffic</p>
            <p className="text-xl font-bold text-white">{website.traffic}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">MFA Score</p>
            <p className="text-xl font-bold text-white">{website.mfaScore}/100</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-200 mb-4">Traffic Sources</h4>
          <div className="space-y-4">
            {website.trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{source.source}</span>
                  <span className="font-medium text-white">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-sage h-2 rounded-full transition-all duration-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-200 mb-4">Monthly Trends</h4>
          <div className="h-40 flex items-end space-x-2">
            {website.monthlyStats.map((stat, index) => (
              <div
                key={index}
                className="flex-1 bg-sage/20 rounded-t transition-all duration-500"
                style={{
                  height: `${(stat.traffic / Math.max(...website.monthlyStats.map(s => s.traffic))) * 100}%`
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            {['Jan', 'Feb', 'Mar'].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Bounce Rate</p>
            <p className="text-lg font-semibold text-white">42.3%</p>
            <div className="flex items-center mt-1 text-sage">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">-2.1%</span>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Avg. Session</p>
            <p className="text-lg font-semibold text-white">2m 45s</p>
            <div className="flex items-center mt-1 text-sage">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">+12.3%</span>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Pages/Session</p>
            <p className="text-lg font-semibold text-white">3.2</p>
            <div className="flex items-center mt-1 text-sage">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">+8.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}