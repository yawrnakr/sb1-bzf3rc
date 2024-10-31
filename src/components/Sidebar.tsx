import React from 'react';
import { BarChart3, Globe, AlertTriangle, DollarSign, LineChart, Shield, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  onSignOut: () => void;
}

export default function Sidebar({ onNavigate, activePage, onSignOut }: SidebarProps) {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
    { icon: Globe, label: 'Websites', id: 'websites' },
    { icon: AlertTriangle, label: 'MFA Detection', id: 'mfa-detection' },
    { icon: DollarSign, label: 'Revenue', id: 'revenue' },
    { icon: LineChart, label: 'Analytics', id: 'analytics' },
    { icon: Shield, label: 'Compliance', id: 'compliance' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 px-4 py-6">
      <div className="flex items-center mb-8 px-2">
        <Shield className="h-8 w-8 text-sage" />
        <span className="ml-2 text-xl font-bold text-white">MFA-Buster</span>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-item ${
              activePage === item.id ? 'nav-item-active' : 'nav-item-inactive'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-800">
        <div className="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-sage/20"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">John Smith</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}