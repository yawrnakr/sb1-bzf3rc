import React, { useState } from 'react';
import { X, Globe, DollarSign, Users, AlertTriangle, ExternalLink, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { Website } from '../types';
import MetricCard from './website/MetricCard';
import TrafficSourceCard from './website/TrafficSourceCard';
import SiteInfoCard from './website/SiteInfoCard';
import AnalyticsChart from './website/AnalyticsChart';

interface WebsiteDetailsProps {
  website: Website;
  onClose: () => void;
}

export default function WebsiteDetails({ website, onClose }: WebsiteDetailsProps) {
  const [showDetails, setShowDetails] = useState(true);

  const metrics = [
    {
      label: 'Monthly Traffic',
      value: website.traffic,
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      data: website.monthlyStats.map((stat, index) => ({
        name: ['Jan', 'Feb', 'Mar'][index],
        value: stat.traffic
      }))
    },
    {
      label: 'Revenue',
      value: website.revenue,
      change: '+12.3%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-sage',
      bg: 'bg-sage/10',
      data: website.monthlyStats.map((stat, index) => ({
        name: ['Jan', 'Feb', 'Mar'][index],
        value: stat.revenue
      }))
    },
    {
      label: 'MFA Score',
      value: `${website.mfaScore}/100`,
      change: '-2.1%',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: website.mfaScore > 70 ? 'text-red-500' : website.mfaScore > 40 ? 'text-yellow-500' : 'text-sage',
      bg: website.mfaScore > 70 ? 'bg-red-500/10' : website.mfaScore > 40 ? 'bg-yellow-500/10' : 'bg-sage/10',
      data: website.monthlyStats.map((stat, index) => ({
        name: ['Jan', 'Feb', 'Mar'][index],
        value: stat.mfaScore
      }))
    }
  ];

  // Extended monthly data for charts
  const monthlyTrafficData = [
    { name: 'Jan', value: 95000 },
    { name: 'Feb', value: 102000 },
    { name: 'Mar', value: 98000 },
    { name: 'Apr', value: 107000 },
    { name: 'May', value: 115000 },
    { name: 'Jun', value: 125000 },
  ];

  const monthlyRevenueData = [
    { name: 'Jan', value: 10200 },
    { name: 'Feb', value: 11500 },
    { name: 'Mar', value: 10800 },
    { name: 'Apr', value: 12300 },
    { name: 'May', value: 13100 },
    { name: 'Jun', value: 12420 },
  ];

  const monthlyMFAData = [
    { name: 'Jan', value: 68 },
    { name: 'Feb', value: 71 },
    { name: 'Mar', value: 69 },
    { name: 'Apr', value: 73 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 72 },
  ];

  return (
    <div 
      className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm overflow-y-auto h-full w-full z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative min-h-screen md:flex md:items-center md:justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl w-full max-w-6xl transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${website.mfaScore > 70 ? 'bg-red-500/10' : 'bg-sage/10'}`}>
                <Globe className={`h-6 w-6 ${website.mfaScore > 70 ? 'text-red-500' : 'text-sage'}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group">
                  {website.name}
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-gray-400 hover:text-sage inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {website.url}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </h2>
                <div className="flex items-center mt-2 space-x-2">
                  {website.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                aria-label={showDetails ? 'Hide details' : 'Show details'}
              >
                {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${showDetails ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={monthlyTrafficData}
                  color="#3B82F6"
                  title="Traffic Analytics"
                  metric="Visits"
                  change={{ value: '+8.2%', trend: 'up' }}
                />
                <AnalyticsChart
                  data={monthlyRevenueData}
                  color="#48a77f"
                  title="Revenue Analytics"
                  metric="Revenue"
                  change={{ value: '+12.3%', trend: 'up' }}
                />
              </div>

              {/* MFA Score Chart */}
              <AnalyticsChart
                data={monthlyMFAData}
                color={website.mfaScore > 70 ? '#EF4444' : '#48a77f'}
                title="MFA Score Trend"
                metric="Score"
                change={{ value: '-2.1%', trend: 'down' }}
              />

              {/* Traffic Sources and Site Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrafficSourceCard sources={website.trafficSources} />
                <SiteInfoCard 
                  gamId={website.gam_id}
                  topics={website.topics}
                  mfaScore={website.mfaScore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}