import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';
import SeatMap from '../../../components/seating/SeatMap';

const SeatingTab: React.FC = () => {
  const { state, confirmArrival } = useAppContext();
  const guestCode = state.currentUser || '';
  const guest = guestCode ? state.guests[guestCode] : null;
  
  const [arrivalConfirmed, setArrivalConfirmed] = useState(guest?.arrived || false);
  
  const handleConfirmArrival = () => {
    confirmArrival(guestCode);
    setArrivalConfirmed(true);
    toast.success('Your arrival has been confirmed. Welcome to our wedding!');
  };
  
  return (
    <div>
      <h2 className="text-3xl md:text-4xl text-center mb-8 text-rose-700 font-dancing">My Seat</h2>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-300">
        <div className="text-center mb-6">
          <h3 className="text-2xl mb-2">
            Your Seat: <span className="text-rose-600 font-semibold">
              {guest?.seatNumber ? `Seat ${guest.seatNumber}` : 'Not assigned yet'}
            </span>
          </h3>
          <p>Please confirm your attendance when you arrive at the venue by clicking the button below.</p>
        </div>
        
        <div className="text-center">
          {!arrivalConfirmed ? (
            <button 
              onClick={handleConfirmArrival}
              className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-300 shadow-md"
            >
              Confirm My Arrival
            </button>
          ) : (
            <div className="mt-4 text-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Your arrival has been confirmed. Welcome to our wedding!</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-2xl mb-4 text-center">Seating Chart</h3>
        
        <SeatMap guestCode={guestCode} />
        
        <div className="flex justify-center mt-6 text-sm">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-green-300 rounded-sm mr-2"></div>
            <span>Available</span>
          </div>
          
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-red-300 rounded-sm mr-2"></div>
            <span>Taken</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-200 rounded-sm mr-2"></div>
            <span>Your Seat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingTab;