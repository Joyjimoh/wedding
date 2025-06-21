import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FlowerBorder from '../../../components/common/FlowerBorder';

const AsoebiTab: React.FC = () => {
  const { state } = useAppContext();
  
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'NGN': return '₦';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };
  
  return (
    <BackgroundImage imageUrl={state.settings.welcomeImage}>
      <div>
        <h2 className="text-3xl md:text-4xl text-center mb-8 text-rose-700 font-dancing">Wedding Attire (Asoebi)</h2>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-300">
          <p className="text-center mb-6">We have selected the following attire options for our wedding. If you would like to purchase any of these items, please contact us through WhatsApp or make a payment to the account details provided.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {state.asoebiItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 asoebi-item"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-gray-600 mb-2 text-xs line-clamp-2">{item.description}</p>
                <p className="text-rose-600 font-semibold mb-3 text-sm">
                  {getCurrencySymbol(item.currency)}{item.price.toFixed(2)} {item.currency}
                </p>
                
                <a 
                  href={`https://wa.me/${state.paymentDetails.whatsappNumber}?text=I would like to order the ${item.title} asoebi for ${getCurrencySymbol(item.currency)}${item.price.toFixed(2)} ${item.currency}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-300 text-center text-xs"
                >
                  Order via WhatsApp
                </a>
              </div>
            </div>
          ))}
          
          {state.asoebiItems.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-lg shadow-md">
              No asoebi items available yet.
            </div>
          )}
        </div>
        
        <FlowerBorder />
      </div>
    </BackgroundImage>
  );
};

export default AsoebiTab;