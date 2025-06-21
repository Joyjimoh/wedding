import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';
import Modal from '../../../components/common/Modal';
import { Guest } from '../../../types';
import { Upload } from 'lucide-react';

const GuestsTab: React.FC = () => {
  const { state, updateGuestDetails, generateAccessCodes } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editGuest, setEditGuest] = useState<{
    code: string;
    guest: Guest;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filter guests based on search term
  const filteredGuests = Object.entries(state.guests)
    .filter(([code, guest]) => {
      if (code === 'ADMIN') return false;
      
      const lowerSearchTerm = searchTerm.toLowerCase();
      return code.toLowerCase().includes(lowerSearchTerm) || 
             guest.name.toLowerCase().includes(lowerSearchTerm);
    });
  
  const handleEditGuest = (code: string, guest: Guest) => {
    setEditGuest({ code, guest });
    setShowEditModal(true);
  };
  
  const handleSaveGuestEdit = () => {
    if (!editGuest) return;
    
    const { code, guest } = editGuest;
    
    updateGuestDetails(code, {
      name: guest.name,
      arrived: guest.arrived,
      mealServed: guest.mealServed,
      drinkServed: guest.drinkServed,
      selectedFood: guest.selectedFood,
      selectedDrink: guest.selectedDrink,
      category: guest.category
    });
    
    setShowEditModal(false);
    toast.success('Guest details updated');
  };
  
  const toggleGuestStatus = (code: string, field: keyof Guest) => {
    const guest = state.guests[code];
    if (!guest) return;
    
    const newValue = !guest[field];
    
    updateGuestDetails(code, {
      [field]: newValue
    } as any);
    
    toast.success(`Guest ${field} status updated`);
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
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
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
                    {guest.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(guest.category)}`}>
                      {guest.category || 'regular'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span 
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        guest.arrived 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {guest.arrived ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {guest.selectedFood || 'Not selected'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={guest.mealServed}
                        onChange={() => toggleGuestStatus(code, 'mealServed')}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                        guest.mealServed 
                          ? 'bg-green-200 border-green-400' 
                          : 'bg-red-200 border-red-400'
                      }`}>
                        {guest.mealServed && (
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </label>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {guest.selectedDrink || 'Not selected'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={guest.drinkServed}
                        onChange={() => toggleGuestStatus(code, 'drinkServed')}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                        guest.drinkServed 
                          ? 'bg-green-200 border-green-400' 
                          : 'bg-red-200 border-red-400'
                      }`}>
                        {guest.drinkServed && (
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </label>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button 
                      onClick={() => handleEditGuest(code, guest)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-4 text-center text-gray-500">
                    No guests found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Guest Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit Guest: ${editGuest?.code || ''}`}
      >
        {editGuest && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Guest Name:</label>
              <input 
                type="text" 
                value={editGuest.guest.name}
                onChange={(e) => setEditGuest({
                  ...editGuest,
                  guest: { ...editGuest.guest, name: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category:</label>
              <select 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                value={editGuest.guest.category || 'regular'}
                onChange={(e) => setEditGuest({
                  ...editGuest,
                  guest: { 
                    ...editGuest.guest, 
                    category: e.target.value as 'regular' | 'premium' | 'family'
                  }
                })}
              >
                <option value="regular">Regular</option>
                <option value="premium">Premium</option>
                <option value="family">Family</option>
              </select>
            </div>
            
            <div className="flex items-center mb-4">
              <input 
                type="checkbox"
                id="arrived-check"
                checked={editGuest.guest.arrived}
                onChange={(e) => setEditGuest({
                  ...editGuest,
                  guest: { ...editGuest.guest, arrived: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="arrived-check">Guest has arrived</label>
            </div>
            
            <div className="flex items-center mb-4">
              <input 
                type="checkbox"
                id="meal-check"
                checked={editGuest.guest.mealServed}
                onChange={(e) => setEditGuest({
                  ...editGuest,
                  guest: { ...editGuest.guest, mealServed: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="meal-check">Meal has been served</label>
            </div>
            
            <div className="flex items-center mb-6">
              <input 
                type="checkbox"
                id="drink-check"
                checked={editGuest.guest.drinkServed}
                onChange={(e) => setEditGuest({
                  ...editGuest,
                  guest: { ...editGuest.guest, drinkServed: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="drink-check">Drink has been served</label>
            </div>
            
            <button 
              onClick={handleSaveGuestEdit}
              className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GuestsTab;