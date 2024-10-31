import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertCircle, Check } from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  icon: any;
}

export default function SettingsNotifications() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'security',
      title: 'Security Alerts',
      description: 'Get notified when suspicious activity is detected',
      email: true,
      push: true,
      icon: Bell,
    },
    {
      id: 'updates',
      title: 'System Updates',
      description: 'Receive updates about system maintenance and new features',
      email: true,
      push: false,
      icon: Mail,
    },
    {
      id: 'reports',
      title: 'Weekly Reports',
      description: 'Get weekly summary reports of your websites',
      email: true,
      push: false,
      icon: MessageSquare,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const toggleNotification = async (id: string, type: 'email' | 'push') => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSettings(settings.map(setting => {
        if (setting.id === id) {
          return { ...setting, [type]: !setting[type] };
        }
        return setting;
      }));

      setSuccessMessage('Notification preferences updated');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update notification preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('All notification preferences saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to save notification preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>

      {successMessage && (
        <div className="mb-6 p-4 bg-sage/10 border border-sage/20 rounded-lg flex items-center">
          <Check className="h-5 w-5 text-sage mr-2" />
          <p className="text-sm text-sage">{successMessage}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-start">
              <setting.icon className="h-5 w-5 text-sage mt-1" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-white">{setting.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{setting.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={setting.email}
                  onChange={() => toggleNotification(setting.id, 'email')}
                  disabled={isLoading}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-sage focus:ring-sage disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-400">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={setting.push}
                  onChange={() => toggleNotification(setting.id, 'push')}
                  disabled={isLoading}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-sage focus:ring-sage disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-400">Push</span>
              </label>
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-6 border-t border-gray-800">
          <button
            onClick={savePreferences}
            disabled={isLoading}
            className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Saving...
              </div>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}