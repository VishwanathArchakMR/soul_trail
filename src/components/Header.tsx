import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, User, Heart, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SearchBar from './SearchBar';

export default function Header() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              SoulTrail
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/map" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
                <MapPin className="h-4 w-4" />
                <span>Map</span>
              </Link>
              {state.user?.role === 'partner' && (
                <Link to="/upload" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Upload
                </Link>
              )}
              {state.wishlist.length > 0 && (
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    {state.wishlist.length}
                  </span>
                </Link>
              )}
              {state.user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span>{state.user.name}</span>
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/map" 
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Map View
              </Link>
              {state.user?.role === 'partner' && (
                <Link 
                  to="/upload" 
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Upload Place
                </Link>
              )}
              {state.user ? (
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="block px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}