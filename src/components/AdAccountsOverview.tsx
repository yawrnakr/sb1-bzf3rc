import React, { useState } from 'react';
import { MoreVertical, Filter } from 'lucide-react';
import { useAdAccounts } from '../hooks/useAdAccounts';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { AdAccount } from '../types';

export default function AdAccountsOverview() {
  const { accounts, loading, error, filterAccounts } = useAdAccounts();
  const [statusFilter, setStatusFilter] = useState<AdAccount['status'] | 'All'>('All');

  const filteredAccounts = statusFilter === 'All' 
    ? accounts 
    : filterAccounts(statusFilter);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Ad Accounts Overview</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as AdAccount['status'] | 'All')}
                className="appearance-none bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Review">Review</option>
                <option value="Suspended">Suspended</option>
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="text-gray-400 hover:text-gray-300">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-400">
                <th className="pb-4">Account</th>
                <th className="pb-4">Network ID</th>
                <th className="pb-4">Last Payment</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="text-sm hover:bg-gray-800/50">
                  <td className="py-4">
                    <div className="font-medium text-white">{account.name}</div>
                  </td>
                  <td className="py-4 text-gray-400">{account.id}</td>
                  <td className="py-4 text-gray-400">{account.lastPayment}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${account.statusColor}`}>
                      {account.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}