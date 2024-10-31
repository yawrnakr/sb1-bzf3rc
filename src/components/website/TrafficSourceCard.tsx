import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TrafficSource {
  source: string;
  percentage: number;
}

interface TrafficSourceCardProps {
  sources: TrafficSource[];
}

export default function TrafficSourceCard({ sources }: TrafficSourceCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-sage" />
        Traffic Sources
      </h3>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index} className="group">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {source.source}
              </span>
              <span className="font-medium text-white">
                {source.percentage}%
              </span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-sage rounded-full transition-all duration-500 group-hover:bg-sage/80"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}