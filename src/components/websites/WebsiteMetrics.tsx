import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Percent } from 'lucide-react';
import { useWebsiteMetrics } from '../../hooks/useWebsiteMetrics';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

interface WebsiteMetricsProps {
  websiteId: string;
}

export default function WebsiteMetrics({ websiteId }: WebsiteMetricsProps) {
  const { metrics, loading, error } = useWebsiteMetrics(websiteId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!metrics) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatChange = (value: number) => {
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value.toFixed(1)}%`;
  };

  const metricsList = [
    {
      label: 'Impressions',
      value: formatNumber(metrics.impressions.total),
      change: formatChange(metrics.impressions.change),
      trend: metrics.impressions.change >= 0 ? 'up' : 'down',
      icon: Users,
      color: metrics.impressions.change >= 0 ? 'text-sage' : 'text-red-500',
      bg: metrics.impressions.change >= 0 ? 'bg-sage/10' : 'bg-red-500/10',
    },
    {
      label: 'Revenue',
      value: formatCurrency(metrics.revenue.total),
      change: formatChange(metrics.revenue.change),
      trend: metrics.revenue.change >= 0 ? 'up' : 'down',
      icon: DollarSign,
      color: metrics.revenue.change >= 0 ? 'text-sage' : 'text-red-500',
      bg: metrics.revenue.change >= 0 ? 'bg-sage/10' : 'bg-red-500/10',
    },
    {
      label: 'CPM',
      value: formatCurrency(metrics.cpm.value),
      change: formatChange(metrics.cpm.change),
      trend: metrics.cpm.change >= 0 ? 'up' : 'down',
      icon: TrendingUp,
      color: metrics.cpm.change >= 0 ? 'text-sage' : 'text-red-500',
      bg: metrics.cpm.change >= 0 ? 'bg-sage/10' : 'bg-red-500/10',
    },
    {
      label: 'Fill Rate',
      value: `${metrics.fillRate.value.toFixed(1)}%`,
      change: formatChange(metrics.fillRate.change),
      trend: metrics.fillRate.change >= 0 ? 'up' : 'down',
      icon: Percent,
      color: metrics.fillRate.change >= 0 ? 'text-sage' : 'text-red-500',
      bg: metrics.fillRate.change >= 0 ? 'bg-sage/10' : 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metricsList.map((metric) => (
        <div
          key={metric.label}
          className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-sage/50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {metric.value}
              </p>
            </div>
            <div className={`${metric.bg} p-3 rounded-lg transition-colors`}>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metric.trend === 'up' ? (
              <TrendingUp className={`h-4 w-4 ${metric.color} mr-1`} />
            ) : (
              <TrendingDown className={`h-4 w-4 ${metric.color} mr-1`} />
            )}
            <span className={`text-sm font-medium ${metric.color}`}>
              {metric.change}
            </span>
            <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}