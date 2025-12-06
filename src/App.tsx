/**
 * Soul Trail - AI-Powered Travel Discovery Platform
 * @author Vishwanath Archak
 * @description Main application component with routing and layout
 * @version 1.0.0
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Home from './components/Home';
import PlaceDetail from './components/PlaceDetail';
import MapView from './components/MapView';
import Upload from './components/Upload';
import Login from './components/Login';
import RegionView from './components/RegionView';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/region/:type/:id" element={<RegionView />} />
            <Route path="/place/:id" element={<PlaceDetail />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
