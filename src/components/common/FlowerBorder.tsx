import React from 'react';

const FlowerBorder: React.FC = () => {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-transparent via-rose-100 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex space-x-4 opacity-60">
          {/* Flower elements */}
          <div className="w-8 h-8 rounded-full bg-rose-200 relative">
            <div className="absolute inset-1 rounded-full bg-rose-300"></div>
            <div className="absolute inset-2 rounded-full bg-rose-400"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-pink-200 relative mt-1">
            <div className="absolute inset-1 rounded-full bg-pink-300"></div>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-200 relative -mt-1">
            <div className="absolute inset-1 rounded-full bg-rose-300"></div>
            <div className="absolute inset-2 rounded-full bg-rose-400"></div>
            <div className="absolute inset-3 rounded-full bg-rose-500"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-pink-200 relative mt-1">
            <div className="absolute inset-1 rounded-full bg-pink-300"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-rose-200 relative">
            <div className="absolute inset-1 rounded-full bg-rose-300"></div>
            <div className="absolute inset-2 rounded-full bg-rose-400"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative leaves */}
      <div className="absolute left-1/4 top-2 w-4 h-2 bg-green-300 rounded-full transform rotate-45 opacity-40"></div>
      <div className="absolute right-1/4 top-3 w-3 h-2 bg-green-300 rounded-full transform -rotate-45 opacity-40"></div>
      <div className="absolute left-1/3 bottom-2 w-3 h-2 bg-green-300 rounded-full transform rotate-12 opacity-40"></div>
      <div className="absolute right-1/3 bottom-3 w-4 h-2 bg-green-300 rounded-full transform -rotate-12 opacity-40"></div>
    </div>
  );
};

export default FlowerBorder;