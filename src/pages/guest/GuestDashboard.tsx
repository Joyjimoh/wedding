import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

// Guest tabs
import WelcomeTab from './tabs/WelcomeTab';
import GalleryTab from './tabs/GalleryTab';
import MenuTab from './tabs/MenuTab';
import AsoebiTab from './tabs/AsoebiTab';
import RegistryTab from './tabs/RegistryTab';
import ContactTab from './tabs/ContactTab';
import WeddingPartyTab from './tabs/WeddingPartyTab';
import CountdownTimer from '../../components/common/CountdownTimer';
import { formatEventDate } from '../../utils/storage';

const GuestDashboard: React.FC = () => {
  const { state, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login if not logged in or is admin
    if (!state.currentUser || state.currentUser === 'ADMIN') {
      navigate('/');
    }
    
    // Redirect to welcome if on root guest path
    if (location.pathname === '/guest') {
      navigate('/guest/welcome');
    }
  }, [state.currentUser, navigate, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!state.currentUser || state.currentUser === 'ADMIN') {
    return null;
  }

  // Determine active tab
  const getActiveTab = (path: string) => {
    const currentPath = location.pathname;
    return currentPath.includes(path) 
      ? "bg-rose-100 text-rose-600" 
      : "hover:bg-rose-100 hover:text-rose-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-rose-600 text-white py-5">
        <div className="container mx-auto text-center px-5">
          <h1 className="text-4xl md:text-5xl font-dancing mb-2">{state.settings.coupleNames}</h1>
          <p className="text-lg">{formatEventDate(state.settings.eventDate)}</p>
          <p className="mt-2">{state.settings.venue}</p>
          
          <div className="mt-4">
            <CountdownTimer targetDate={state.settings.eventDate} />
          </div>
        </div>
      </header>
      
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-5">
          <div className="flex overflow-x-auto py-4 no-scrollbar">
            <Link 
              to="/guest/welcome" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('welcome')}`}
            >
              Welcome
            </Link>
            <Link 
              to="/guest/gallery" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('gallery')}`}
            >
              Gallery
            </Link>
            <Link 
              to="/guest/wedding-party" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('wedding-party')}`}
            >
              Wedding Party
            </Link>
            <Link 
              to="/guest/menu" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('menu')}`}
            >
              Food & Drinks
            </Link>
            <Link 
              to="/guest/asoebi" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('asoebi')}`}
            >
              Asoebi
            </Link>
            <Link 
              to="/guest/registry" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('registry')}`}
            >
              Registry
            </Link>
            <Link 
              to="/guest/contact" 
              className={`whitespace-nowrap px-4 py-2 mx-2 rounded-full transition duration-300 ${getActiveTab('contact')}`}
            >
              Contact
            </Link>
            <button 
              onClick={handleLogout}
              className="whitespace-nowrap px-4 py-2 mx-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto p-5">
        <Routes>
          <Route path="/welcome" element={<WelcomeTab />} />
          <Route path="/gallery" element={<GalleryTab />} />
          <Route path="/wedding-party" element={<WeddingPartyTab />} />
          <Route path="/menu" element={<MenuTab />} />
          <Route path="/asoebi" element={<AsoebiTab />} />
          <Route path="/registry" element={<RegistryTab />} />
          <Route path="/contact" element={<ContactTab />} />
        </Routes>
      </div>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-5 text-center">
          <h3 className="text-2xl font-dancing mb-4">{state.settings.coupleNames}</h3>
          <p className="mb-4">{formatEventDate(state.settings.eventDate)}</p>
          
          <div className="mb-6 flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-rose-300 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-rose-300 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href={`https://wa.me/${state.paymentDetails.whatsappNumber}`} className="text-white hover:text-rose-300 transition duration-300" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
          
          <p className="text-sm text-gray-400">Thank you for celebrating with us!</p>
        </div>
      </footer>
    </div>
  );
};

export default GuestDashboard;