import React, { useState } from 'react';
import { MoreVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function WebsiteAnalytics() {
  const { websites, loading, error, sortWebsites } = useWebsites();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    sortWebsites(key as any);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Website Analytics</h2>
          <button className="text-gray-400 hover:text-gray-300">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-400">
                {['Website', 'Risk Level', 'Traffic', 'Revenue'].map((header) => (
                  <th 
                    key={header}
                    className="pb-4 cursor-pointer hover:text-gray-300"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {header}
                      {sortKey === header.toLowerCase() && (
                        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {websites.map((site) => (
                <tr key={site.id} className="text-sm hover:bg-gray-800/50">
                  <td className="py-4">
                    <div className="font-medium text-white">{site.name}</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${site.riskColor}`}>
                      {site.risk}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{site.traffic}</td>
                  <td className="py-4 text-gray-400">{site.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}