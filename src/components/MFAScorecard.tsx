import React from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Globe } from 'lucide-react';

export default function MFAScorecard() {
  const stats = [
    {
      title: 'MFA Risk Score',
      value: '72/100',
      change: '+5.2%',
      icon: AlertTriangle,
      color: 'text-sage',
      bg: 'bg-sage/10',
    },
    {
      title: 'Monthly Revenue',
      value: '$24,532',
      change: '+12.3%',
      icon: DollarSign,
      color: 'text-sage',
      bg: 'bg-sage/10',
    },
    {
      title: 'Traffic Quality',
      value: '89%',
      change: '+3.1%',
      icon: TrendingUp,
      color: 'text-sage',
      bg: 'bg-sage/10',
    },
    {
      title: 'Active Websites',
      value: '12',
      change: '+2',
      icon: Globe,
      color: 'text-sage',
      bg: 'bg-sage/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-sage/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-sage">{stat.change}</span>
            <span className="ml-2 text-sm text-gray-400">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}