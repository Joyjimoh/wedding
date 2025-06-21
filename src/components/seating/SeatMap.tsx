import React from 'react';
import { useAppContext } from '../../context/AppContext';

interface SeatMapProps {
  showDetails?: boolean;
  guestCode?: string;
  onSeatClick?: (seatNumber: number) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ 
  showDetails = false, 
  guestCode = '', 
  onSeatClick 
}) => {
  const { state } = useAppContext();
  const { seats, guests, settings } = state;

  return (
    <div className="border p-4 rounded-lg bg-gray-50 min-h-[200px] flex flex-wrap justify-center">
      {[...Array(settings.maxSeats)].map((_, index) => {
        const seatNumber = index + 1;
        const seat = seats[seatNumber];
        
        let seatClass = "seat w-10 h-10 m-1 flex items-center justify-center rounded text-center cursor-pointer transition duration-200 hover:scale-110";
        
        if (seat?.taken) {
          if (guestCode && guests[guestCode]?.seatNumber === seatNumber) {
            seatClass += " bg-yellow-200 animate-pulse"; // Your seat
          } else {
            seatClass += " bg-red-300"; // Taken seat
          }
        } else {
          seatClass += " bg-green-300"; // Available seat
        }
        
        return (
          <div 
            key={seatNumber}
            className={seatClass}
            onClick={() => onSeatClick && onSeatClick(seatNumber)}
            title={
              seat?.taken && seat.guestCode && showDetails 
                ? `Seat ${seatNumber}: ${guests[seat.guestCode]?.name || 'Unknown guest'}`
                : `Seat ${seatNumber}`
            }
          >
            {seatNumber}
          </div>
        );
      })}
    </div>
  );
};

export default SeatMap;