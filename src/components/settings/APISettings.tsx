import React, { useState } from 'react';
import { Key, RefreshCcw, Check, AlertCircle } from 'lucide-react';

interface APICredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export default function APISettings() {
  const [credentials, setCredentials] = useState<APICredentials>({
    clientId: '',
    clientSecret: '',
    refreshToken: '',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
    } catch (err) {
      setError('Failed to connect to Google Ad Manager API. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshConnection = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">API Configuration</h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure your Google Ad Manager API credentials
          </p>
        </div>
        {isConnected && (
          <div className="flex items-center">
            <span className="flex items-center px-3 py-1 text-sm text-sage bg-sage/10 rounded-full">
              <Check className="h-4 w-4 mr-1" />
              Connected
            </span>
            <button
              onClick={handleRefreshConnection}
              disabled={isLoading}
              className="ml-3 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleConnect} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Client ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={credentials.clientId}
              onChange={(e) => setCredentials(prev => ({ ...prev, clientId: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              placeholder="Enter your client ID"
            />
            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Client Secret
          </label>
          <div className="relative">
            <input
              type="password"
              value={credentials.clientSecret}
              onChange={(e) => setCredentials(prev => ({ ...prev, clientSecret: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              placeholder="Enter your client secret"
            />
            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Refresh Token
          </label>
          <div className="relative">
            <input
              type="password"
              value={credentials.refreshToken}
              onChange={(e) => setCredentials(prev => ({ ...prev, refreshToken: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              placeholder="Enter your refresh token"
            />
            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || isConnected}
            className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Connecting...
              </div>
            ) : isConnected ? (
              'Connected'
            ) : (
              'Connect API'
            )}
          </button>
        </div>
      </form>

      {isConnected && (
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-4">API Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rate Limit</span>
              <span className="text-white">10,000 requests/day</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Requests Today</span>
              <span className="text-white">1,234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Last Sync</span>
              <span className="text-white">5 minutes ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}