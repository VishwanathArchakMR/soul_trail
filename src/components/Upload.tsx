import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload as UploadIcon, MapPin, Clock, Phone, Image, CreditCard } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Upload() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Temples' as const,
    emotionalTag: 'Spiritual' as const,
    description: '',
    history: '',
    timings: '',
    contact: '',
    coordinates: { lat: '', lng: '' },
    location: {
      state: 'Karnataka',
      district: 'Udupi',
      taluk: 'Udupi Taluk',
      village: 'Malpe'
    },
    coverImage: '',
    gallery: [''],
    nearbyStays: [{ name: '', address: '', price: '', rating: '', photos: [''], contact: '' }]
  });
  const [showPayment, setShowPayment] = useState(false);

  // Check if user is authorized
  if (!state.user || (state.user.role !== 'partner' && state.user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UploadIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-4">You need a Partner or Admin account to upload places.</p>
          <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Login as Partner
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any, nested?: string) => {
    if (nested) {
      setFormData(prev => ({
        ...prev,
        [nested]: { ...prev[nested as keyof typeof prev], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as any[]), field === 'nearbyStays' ? { name: '', address: '', price: '', rating: '', photos: [''], contact: '' } : '']
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.user.role === 'partner') {
      setShowPayment(true);
    } else {
      // Admin can publish directly
      alert('Place uploaded successfully! (Admin approval not required)');
      navigate('/');
    }
  };

  const handlePayment = () => {
    alert('Payment successful! Your place has been submitted for admin approval.');
    navigate('/');
  };

  const steps = [
    { id: 1, title: 'Basic Info', icon: MapPin },
    { id: 2, title: 'Details & Media', icon: Image },
    { id: 3, title: 'Location & Stays', icon: Clock }
  ];

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Listing Fee</h2>
            <p className="text-gray-600">Complete your place submission</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Place Listing Fee</span>
              <span className="font-bold">₹500</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Processing Fee</span>
              <span className="font-bold">₹50</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-green-600">₹550</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your submission goes to admin review</li>
              <li>• Review takes 24-48 hours</li>
              <li>• You'll receive email confirmation</li>
              <li>• Place will be live after approval</li>
            </ul>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mb-3"
          >
            Complete Payment (Demo)
          </button>
          
          <button
            onClick={() => setShowPayment(false)}
            className="w-full text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to SoulTrail</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Place</h1>
          <p className="text-gray-600">Share a meaningful destination with fellow travelers</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center ${currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="ml-2 font-medium hidden sm:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Place Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter place name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Temples">Temples 🛕</option>
                    <option value="Peaceful">Peaceful 🌸</option>
                    <option value="Adventure">Adventure 🧗</option>
                    <option value="Heritage">Heritage 🕰</option>
                    <option value="Nature">Nature 🏞</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emotional Tag *</label>
                  <select
                    value={formData.emotionalTag}
                    onChange={(e) => handleInputChange('emotionalTag', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Spiritual">Spiritual</option>
                    <option value="Peaceful">Peaceful</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Scenic">Scenic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL *</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => handleInputChange('coverImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://images.pexels.com/..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Use Pexels or other stock photo URLs</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe what makes this place special..."
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Details & Media</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">History</label>
                <textarea
                  value={formData.history}
                  onChange={(e) => handleInputChange('history', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Share the historical significance..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timings</label>
                  <input
                    type="text"
                    value={formData.timings}
                    onChange={(e) => handleInputChange('timings', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 6:00 AM - 8:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Phone number or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                {formData.gallery.map((url, index) => (
                  <input
                    key={index}
                    type="url"
                    value={url}
                    onChange={(e) => handleArrayChange('gallery', index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                    placeholder="https://images.pexels.com/..."
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('gallery')}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  + Add another image
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location & Nearby Stays</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) => handleInputChange('lat', e.target.value, 'coordinates')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 13.3409"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lng}
                    onChange={(e) => handleInputChange('lng', e.target.value, 'coordinates')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 74.7421"
                  />
                </div>
              </div>

              {/* Location Hierarchy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={formData.location.state}
                    onChange={(e) => handleInputChange('state', e.target.value, 'location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Karnataka">Karnataka</option>
                    {/* ADMIN EDITABLE: Add more states */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select
                    value={formData.location.district}
                    onChange={(e) => handleInputChange('district', e.target.value, 'location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Udupi">Udupi</option>
                    <option value="Chikmagalur">Chikmagalur</option>
                    <option value="Mysore">Mysore</option>
                    {/* ADMIN EDITABLE: Add more districts */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taluk</label>
                  <input
                    type="text"
                    value={formData.location.taluk}
                    onChange={(e) => handleInputChange('taluk', e.target.value, 'location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter taluk name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village/Town</label>
                  <input
                    type="text"
                    value={formData.location.village}
                    onChange={(e) => handleInputChange('village', e.target.value, 'location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter village or town name"
                  />
                </div>
              </div>

              {/* Nearby Stays */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Nearby Accommodations (Optional)</h3>
                {formData.nearbyStays.map((stay, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Stay name"
                        value={stay.name}
                        onChange={(e) => {
                          const newStays = [...formData.nearbyStays];
                          newStays[index].name = e.target.value;
                          setFormData(prev => ({ ...prev, nearbyStays: newStays }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={stay.address}
                        onChange={(e) => {
                          const newStays = [...formData.nearbyStays];
                          newStays[index].address = e.target.value;
                          setFormData(prev => ({ ...prev, nearbyStays: newStays }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Price per night"
                        value={stay.price}
                        onChange={(e) => {
                          const newStays = [...formData.nearbyStays];
                          newStays[index].price = e.target.value;
                          setFormData(prev => ({ ...prev, nearbyStays: newStays }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        step="0.1"
                        max="5"
                        placeholder="Rating (1-5)"
                        value={stay.rating}
                        onChange={(e) => {
                          const newStays = [...formData.nearbyStays];
                          newStays[index].rating = e.target.value;
                          setFormData(prev => ({ ...prev, nearbyStays: newStays }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('nearbyStays')}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  + Add accommodation
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {state.user?.role === 'admin' ? 'Publish Place' : 'Submit for Review'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}