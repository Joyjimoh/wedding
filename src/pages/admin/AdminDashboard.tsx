import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

// Admin tabs
import Dashboard from './tabs/Dashboard';
import PhotosTab from './tabs/PhotosTab';
import GuestsTab from './tabs/GuestsTab';
import MenuTab from './tabs/MenuTab';
import AsoebiTab from './tabs/AsoebiTab';
import RegistryTab from './tabs/RegistryTab';
import WeddingPartyTab from './tabs/WeddingPartyTab';
import ThemeTab from './tabs/ThemeTab';

const AdminDashboard: React.FC = () => {
  const { state, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login if not admin
    if (state.currentUser !== 'ADMIN') {
      navigate('/');
    }
    
    // Redirect to dashboard if on root admin path
    if (location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, [state.currentUser, navigate, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (state.currentUser !== 'ADMIN') {
    return null;
  }

  // Determine active tab
  const getActiveTab = (path: string) => {
    const currentPath = location.pathname;
    return currentPath.includes(path) ? 'bg-rose-100 text-rose-700' : 'hover:bg-rose-50 hover:text-rose-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-rose-600 text-white p-5 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-dancing">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-rose-600 rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className="container mx-auto p-5">
        <div className="mb-8 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            <Link 
              to="/admin/dashboard" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('dashboard')}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/photos" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('photos')}`}
            >
              Photo Gallery
            </Link>
            <Link 
              to="/admin/guests" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('guests')}`}
            >
              Guest Management
            </Link>
            <Link 
              to="/admin/menu" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('menu')}`}
            >
              Menu Management
            </Link>
            <Link 
              to="/admin/asoebi" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('asoebi')}`}
            >
              Asoebi Management
            </Link>
            <Link 
              to="/admin/registry" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('registry')}`}
            >
              Registry & Payments
            </Link>
            <Link 
              to="/admin/wedding-party" 
              className={`py-3 px-4 mr-2 transition-colors duration-200 ${getActiveTab('wedding-party')}`}
            >
              Wedding Party
            </Link>
            <Link 
              to="/admin/themes" 
              className={`py-3 px-4 transition-colors duration-200 ${getActiveTab('themes')}`}
            >
              Themes
            </Link>
          </div>
        </div>
        
        <div className="admin-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/photos" element={<PhotosTab />} />
            <Route path="/guests" element={<GuestsTab />} />
            <Route path="/menu" element={<MenuTab />} />
            <Route path="/asoebi" element={<AsoebiTab />} />
            <Route path="/registry" element={<RegistryTab />} />
            <Route path="/wedding-party" element={<WeddingPartyTab />} />
            <Route path="/themes" element={<ThemeTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;