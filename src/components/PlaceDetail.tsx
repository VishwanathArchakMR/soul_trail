import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, MapPin, Clock, Phone, Camera, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function PlaceDetail() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  
  const place = state.places.find(p => p.id === id);
  const isWishlisted = state.wishlist.includes(id || '');

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Place not found</h2>
          <Link to="/" className="text-purple-600 hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: place.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: place.id });
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    dispatch({ type: 'RATE_PLACE', payload: { placeId: place.id, rating } });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && state.user) {
      const comment = {
        id: Date.now().toString(),
        userId: state.user.id,
        userName: state.user.name,
        text: newComment,
        timestamp: new Date(),
        rating: userRating || undefined
      };
      dispatch({ type: 'ADD_COMMENT', payload: { placeId: place.id, comment } });
      setNewComment('');
      setUserRating(0);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Temples': 'bg-amber-100 text-amber-800 border-amber-200',
      'Peaceful': 'bg-pink-100 text-pink-800 border-pink-200',
      'Adventure': 'bg-green-100 text-green-800 border-green-200',
      'Heritage': 'bg-purple-100 text-purple-800 border-purple-200',
      'Nature': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <img 
          src={place.coverImage} 
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4">
          <Link 
            to="/"
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-900" />
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleWishlistToggle}
            className={`p-3 rounded-full transition-all duration-200 ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white'
            }`}
          >
            <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button className="bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
            <Share2 className="h-6 w-6 text-gray-900" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(place.category)}`}>
              {place.category}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30">
              {place.emotionalTag}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{place.name}</h1>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-1">
              <MapPin className="h-5 w-5" />
              <span>{place.location.district}, {place.location.state}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span>{place.rating} ({place.totalRatings} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex border-b">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'gallery', label: 'Gallery' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'stays', label: 'Nearby Stays' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-700 leading-relaxed">{place.description}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">History</h3>
                      <p className="text-gray-700 leading-relaxed">{place.history}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {place.gallery.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${place.name} gallery ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        />
                      ))}
                    </div>
                    {state.user && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Camera className="h-5 w-5" />
                          <span>Share your photos and videos of this place</span>
                        </div>
                        <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          Upload Photos
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {state.user && (
                      <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Leave a Review</h4>
                        <div className="flex items-center space-x-1 mb-3">
                          <span className="text-sm text-gray-600">Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserRating(star)}
                              className="text-yellow-400 hover:scale-110 transition-transform"
                            >
                              <Star className={`h-6 w-6 ${star <= userRating ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Share your experience..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={3}
                        />
                        <button
                          type="submit"
                          className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Recent Reviews</h4>
                      {place.comments?.length ? (
                        <div className="space-y-4">
                          {place.comments.map((comment) => (
                            <div key={comment.id} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                  {comment.userName.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900">{comment.userName}</span>
                                {comment.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-600">{comment.rating}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700">{comment.text}</p>
                              <p className="text-sm text-gray-500 mt-2">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'stays' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Accommodations</h3>
                    {place.nearbyStays?.length ? (
                      <div className="space-y-4">
                        {place.nearbyStays.map((stay) => (
                          <div key={stay.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{stay.name}</h4>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">₹{stay.price}</div>
                                <div className="text-sm text-gray-500">per night</div>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{stay.address}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{stay.rating}</span>
                              </div>
                              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No stays listed yet for this area.</p>
                        {state.user?.role === 'partner' && (
                          <Link 
                            to="/upload"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Add Accommodation
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                {place.timings && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Timings</div>
                      <div className="text-sm text-gray-600">{place.timings}</div>
                    </div>
                  </div>
                )}
                {place.contact && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Contact</div>
                      <div className="text-sm text-gray-600">{place.contact}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-600">
                      {place.location.village}, {place.location.taluk}, {place.location.district}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map</p>
                  <p className="text-sm text-gray-500">
                    {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{place.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-medium">{place.totalRatings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes</span>
                  <span className="font-medium">{place.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}