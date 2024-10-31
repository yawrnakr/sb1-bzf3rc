import React, { useState } from 'react';
import { Shield, User, Bell, Lock, Settings as SettingsIcon, Key, Users } from 'lucide-react';
import SettingsProfile from './SettingsProfile';
import SettingsSecurity from './SettingsSecurity';
import SettingsNotifications from './SettingsNotifications';
import APISettings from './APISettings';
import UserManagement from './UserManagement';

interface SettingsPageProps {
  onSignOut: () => void;
}

type SettingsTab = 'profile' | 'security' | 'notifications' | 'api' | 'users';

export default function SettingsPage({ onSignOut }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Settings', icon: Key },
    { id: 'users', label: 'User Management', icon: Users },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <SettingsProfile />;
      case 'security':
        return <SettingsSecurity />;
      case 'notifications':
        return <SettingsNotifications />;
      case 'api':
        return <APISettings />;
      case 'users':
        return <UserManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <Shield className="h-8 w-8 text-sage mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-gray-400">Manage your account and system preferences</p>
        </div>
      </div>

      <div className="flex space-x-6">
        <div className="w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-sage bg-sage/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={onSignOut}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <SettingsIcon className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-4xl">
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}