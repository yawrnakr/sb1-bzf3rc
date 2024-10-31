import React from 'react';
import { Search, Filter, AlertTriangle, Shield, Users } from 'lucide-react';

interface WebsiteFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  riskFilter: string;
  onRiskFilterChange: (risk: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  adminFilter: string;
  onAdminFilterChange: (admin: string) => void;
}

export default function WebsiteFilters({
  searchQuery,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  statusFilter,
  onStatusFilterChange,
  adminFilter,
  onAdminFilterChange,
}: WebsiteFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="relative flex-1 min-w-[240px] max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search websites..."
          className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
      
      <div className="relative min-w-[160px]">
        <select
          value={riskFilter}
          onChange={(e) => onRiskFilterChange(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
        >
          <option value="all">All Risk Levels</option>
          <option value="high">High Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="low">Low Risk</option>
        </select>
        <AlertTriangle className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      <div className="relative min-w-[160px]">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
        <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      <div className="relative min-w-[160px]">
        <select
          value={adminFilter}
          onChange={(e) => onAdminFilterChange(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
        >
          <option value="all">All Users</option>
          <option value="john.smith">John Smith</option>
          <option value="sarah.johnson">Sarah Johnson</option>
          <option value="mike.wilson">Mike Wilson</option>
        </select>
        <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
}