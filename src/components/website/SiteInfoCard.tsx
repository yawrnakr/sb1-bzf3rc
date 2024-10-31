import React from 'react';
import { AlertTriangle, Tag, Info } from 'lucide-react';

interface SiteInfoCardProps {
  gamId: string;
  topics: string[];
  mfaScore: number;
}

export default function SiteInfoCard({ gamId, topics, mfaScore }: SiteInfoCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Info className="h-5 w-5 mr-2 text-sage" />
        Site Information
      </h3>
      <div className="space-y-4">
        <div className="group">
          <p className="text-sm text-gray-400 mb-1">Google Ad Manager Network ID</p>
          <div className="relative">
            <p className="text-sm font-medium text-white bg-gray-700/50 px-3 py-2 rounded-lg group-hover:bg-gray-700/70 transition-colors">
              {gamId}
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Topics</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-gray-700/50 text-white rounded-full text-sm hover:bg-gray-700/70 transition-colors cursor-default group"
              >
                <Tag className="h-3 w-3 mr-1 text-sage group-hover:scale-110 transition-transform" />
                {topic}
              </div>
            ))}
          </div>
        </div>

        {mfaScore > 70 && (
          <div className="flex items-start p-4 bg-red-500/10 rounded-lg mt-4 hover:bg-red-500/20 transition-colors group cursor-default">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-medium text-red-500">High Risk Alert</p>
              <p className="text-sm text-red-400 mt-1">
                This website has been flagged for potentially suspicious activity. 
                Immediate review recommended.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}