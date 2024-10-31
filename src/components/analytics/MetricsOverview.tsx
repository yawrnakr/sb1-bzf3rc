import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

interface MetricsOverviewProps {
  websiteId: string;
}

export default function MetricsOverview({ websiteId }: MetricsOverviewProps) {
  const metrics = {
    traffic: {
      daily: 15000,
      trend: 8.3,
    },
    revenue: {
      daily: 2500,
      trend: 12.5,
    },
    performance: {
      bounceRate: 42.3,
      avgSessionDuration: 185,
    },
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="h-4 w-4 text-sage" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Daily Traffic</p>
            <p className="text-2xl font-bold text-white mt-1">
              {formatNumber(metrics.traffic.daily)}
            </p>
          </div>
          <div className="p-3 bg-sage/10 rounded-lg">
            <Users className="h-6 w-6 text-sage" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {getTrendIcon(metrics.traffic.trend)}
          <span className="text-sm font-medium ml-1 text-sage">
            +{metrics.traffic.trend}%
          </span>
          <span className="text-sm text-gray-400 ml-2">vs last period</span>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Daily Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${formatNumber(metrics.revenue.daily)}
            </p>
          </div>
          <div className="p-3 bg-sage/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-sage" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {getTrendIcon(metrics.revenue.trend)}
          <span className="text-sm font-medium ml-1 text-sage">
            +{metrics.revenue.trend}%
          </span>
          <span className="text-sm text-gray-400 ml-2">vs last period</span>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Bounce Rate</p>
            <p className="text-2xl font-bold text-white mt-1">
              {metrics.performance.bounceRate}%
            </p>
          </div>
          <div className="p-3 bg-sage/10 rounded-lg">
            <TrendingDown className="h-6 w-6 text-sage" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {getTrendIcon(-5.2)}
          <span className="text-sm font-medium ml-1 text-sage">-5.2%</span>
          <span className="text-sm text-gray-400 ml-2">vs last period</span>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Avg. Session Duration</p>
            <p className="text-2xl font-bold text-white mt-1">
              {formatDuration(metrics.performance.avgSessionDuration)}
            </p>
          </div>
          <div className="p-3 bg-sage/10 rounded-lg">
            <Clock className="h-6 w-6 text-sage" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {getTrendIcon(8.3)}
          <span className="text-sm font-medium ml-1 text-sage">+8.3%</span>
          <span className="text-sm text-gray-400 ml-2">vs last period</span>
        </div>
      </div>
    </div>
  );
}