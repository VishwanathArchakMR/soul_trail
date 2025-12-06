import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = state.places
    .filter(place => 
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.category.toLowerCase().includes(query.toLowerCase()) ||
      place.location.village.toLowerCase().includes(query.toLowerCase()) ||
      place.location.district.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 6);

  const handleSearch = (searchQuery?: string) => {
    const searchTerm = searchQuery || query;
    if (searchTerm.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchTerm });
      navigate('/search');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place: any) => {
    navigate(`/place/${place.id}`);
    setQuery('');
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search places, temples, nature spots..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setShowSuggestions(query.length > 0)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <Filter className="h-5 w-5 text-gray-400 hover:text-purple-600 transition-colors" />
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          {suggestions.map((place) => (
            <button
              key={place.id}
              onClick={() => handleSuggestionClick(place)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 flex items-center space-x-3"
            >
              <img 
                src={place.coverImage} 
                alt={place.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{place.name}</div>
                <div className="text-sm text-gray-500">
                  {place.category} • {place.location.district}, {place.location.state}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 p-4 z-50">
          <h3 className="font-semibold mb-3">Filters</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { category: e.target.value || undefined } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                <option value="Temples">Temples 🛕</option>
                <option value="Peaceful">Peaceful 🌸</option>
                <option value="Adventure">Adventure 🧗</option>
                <option value="Heritage">Heritage 🕰</option>
                <option value="Nature">Nature 🏞</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emotional Tag</label>
              <select 
                onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { emotion: e.target.value || undefined } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Emotions</option>
                <option value="Spiritual">Spiritual</option>
                <option value="Peaceful">Peaceful</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Scenic">Scenic</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}