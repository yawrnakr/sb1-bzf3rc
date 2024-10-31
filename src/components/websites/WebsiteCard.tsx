import React from 'react';
import { TrendingUp, AlertTriangle, Check, Clock, User, Globe, DollarSign, Activity } from 'lucide-react';
import { Website } from '../../types';
import { LineChart } from '../charts/LineChart';
import { useWebsiteStatus } from '../../hooks/useWebsiteStatus';

interface WebsiteCardProps {
  website: Website;
  onStatusChange: (id: string, status: string) => void;
  onClick: () => void;
}

export default function WebsiteCard({ website, onStatusChange, onClick }: WebsiteCardProps) {
  const { updateStatus, isUpdating } = useWebsiteStatus({
    onSuccess: () => {
      // Refresh website data if needed
    },
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-sage bg-sage/10 border-sage/20';
      case 'rejected':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    const success = await updateStatus(website.id, newStatus);
    if (success) {
      onStatusChange(website.id, newStatus);
    }
  };

  const revenueData = website.monthlyStats.map((stat, index) => ({
    name: ['Jan', 'Feb', 'Mar'][index],
    value: stat.revenue
  }));

  const trafficData = website.monthlyStats.map((stat, index) => ({
    name: ['Jan', 'Feb', 'Mar'][index],
    value: stat.traffic
  }));

  return (
    <div
      onClick={onClick}
      className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-sage/50 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-sage/5"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-sage mr-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white group-hover:text-sage transition-colors">
              {website.name}
            </h3>
          </div>
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-gray-400 hover:text-sage mt-1 inline-block transition-colors"
          >
            {website.url}
          </a>
          <div className="flex items-center mt-2 space-x-2">
            {website.topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full group-hover:bg-gray-700/50 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            website.risk === 'High' ? 'text-red-500 bg-red-500/10' :
            website.risk === 'Medium' ? 'text-yellow-500 bg-yellow-500/10' :
            'text-sage bg-sage/10'
          } transition-colors`}>
            {website.risk} Risk
          </span>
          <p className="text-sm text-gray-400">ID: {website.gam_id}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4 group-hover:bg-gray-800/70 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-sage mr-2" />
              <p className="text-sm text-gray-400">Traffic</p>
            </div>
            <div className="flex items-center text-sage">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">+12%</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-white mb-2">{website.traffic}</p>
          <div className="h-16">
            <LineChart
              data={trafficData}
              color="#48a77f"
              title="Traffic Trend"
              showTooltip={false}
              showGrid={false}
              curve="monotone"
              strokeWidth={2}
              dotSize={0}
            />
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 group-hover:bg-gray-800/70 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-sage mr-2" />
              <p className="text-sm text-gray-400">Revenue</p>
            </div>
            <div className="flex items-center text-sage">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">+8%</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-white mb-2">{website.revenue}</p>
          <div className="h-16">
            <LineChart
              data={revenueData}
              color="#48a77f"
              title="Revenue Trend"
              showTooltip={false}
              showGrid={false}
              curve="monotone"
              strokeWidth={2}
              dotSize={0}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center text-sm text-gray-400">
          <User className="h-4 w-4 mr-1" />
          {website.addedBy?.name || 'Unknown User'}
          <span className="mx-2">•</span>
          <span className="text-gray-500">{website.addedBy?.role || 'User'}</span>
        </div>
        <div className="relative">
          <select
            value={website.status || 'pending'}
            onChange={handleStatusChange}
            onClick={(e) => e.stopPropagation()}
            disabled={isUpdating[website.id]}
            className={`px-3 py-1 rounded-full text-xs font-medium appearance-none cursor-pointer border ${
              getStatusColor(website.status || 'pending')
            } pr-8 disabled:opacity-50 transition-colors`}
          >
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          {isUpdating[website.id] ? (
            <Clock className="absolute right-2 top-1.5 h-3 w-3 animate-spin" />
          ) : website.status === 'approved' ? (
            <Check className="absolute right-2 top-1.5 h-3 w-3" />
          ) : (
            <AlertTriangle className="absolute right-2 top-1.5 h-3 w-3" />
          )}
        </div>
      </div>

      {website.mfaScore > 70 && (
        <div className="mt-4 flex items-center p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-red-500">High Risk Activity Detected</p>
            <p className="text-xs text-red-400 mt-1">
              MFA Score: {website.mfaScore}/100 - Immediate review recommended
            </p>
          </div>
        </div>
      )}
    </div>
  );
}