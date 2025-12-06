import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, MapPin, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Place } from '../data/mockData';

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const { state, dispatch } = useApp();
  const isWishlisted = state.wishlist.includes(place.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: place.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: place.id });
    }
  };

  const handleCategoryClick = () => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: { category: place.category, weight: 0.1 } });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Temples': 'bg-amber-100 text-amber-800',
      'Peaceful': 'bg-pink-100 text-pink-800',
      'Adventure': 'bg-green-100 text-green-800',
      'Heritage': 'bg-purple-100 text-purple-800',
      'Nature': 'bg-blue-100 text-blue-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      'Spiritual': 'bg-orange-100 text-orange-800',
      'Peaceful': 'bg-teal-100 text-teal-800',
      'Adventure': 'bg-red-100 text-red-800',
      'Cultural': 'bg-indigo-100 text-indigo-800',
      'Scenic': 'bg-emerald-100 text-emerald-800'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Link 
      to={`/place/${place.id}`}
      onClick={handleCategoryClick}
      className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative">
        <img 
          src={place.coverImage} 
          alt={place.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        
        {/* Category and Emotion Tags */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(place.category)}`}>
            {place.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmotionColor(place.emotionalTag)}`}>
            {place.emotionalTag}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{place.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {place.name}
        </h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{place.location.district}, {place.location.state}</span>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {place.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{place.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{place.totalRatings} reviews</span>
            </div>
          </div>
          
          {place.timings && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Open</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}