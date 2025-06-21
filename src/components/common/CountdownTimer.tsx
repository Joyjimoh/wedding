import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../../utils/storage';

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex justify-center space-x-3 ${className}`}>
      <div className="countdown-item bg-white bg-opacity-80 rounded-lg p-2 min-w-[70px] text-center shadow-md">
        <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-xs">Days</div>
      </div>
      <div className="countdown-item bg-white bg-opacity-80 rounded-lg p-2 min-w-[70px] text-center shadow-md">
        <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="countdown-item bg-white bg-opacity-80 rounded-lg p-2 min-w-[70px] text-center shadow-md">
        <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs">Minutes</div>
      </div>
      <div className="countdown-item bg-white bg-opacity-80 rounded-lg p-2 min-w-[70px] text-center shadow-md">
        <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;