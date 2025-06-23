import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';
import { formatEventDate } from '../../../utils/storage';

const Dashboard: React.FC = () => {
  const { state, updateSettings, generateAccessCodes } = useAppContext();
  
  const [eventDate, setEventDate] = useState(state.settings.eventDate);
  const [maxSeats, setMaxSeats] = useState(state.settings.maxSeats);
  const [seatsPerTable, setSeatsPerTable] = useState(state.settings.seatsPerTable);
  const [coupleNames, setCoupleNames] = useState(state.settings.coupleNames);
  const [venue, setVenue] = useState(state.settings.venue);
  const [welcomeImage, setWelcomeImage] = useState(state.settings.welcomeImage || '');
  
  const [numCodes, setNumCodes] = useState(50);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  
  // Stats calculations
  const totalGuests = Object.keys(state.guests).filter(code => code !== 'ADMIN').length;
  const arrivedGuests = Object.values(state.guests)
    .filter(guest => guest.arrived).length;
  const confirmedGuests = Object.values(state.guests)
    .filter(guest => guest.seatNumber !== null).length;
  const mealsServed = Object.values(state.guests)
    .filter(guest => guest.mealServed).length;
  const drinksServed = Object.values(state.guests)
    .filter(guest => guest.drinkServed).length;
  
  const handleSaveSettings = () => {
    updateSettings({
      eventDate,
      maxSeats,
      seatsPerTable,
      coupleNames,
      venue,
      welcomeImage
    });
    
    toast.success('Settings saved successfully!');
  };
  
  const handleGenerateCodes = () => {
    if (numCodes <= 0 || numCodes > 300) {
      toast.error('Please enter a number between 1 and 300');
      return;
    }
    
    const newCodes = generateAccessCodes(numCodes);
    setGeneratedCodes(newCodes);
    toast.success(`Generated ${numCodes} new access codes`);
  };
  
  const handleDownloadCodes = () => {
    if (generatedCodes.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,Access Code\n";
    generatedCodes.forEach(code => {
      csvContent += code + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "access_codes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl mb-2 font-semibold">Total Guests</h3>
          <p className="text-3xl text-rose-600 font-bold">{totalGuests}</p>
          <p className="text-sm text-gray-500 mt-2">Maximum capacity: {state.settings.maxSeats}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl mb-2 font-semibold">Arrived Guests</h3>
          <p className="text-3xl text-green-600 font-bold">{arrivedGuests}</p>
          <p className="text-sm text-gray-500 mt-2">Out of {confirmedGuests} confirmed</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl mb-2 font-semibold">Meals Served</h3>
          <p className="text-3xl text-amber-600 font-bold">{mealsServed}</p>
          <p className="text-sm text-gray-500 mt-2">Drinks served: {drinksServed}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl mb-4 font-semibold">Quick Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="event-date" className="block text-gray-700 mb-2">Wedding Date</label>
            <input 
              type="datetime-local" 
              id="event-date" 
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
          
          <div>
            <label htmlFor="max-seats" className="block text-gray-700 mb-2">Total Seats (max 300)</label>
            <input 
              type="number" 
              id="max-seats" 
              min="1" 
              max="300" 
              value={maxSeats}
              onChange={(e) => setMaxSeats(parseInt(e.target.value) || 300)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
          
          <div>
            <label htmlFor="seats-per-table" className="block text-gray-700 mb-2">Seats Per Table</label>
            <input 
              type="number" 
              id="seats-per-table" 
              min="1" 
              max="20" 
              value={seatsPerTable}
              onChange={(e) => setSeatsPerTable(parseInt(e.target.value) || 10)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <p className="text-sm text-gray-500 mt-1">
              Table mapping: Seats 1-{seatsPerTable} = Table 1, Seats {seatsPerTable + 1}-{seatsPerTable * 2} = Table 2, etc.
            </p>
          </div>
          
          <div>
            <label htmlFor="couple-names" className="block text-gray-700 mb-2">Couple Names</label>
            <input 
              type="text" 
              id="couple-names" 
              value={coupleNames}
              onChange={(e) => setCoupleNames(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
          
          <div>
            <label htmlFor="venue" className="block text-gray-700 mb-2">Venue</label>
            <input 
              type="text" 
              id="venue" 
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="welcome-image" className="block text-gray-700 mb-2">Welcome Page Image URL</label>
            <input 
              type="text" 
              id="welcome-image" 
              value={welcomeImage}
              onChange={(e) => setWelcomeImage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Enter image URL for welcome page"
            />
            {welcomeImage && (
              <div className="mt-2">
                <img 
                  src={welcomeImage} 
                  alt="Welcome preview" 
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleSaveSettings}
          className="mt-6 bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 transition duration-300"
        >
          Save Settings
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl mb-4 font-semibold">Generate Access Codes</h3>
        <p className="mb-4 text-gray-600">Generate unique 5-character alphanumeric codes for your guests.</p>
        
        <div className="mb-4">
          <label htmlFor="num-codes" className="block text-gray-700 mb-2">Number of Codes to Generate</label>
          <input 
            type="number" 
            id="num-codes" 
            min="1" 
            max="300" 
            value={numCodes}
            onChange={(e) => setNumCodes(parseInt(e.target.value) || 50)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>
        
        <button 
          onClick={handleGenerateCodes}
          className="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 transition duration-300"
        >
          Generate Codes
        </button>
        
        {generatedCodes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Generated Access Codes</h4>
            <div className="border p-4 rounded-lg max-h-60 overflow-y-auto bg-gray-50">
              {generatedCodes.map((code, index) => (
                <div key={index} className="mb-1">{code}</div>
              ))}
            </div>
            
            <button 
              onClick={handleDownloadCodes}
              className="mt-4 bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Download as CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;