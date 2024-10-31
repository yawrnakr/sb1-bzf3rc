import React, { useState } from 'react';
import { User, Mail, Shield, Trash2, Plus, Check } from 'lucide-react';

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending';
}

export default function UserManagement() {
  const [users, setUsers] = useState<DashboardUser[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'editor',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      role: 'viewer',
      status: 'pending',
    },
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    role: 'viewer' as DashboardUser['role'],
  });

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    
    setUsers([...users, {
      id,
      name: newUser.email.split('@')[0],
      email: newUser.email,
      role: newUser.role,
      status: 'pending',
    }]);

    setNewUser({ email: '', role: 'viewer' });
    setShowInviteForm(false);
  };

  const handleRemoveUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getRoleColor = (role: DashboardUser['role']) => {
    switch (role) {
      case 'admin':
        return 'text-red-500 bg-red-500/10';
      case 'editor':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'viewer':
        return 'text-sage bg-sage/10';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">User Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage user access and permissions
          </p>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="flex items-center px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Invite User
        </button>
      </div>

      {showInviteForm && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
          <form onSubmit={handleInviteUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                placeholder="user@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as DashboardUser['role'] }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-white">{user.name}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <Mail className="h-3 w-3 mr-1" />
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
              </div>
              {user.status === 'pending' && (
                <span className="text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
                  Pending
                </span>
              )}
              {user.status === 'active' && (
                <span className="text-xs text-sage bg-sage/10 px-3 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Active
                </span>
              )}
              {user.role !== 'admin' && (
                <button
                  onClick={() => handleRemoveUser(user.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}