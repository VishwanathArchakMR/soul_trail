import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PlaceCard from './PlaceCard';

export default function Home() {
  const { state } = useApp();

  // Get recommended places based on user preferences
  const getRecommendedPlaces = () => {
    return state.places
      .sort((a, b) => {
        const aScore = (state.userPreferences[a.category] || 1) * a.rating;
        const bScore = (state.userPreferences[b.category] || 1) * b.rating;
        return bScore - aScore;
      })
      .slice(0, 6);
  };

  const categories = [
    { name: 'Temples', emoji: '🛕', color: 'from-amber-500 to-orange-500' },
    { name: 'Peaceful', emoji: '🌸', color: 'from-pink-500 to-rose-500' },
    { name: 'Adventure', emoji: '🧗', color: 'from-green-500 to-teal-500' },
    { name: 'Heritage', emoji: '🕰', color: 'from-purple-500 to-indigo-500' },
    { name: 'Nature', emoji: '🏞', color: 'from-blue-500 to-cyan-500' }
  ];

  const emotionalTags = [
    { name: 'Spiritual', count: state.places.filter(p => p.emotionalTag === 'Spiritual').length },
    { name: 'Adventure', count: state.places.filter(p => p.emotionalTag === 'Adventure').length },
    { name: 'Peaceful', count: state.places.filter(p => p.emotionalTag === 'Peaceful').length },
    { name: 'Cultural', count: state.places.filter(p => p.emotionalTag === 'Cultural').length },
    { name: 'Scenic', count: state.places.filter(p => p.emotionalTag === 'Scenic').length }
  ];

  const topRatedPlaces = state.places
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const recommendedPlaces = getRecommendedPlaces();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-6">
            Discover Your Soul's Journey
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Explore emotionally meaningful places across India. From ancient temples to serene waterfalls, 
            find destinations that speak to your soul.
          </p>
          
          {/* Current Region */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <MapPin className="h-5 w-5 text-purple-600" />
            <span className="text-lg font-medium text-gray-800">
              Currently exploring: {state.currentRegion.join(' → ')}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">{state.places.length}+</div>
              <div className="text-sm text-gray-600">Sacred Places</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-orange-500">5</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">4.6</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Districts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Tags */}
      <section className="px-4 py-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <TrendingUp className="inline-block h-6 w-6 mr-2" />
            Discover by Emotion
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {emotionalTags.map((tag) => (
              <Link
                key={tag.name}
                to={`/search?emotion=${tag.name}`}
                className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-300"
              >
                <span className="font-medium text-gray-800">{tag.name}</span>
                <span className="ml-2 text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?category=${category.name}`}
                className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundImage: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90 mt-2">
                    {state.places.filter(p => p.category === category.name).length} places
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Places */}
      <section className="px-4 py-12 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            <Heart className="inline-block h-8 w-8 mr-2 text-red-500" />
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Places */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            <Star className="inline-block h-8 w-8 mr-2 text-yellow-500" />
            Top Rated Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Region Navigation */}
      <section className="px-4 py-12 bg-gradient-to-r from-purple-600 to-orange-500">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Explore Regions</h2>
          <p className="text-purple-100 mb-8">Navigate through states, districts, and discover hidden gems</p>
          <Link 
            to="/region/state/karnataka"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <MapPin className="h-5 w-5" />
            <span>Start Exploring Karnataka</span>
          </Link>
        </div>
      </section>
    </div>
  );
}