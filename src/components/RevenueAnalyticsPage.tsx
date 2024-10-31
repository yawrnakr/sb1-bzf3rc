import React, { useState } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, Calendar, Filter } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import MetricCard from './revenue/MetricCard';
import WebsiteRevenueList from './revenue/WebsiteRevenueList';
import RevenueDistribution from './revenue/RevenueDistribution';
import RevenueTrends from './revenue/RevenueTrends';

export default function RevenueAnalyticsPage() {
  const { websites, loading, error } = useWebsites();
  const [timeRange, setTimeRange] = useState('30d');
  const [sortBy, setSortBy] = useState('revenue');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const totalRevenue = websites.reduce((sum, site) => {
    const revenue = parseFloat(site.revenue.replace(/[^0-9.-]+/g, ''));
    return sum + revenue;
  }, 0);

  const averageRevenue = totalRevenue / websites.length;
  const topPerformer = websites.reduce((max, site) => {
    const revenue = parseFloat(site.revenue.replace(/[^0-9.-]+/g, ''));
    return revenue > parseFloat(max.revenue.replace(/[^0-9.-]+/g, '')) ? site : max;
  }, websites[0]);

  const metrics = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Average Revenue per Site',
      value: `$${Math.round(averageRevenue).toLocaleString()}`,
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Top Performing Site',
      value: topPerformer.name,
      subValue: topPerformer.revenue,
      change: '+15.2%',
      trend: 'up',
      icon: ArrowUpRight,
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-sage mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-white">Revenue Analytics</h1>
            <p className="text-sm text-gray-400">Track and analyze your revenue performance</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-gray-900 border border-gray-700 text-gray-200 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-sage text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <WebsiteRevenueList 
        websites={websites} 
        totalRevenue={totalRevenue} 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueDistribution websites={websites} totalRevenue={totalRevenue} />
        <RevenueTrends />
      </div>
    </div>
  );
}