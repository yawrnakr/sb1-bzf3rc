import React from 'react';
import { DollarSign, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

interface PublisherMetricsProps {
  networkData: {
    revenue: number;
    activeSites: number;
    riskScore: number;
  };
}

export default function PublisherMetrics({ networkData }: PublisherMetricsProps) {
  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${networkData.revenue.toLocaleString()}`,
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-sage',
      bg: 'bg-sage/10',
    },
    {
      title: 'Active Sites',
      value: networkData.activeSites.toString(),
      change: '+2',
      trend: 'up',
      icon: Globe,
      color: 'text-sage',
      bg: 'bg-sage/10',
    },
    {
      title: 'Risk Score',
      value: `${networkData.riskScore}/100`,
      change: '+5.2%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    }
  ];

  return (
    <>
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-sage/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{metric.title}</p>
              <p className="mt-2 text-3xl font-bold text-white">{metric.value}</p>
            </div>
            <div className={`${metric.bg} p-3 rounded-lg`}>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className={`h-4 w-4 ${metric.color} mr-1`} />
            <span className={`text-sm font-medium ${metric.color}`}>{metric.change}</span>
            <span className="ml-2 text-sm text-gray-400">from last month</span>
          </div>
        </div>
      ))}
    </>
  );
}