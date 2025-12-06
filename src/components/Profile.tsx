import React from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, Star, MapPin, Settings, Upload, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PlaceCard from './PlaceCard';

export default function Profile() {
  const { state, dispatch } = useApp();

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const wishlistedPlaces = state.places.filter(place => state.wishlist.includes(place.id));
  const totalLikes = wishlistedPlaces.reduce((sum, place) => sum + place.likes, 0);
  const avgRating = wishlistedPlaces.length > 0 
    ? wishlistedPlaces.reduce((sum, place) => sum + place.rating, 0) / wishlistedPlaces.length 
    : 0;

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'partner':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{state.user.name}</h2>
                <p className="text-gray-600">{state.user.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleBadgeColor(state.user.role)}`}>
                  {state.user.role.charAt(0).toUpperCase() + state.user.role.slice(1)}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Wishlist</span>
                  <span className="font-medium">{state.wishlist.length} places</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Total Likes</span>
                  <span className="font-medium">{totalLikes}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="font-medium">{avgRating.toFixed(1)}/5</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Link 
                  to="/map"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Explore Map</span>
                </Link>
                
                {(state.user.role === 'partner' || state.user.role === 'admin') && (
                  <Link 
                    to="/upload"
                    className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Place</span>
                  </Link>
                )}
                
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Interests</h3>
              <div className="space-y-3">
                {Object.entries(state.userPreferences).map(([category, weight]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${Math.min(100, weight * 20)}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{weight.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Wishlist */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <span>My Wishlist ({wishlistedPlaces.length})</span>
                </h2>
              </div>

              {wishlistedPlaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No saved places yet</h3>
                  <p className="text-gray-600 mb-6">Start exploring and save places you'd like to visit!</p>
                  <Link 
                    to="/"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Discover Places
                  </Link>
                </div>
              )}
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Joined SoulTrail</p>
                      <p className="text-sm text-gray-500">Welcome to the community!</p>
                    </div>
                    <span className="text-xs text-gray-400">Today</span>
                  </div>
                  
                  {state.wishlist.length > 0 && (
                    <div className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">Added places to wishlist</p>
                        <p className="text-sm text-gray-500">{state.wishlist.length} places saved</p>
                      </div>
                      <span className="text-xs text-gray-400">Today</span>
                    </div>
                  )}

                  {state.wishlist.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No recent activity. Start exploring places!</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}