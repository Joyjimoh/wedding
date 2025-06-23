import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';
import EditableCell from '../../../components/common/EditableCell';
import EditableToggle from '../../../components/common/EditableToggle';
import { Guest } from '../../../types';
import { Upload } from 'lucide-react';

const GuestsTab: React.FC = () => {
  const { state, updateGuestDetails, generateAccessCodes } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filter guests based on search term
  const filteredGuests = Object.entries(state.guests)
    .filter(([code, guest]) => {
      if (code === 'ADMIN') return false;
      
      const lowerSearchTerm = searchTerm.toLowerCase();
      return code.toLowerCase().includes(lowerSearchTerm) || 
             guest.name.toLowerCase().includes(lowerSearchTerm);
    });
  
  const handleUpdateGuest = (code: string, field: keyof Guest, value: any) => {
    updateGuestDetails(code, { [field]: value });
    toast.success(`Guest ${field} updated`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      // Expected headers: name, category (optional)
      const nameIndex = headers.findIndex(h => h.includes('name'));
      const categoryIndex = headers.findIndex(h => h.includes('category'));
      
      if (nameIndex === -1) {
        toast.error('CSV must contain a "name" column');
        return;
      }

      const guestsToAdd: Array<{name: string, category: 'regular' | 'premium' | 'family'}> = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim());
        const name = values[nameIndex];
        const category = categoryIndex !== -1 ? 
          (values[categoryIndex]?.toLowerCase() as 'regular' | 'premium' | 'family') || 'regular' : 
          'regular';
        
        if (name) {
          guestsToAdd.push({ name, category });
        }
      }

      if (guestsToAdd.length === 0) {
        toast.error('No valid guest data found in CSV');
        return;
      }

      // Generate access codes for all guests
      const newCodes = generateAccessCodes(guestsToAdd.length);
      
      // Update guest details with categories
      guestsToAdd.forEach((guestData, index) => {
        const code = newCodes[index];
        updateGuestDetails(code, {
          name: guestData.name,
          category: guestData.category,
          arrived: false,
          mealServed: false,
          drinkServed: false,
          seatNumber: null
        });
      });

      toast.success(`Successfully uploaded ${guestsToAdd.length} guests`);
    };
    
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'family': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTableNumber = (seatNumber: number | null): number | null => {
    if (!seatNumber) return null;
    return Math.ceil(seatNumber / state.settings.seatsPerTable);
  };
  
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-xl font-semibold mb-4 md:mb-0">Guest Management</h3>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
              placeholder="Search guests..."
            />
            
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                <Upload size={16} />
                Upload CSV
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 mb-2">
            <strong>CSV Upload Format:</strong> Your CSV file should have columns: "name" (required), "category" (optional: regular, premium, family)
          </p>
          <p className="text-sm text-blue-600">
            Example: name,category<br/>
            John Doe,premium<br/>
            Jane Smith,family
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Access Code
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seat #
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Table #
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Arrived
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Food Selection
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Meal Served
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Drink Selection
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Drink Served
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map(([code, guest]) => (
                <tr key={code}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {code}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <EditableCell
                      value={guest.name}
                      onSave={(newValue) => handleUpdateGuest(code, 'name', newValue)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <EditableCell
                      value={guest.category || 'regular'}
                      onSave={(newValue) => handleUpdateGuest(code, 'category', newValue)}
                      type="select"
                      options={['regular', 'premium', 'family']}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {guest.seatNumber || 'Not assigned'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {getTableNumber(guest.seatNumber) || 'Not assigned'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <EditableToggle
                      value={guest.arrived}
                      onToggle={(newValue) => handleUpdateGuest(code, 'arrived', newValue)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {guest.selectedFood || 'Not selected'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <EditableToggle
                      value={guest.mealServed}
                      onToggle={(newValue) => handleUpdateGuest(code, 'mealServed', newValue)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {guest.selectedDrink || 'Not selected'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <EditableToggle
                      value={guest.drinkServed}
                      onToggle={(newValue) => handleUpdateGuest(code, 'drinkServed', newValue)}
                    />
                  </td>
                </tr>
              ))}
              
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-4 text-center text-gray-500">
                    No guests found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuestsTab;