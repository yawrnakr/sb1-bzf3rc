import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import OverallTrafficCard from './analytics/OverallTrafficCard';
import WebsiteCard from './analytics/WebsiteCard';

export default function AnalyticsPage() {
  const { websites, loading, error } = useWebsites();
  const [timeRange, setTimeRange] = useState('30d');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const totalTraffic = websites.reduce((sum, site) => {
    const traffic = parseInt(site.traffic.replace(/[^0-9]/g, ''), 10);
    return sum + traffic;
  }, 0);

  // Calculate overall traffic sources
  const overallTrafficSources = websites.reduce((acc: { [key: string]: number }, site) => {
    site.trafficSources.forEach(source => {
      if (!acc[source.source]) {
        acc[source.source] = 0;
      }
      acc[source.source] += source.percentage;
    });
    return acc;
  }, {});

  // Convert to percentages
  const websiteCount = websites.length;
  Object.keys(overallTrafficSources).forEach(key => {
    overallTrafficSources[key] = +(overallTrafficSources[key] / websiteCount).toFixed(1);
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className="h-8 w-8 text-sage mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
            <p className="text-sm text-gray-400">Traffic sources and engagement metrics</p>
          </div>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <OverallTrafficCard
        totalTraffic={totalTraffic}
        trafficSources={overallTrafficSources}
      />

      <div className="grid grid-cols-1 gap-6">
        {websites.map((site) => (
          <WebsiteCard key={site.id} website={site} />
        ))}
      </div>
    </div>
  );
}