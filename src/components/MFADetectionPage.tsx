import React, { useState } from 'react';
import { AlertTriangle, Shield, Info, Search, Filter, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function MFADetectionPage() {
  const { websites, loading, error } = useWebsites();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const highRiskSites = websites.filter(site => site.mfaScore > 50);
  
  const filteredSites = highRiskSites
    .filter(site => 
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.url.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(site => 
      riskFilter === 'all' ? true : site.risk.toLowerCase() === riskFilter.toLowerCase()
    );

  const getMetricTrend = (value: number) => {
    return value > 0 
      ? { color: 'text-red-500', icon: TrendingUp, bg: 'bg-red-500/10' }
      : { color: 'text-sage', icon: TrendingUp, bg: 'bg-sage/10' };
  };

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white">MFA Detection</h1>
              <p className="text-sm text-gray-400">High-risk websites requiring immediate attention</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`flex items-center px-4 py-2 rounded-lg bg-red-500/10`}>
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-red-500 font-medium">
                {highRiskSites.length} High-risk sites detected
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center space-x-3 text-white mb-2">
              <ArrowUpRight className="h-5 w-5" />
              <h3 className="font-semibold">Highest Risk Score</h3>
            </div>
            <p className="text-3xl font-bold text-red-500">
              {Math.max(...websites.map(site => site.mfaScore))}/100
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center space-x-3 text-white mb-2">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-semibold">Average Risk Score</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-500">
              {Math.round(websites.reduce((acc, site) => acc + site.mfaScore, 0) / websites.length)}/100
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center space-x-3 text-white mb-2">
              <Shield className="h-5 w-5" />
              <h3 className="font-semibold">Sites Needing Action</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {highRiskSites.length}/{websites.length}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search high-risk websites..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <div className="relative">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredSites.map((site) => {
            const trendMetric = getMetricTrend(12);
            const revenueTrendMetric = getMetricTrend(8);
            
            return (
              <div
                key={site.id}
                className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-red-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{site.name}</h3>
                    <p className="text-sm text-gray-400">{site.url}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Risk Score</p>
                      <p className="text-2xl font-bold text-red-500">{site.mfaScore}/100</p>
                    </div>
                    <Shield className="h-10 w-10 text-red-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Monthly Traffic</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">{site.traffic}</p>
                      <div className={`flex items-center ${trendMetric.color}`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-xs">12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Revenue Impact</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">{site.revenue}</p>
                      <div className={`flex items-center ${revenueTrendMetric.color}`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-xs">8%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Risk Level</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      site.risk === 'High' ? 'text-red-500 bg-red-500/10' :
                      site.risk === 'Medium' ? 'text-yellow-500 bg-yellow-500/10' :
                      'text-sage bg-sage/10'
                    }`}>
                      {site.risk} Risk
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Traffic Sources</h4>
                  <div className="space-y-3">
                    {site.trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm text-gray-400 w-24">{source.source}</span>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-gray-800 rounded-full">
                            <div
                              className="h-2 bg-red-500 rounded-full transition-all duration-500"
                              style={{ width: `${source.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {source.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center p-4 bg-red-500/10 rounded-lg">
                  <Info className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-red-500">Recommended Actions</p>
                    <p className="text-sm text-red-400 mt-1">
                      Review traffic patterns and implement additional verification measures
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}