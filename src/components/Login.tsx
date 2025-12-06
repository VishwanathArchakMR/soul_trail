import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'partner' | 'admin'>('user');
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would make API calls
    const user = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      role
    };

    dispatch({ type: 'SET_USER', payload: user });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to SoulTrail</span>
          </Link>
          
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome back' : 'Join SoulTrail'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account to start exploring'}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6 bg-white rounded-xl shadow-lg p-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'user' | 'partner' | 'admin')}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="user">Traveler (Browse & Review)</option>
                  <option value="partner">Partner (Upload Places)</option>
                  <option value="admin">Admin (Manage Content)</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {isLogin && (
              <div className="text-sm">
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium py-3 px-4 rounded-lg hover:from-purple-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">Demo Accounts (for testing):</p>
            <div className="space-y-2 text-xs">
              <div className="bg-gray-50 p-2 rounded flex justify-between">
                <span>User: user@demo.com</span>
                <button 
                  type="button"
                  onClick={() => { setEmail('user@demo.com'); setPassword('demo123'); setRole('user'); }}
                  className="text-purple-600 hover:underline"
                >
                  Use
                </button>
              </div>
              <div className="bg-gray-50 p-2 rounded flex justify-between">
                <span>Partner: partner@demo.com</span>
                <button 
                  type="button"
                  onClick={() => { setEmail('partner@demo.com'); setPassword('demo123'); setRole('partner'); }}
                  className="text-purple-600 hover:underline"
                >
                  Use
                </button>
              </div>
              <div className="bg-gray-50 p-2 rounded flex justify-between">
                <span>Admin: admin@demo.com</span>
                <button 
                  type="button"
                  onClick={() => { setEmail('admin@demo.com'); setPassword('demo123'); setRole('admin'); }}
                  className="text-purple-600 hover:underline"
                >
                  Use
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}