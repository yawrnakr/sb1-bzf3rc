import React, { useState } from 'react';
import { Shield, Mail, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { validateEmail } from '../../utils/validation';

interface ResetPasswordPageProps {
  onNavigate: (page: 'signin' | 'signup' | 'reset-password') => void;
}

export default function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center mb-8">
        <Shield className="h-8 w-8 text-sage mr-2" />
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
      </div>

      {!isSubmitted ? (
        <>
          <p className="text-gray-400 text-center mb-8">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent placeholder-gray-500"
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-6 p-4 bg-sage/10 border border-sage/20 rounded-lg">
            <p className="text-sm text-sage">
              Check your email for password reset instructions. The link will expire in 1 hour.
            </p>
          </div>
          <p className="text-gray-400">
            Didn't receive the email?{' '}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sage hover:text-sage/80"
            >
              Try again
            </button>
          </p>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-gray-400">
        Remember your password?{' '}
        <button
          type="button"
          onClick={() => onNavigate('signin')}
          className="text-sage hover:text-sage/80"
        >
          Sign in
        </button>
      </p>
    </AuthLayout>
  );
}