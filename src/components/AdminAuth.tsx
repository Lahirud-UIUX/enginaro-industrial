'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onAuth: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuth }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in production, you'd want proper authentication
    if (password === 'admin123') {
      onAuth();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-md w-full rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-background)' }}>
        <div className="text-center mb-6">
          <Lock size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Access</h1>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Enter password to access the CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--input-background)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          {error && (
            <div className="text-sm" style={{ color: 'var(--text-danger)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
            style={{ 
              backgroundColor: 'var(--button-primary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-primary)';
            }}
          >
            Access Admin
          </button>
        </form>

        <div className="mt-6 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          <p>Demo Password: admin123</p>
          <p className="mt-2">⚠️ This is a demo. Use proper authentication in production!</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth; 