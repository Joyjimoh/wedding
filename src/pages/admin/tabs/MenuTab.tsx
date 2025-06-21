import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';
import MenuItems from '../../../components/food/MenuItems';
import { FoodItem, DrinkItem } from '../../../types';

const MenuTab: React.FC = () => {
  const { state, addFoodItem, removeFoodItem, addDrinkItem, removeDrinkItem } = useAppContext();
  
  // Food form state
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodImage, setFoodImage] = useState('');
  const [foodCategory, setFoodCategory] = useState<'main' | 'appetizer' | 'dessert'>('main');
  
  // Drink form state
  const [drinkName, setDrinkName] = useState('');
  const [drinkDescription, setDrinkDescription] = useState('');
  const [drinkImage, setDrinkImage] = useState('');
  const [drinkCategory, setDrinkCategory] = useState<'alcoholic' | 'non-alcoholic' | 'water'>('alcoholic');
  
  const handleAddFood = () => {
    if (!foodName.trim() || !foodDescription.trim() || !foodImage.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    
    const newFood: FoodItem = {
      name: foodName.trim(),
      description: foodDescription.trim(),
      imageUrl: foodImage.trim(),
      category: foodCategory
    };
    
    addFoodItem(newFood);
    
    // Clear form
    setFoodName('');
    setFoodDescription('');
    setFoodImage('');
    
    toast.success('Food item added to menu!');
  };
  
  const handleAddDrink = () => {
    if (!drinkName.trim() || !drinkDescription.trim() || !drinkImage.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    
    const newDrink: DrinkItem = {
      name: drinkName.trim(),
      description: drinkDescription.trim(),
      imageUrl: drinkImage.trim(),
      category: drinkCategory
    };
    
    addDrinkItem(newDrink);
    
    // Clear form
    setDrinkName('');
    setDrinkDescription('');
    setDrinkImage('');
    
    toast.success('Drink item added to menu!');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl mb-4 font-semibold">Food Menu</h3>
        
        <div className="mb-4">
          <label htmlFor="food-name" className="block text-gray-700 mb-2">Food Name</label>
          <input 
            type="text" 
            id="food-name" 
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter food name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="food-description" className="block text-gray-700 mb-2">Description</label>
          <textarea 
            id="food-description" 
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter food description" 
            rows={2}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="food-image" className="block text-gray-700 mb-2">Image URL</label>
          <input 
            type="text" 
            id="food-image" 
            value={foodImage}
            onChange={(e) => setFoodImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="food-category" className="block text-gray-700 mb-2">Category</label>
          <select 
            id="food-category" 
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="main">Main Course</option>
            <option value="appetizer">Appetizer</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        
        <button 
          onClick={handleAddFood}
          className="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 transition duration-300"
        >
          Add Food Item
        </button>
        
        <div className="mt-8">
          <h4 className="font-semibold mb-4">Current Food Items</h4>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Main Courses</h5>
            <MenuItems 
              items={state.foodMenu} 
              category="main" 
              isAdmin 
              onDelete={removeFoodItem} 
            />
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Appetizers</h5>
            <MenuItems 
              items={state.foodMenu} 
              category="appetizer" 
              isAdmin 
              onDelete={removeFoodItem} 
            />
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Desserts</h5>
            <MenuItems 
              items={state.foodMenu} 
              category="dessert" 
              isAdmin 
              onDelete={removeFoodItem} 
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl mb-4 font-semibold">Drinks Menu</h3>
        
        <div className="mb-4">
          <label htmlFor="drink-name" className="block text-gray-700 mb-2">Drink Name</label>
          <input 
            type="text" 
            id="drink-name" 
            value={drinkName}
            onChange={(e) => setDrinkName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter drink name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="drink-description" className="block text-gray-700 mb-2">Description</label>
          <textarea 
            id="drink-description" 
            value={drinkDescription}
            onChange={(e) => setDrinkDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter drink description" 
            rows={2}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="drink-image" className="block text-gray-700 mb-2">Image URL</label>
          <input 
            type="text" 
            id="drink-image" 
            value={drinkImage}
            onChange={(e) => setDrinkImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="drink-category" className="block text-gray-700 mb-2">Category</label>
          <select 
            id="drink-category" 
            value={drinkCategory}
            onChange={(e) => setDrinkCategory(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="alcoholic">Alcoholic</option>
            <option value="non-alcoholic">Non-Alcoholic</option>
            <option value="water">Water</option>
          </select>
        </div>
        
        <button 
          onClick={handleAddDrink}
          className="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 transition duration-300"
        >
          Add Drink Item
        </button>
        
        <div className="mt-8">
          <h4 className="font-semibold mb-4">Current Drink Items</h4>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Alcoholic Beverages</h5>
            <MenuItems 
              items={state.drinkMenu} 
              category="alcoholic" 
              isAdmin 
              onDelete={removeDrinkItem} 
            />
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Non-Alcoholic Beverages</h5>
            <MenuItems 
              items={state.drinkMenu} 
              category="non-alcoholic" 
              isAdmin 
              onDelete={removeDrinkItem} 
            />
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Water</h5>
            <MenuItems 
              items={state.drinkMenu} 
              category="water" 
              isAdmin 
              onDelete={removeDrinkItem} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTab;