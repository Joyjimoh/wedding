import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';
import { AsoebiItem } from '../../../types';

const AsoebiTab: React.FC = () => {
  const { state, addAsoebiItem, removeAsoebiItem } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'unisex'>('unisex');
  
  const handleAddAsoebi = () => {
    if (!title.trim() || !description.trim() || !imageUrl.trim() || !price.trim()) {
      toast.error('Please fill all fields correctly');
      return;
    }
    
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    const newItem: AsoebiItem = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      price: priceValue,
      gender
    };
    
    addAsoebiItem(newItem);
    
    // Clear form
    setTitle('');
    setDescription('');
    setImageUrl('');
    setPrice('');
    
    toast.success('Asoebi item added!');
  };
  
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl mb-4 font-semibold">Manage Wedding Attire (Asoebi)</h3>
        
        <div className="mb-4">
          <label htmlFor="asoebi-title" className="block text-gray-700 mb-2">Title</label>
          <input 
            type="text" 
            id="asoebi-title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="asoebi-description" className="block text-gray-700 mb-2">Description</label>
          <textarea 
            id="asoebi-description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter description" 
            rows={2}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="asoebi-image" className="block text-gray-700 mb-2">Image URL</label>
          <input 
            type="text" 
            id="asoebi-image" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="asoebi-price" className="block text-gray-700 mb-2">Price</label>
          <input 
            type="number" 
            id="asoebi-price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="asoebi-gender" className="block text-gray-700 mb-2">Gender</label>
          <select 
            id="asoebi-gender" 
            value={gender}
            onChange={(e) => setGender(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        
        <button 
          onClick={handleAddAsoebi}
          className="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 transition duration-300"
        >
          Add Asoebi Item
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl mb-4 font-semibold">Current Asoebi Items</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {state.asoebiItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-rose-600 font-semibold mb-1 text-sm">₦{item.price.}</p>
                <p className="text-xs text-gray-600 mb-2">
                  For: {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)}
                </p>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                <button 
                  onClick={() => {
                    removeAsoebiItem(index);
                    toast.success('Asoebi item removed');
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 w-full text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          {state.asoebiItems.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No asoebi items available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsoebiTab;