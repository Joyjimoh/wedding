import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { formatEventDate, formatEventTime } from '../../../utils/storage';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FlowerBorder from '../../../components/common/FlowerBorder';

const WelcomeTab: React.FC = () => {
  const { state } = useAppContext();
  const guestCode = state.currentUser || '';
  const guest = guestCode ? state.guests[guestCode] : null;
  
  const welcomeImage = state.settings.welcomeImage || 
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  
  return (
    <BackgroundImage imageUrl={welcomeImage}>
      <div>
        <h2 className="text-3xl md:text-4xl text-center mb-8 text-rose-700 font-dancing">Welcome to Our Wedding</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 hover:shadow-lg transition-shadow duration-300">
          <div className="md:flex">
            <div className="md:w-2/3">
              <img 
                src={welcomeImage} 
                alt="Couple" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-1/3 p-8">
              <h3 className="text-2xl mb-4 text-rose-600">Dear {guest?.name || 'Guest'},</h3>
              
              <p className="mb-4">We are delighted to welcome you to our wedding celebration! Thank you for being a part of our special day.</p>
              
              <p className="mb-4">This website will help you navigate our wedding events and provide you with all the information you need to enjoy the celebration.</p>
              
              <p className="mb-4">Your access code: <span className="font-semibold">{guestCode}</span></p>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Your Details:</h4>
                <p>Guest Category: <span className="font-semibold capitalize">{guest?.category || 'Regular'}</span></p>
                {guest?.seatNumber && (
                  <>
                    <p>Seat Number: <span className="font-semibold">{guest.seatNumber}</span></p>
                    <p>Table Number: <span className="font-semibold">{Math.ceil(guest.seatNumber / 10)}</span></p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl mb-4 text-rose-600 text-center">Our Story</h3>
          
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at velit vel urna feugiat vestibulum. Cras lobortis sapien eget dui ullamcorper, at facilisis felis varius. Phasellus quis mauris a neque venenatis aliquet.</p>
          
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris vel lectus non metus luctus volutpat in vel nisl. Sed vel mauris et tortor gravida facilisis.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl mb-4 text-rose-600 text-center">Event Schedule</h3>
          
          <div className="md:flex md:space-x-8">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Wedding Ceremony</h4>
              <p className="mb-1">Date: {formatEventDate(state.settings.eventDate)}</p>
              <p className="mb-1">Time: {formatEventTime(state.settings.eventDate)} - {formatEventTime(new Date(new Date(state.settings.eventDate).getTime() + 90 * 60000).toISOString())}</p>
              <p>Venue: {state.settings.venue}</p>
            </div>
            
            <div className="md:w-1/2">
              <h4 className="text-lg font-semibold mb-2">Reception</h4>
              <p className="mb-1">Date: {formatEventDate(state.settings.eventDate)}</p>
              <p className="mb-1">Time: {formatEventTime(new Date(new Date(state.settings.eventDate).getTime() + 120 * 60000).toISOString())} - {formatEventTime(new Date(new Date(state.settings.eventDate).getTime() + 420 * 60000).toISOString())}</p>
              <p>Venue: {state.settings.venue}</p>
            </div>
          </div>
        </div>
        
        <FlowerBorder />
      </div>
    </BackgroundImage>
  );
};

export default WelcomeTab;