import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Settings, 
  Guest, 
  PhotoItem, 
  FoodItem, 
  DrinkItem,
  AsoebiItem,
  RegistryItem,
  PaymentDetails,
  WeddingPartyMember
} from '../types';

export const useSupabase = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Settings
  const getSettings = async (): Promise<Settings | null> => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return null;
      }
      
      const settingsData = data[0];
      return {
        coupleNames: settingsData.couple_names,
        eventDate: settingsData.event_date,
        venue: settingsData.venue,
        maxSeats: settingsData.max_seats,
        welcomeImage: settingsData.welcome_image
      };
    } catch (err) {
      console.error('Error fetching settings:', err);
      return null;
    }
  };

  const updateSettings = async (settings: Partial<Settings>): Promise<boolean> => {
    try {
      // Get the most recent settings record to update
      const { data: existingData, error: fetchError } = await supabase
        .from('settings')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (fetchError) throw fetchError;
      
      if (!existingData || existingData.length === 0) {
        // No settings exist, create new one
        const { error } = await supabase
          .from('settings')
          .insert({
            couple_names: settings.coupleNames || '',
            event_date: settings.eventDate || new Date().toISOString(),
            venue: settings.venue || '',
            max_seats: settings.maxSeats || 300,
            welcome_image: settings.welcomeImage || null
          });
        
        if (error) throw error;
      } else {
        // Update existing settings
        const { error } = await supabase
          .from('settings')
          .update({
            couple_names: settings.coupleNames,
            event_date: settings.eventDate,
            venue: settings.venue,
            max_seats: settings.maxSeats,
            welcome_image: settings.welcomeImage,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData[0].id);
        
        if (error) throw error;
      }
      
      return true;
    } catch (err) {
      console.error('Error updating settings:', err);
      return false;
    }
  };

  // Guests
  const getGuests = async (): Promise<Record<string, Guest>> => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*');
      
      if (error) throw error;
      
      const guests: Record<string, Guest> = {};
      data.forEach(guest => {
        guests[guest.access_code] = {
          name: guest.name,
          seatNumber: guest.seat_number,
          arrived: guest.arrived,
          mealServed: guest.meal_served,
          drinkServed: guest.drink_served,
          selectedFood: guest.selected_food,
          selectedDrink: guest.selected_drink,
          category: guest.category || 'regular'
        };
      });
      
      return guests;
    } catch (err) {
      console.error('Error fetching guests:', err);
      return {};
    }
  };

  const addGuest = async (accessCode: string, name: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('guests')
        .insert({
          access_code: accessCode,
          name: name,
          category: 'regular'
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding guest:', err);
      return false;
    }
  };

  const updateGuest = async (accessCode: string, updates: Partial<Guest>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('guests')
        .update({
          name: updates.name,
          seat_number: updates.seatNumber,
          arrived: updates.arrived,
          meal_served: updates.mealServed,
          drink_served: updates.drinkServed,
          selected_food: updates.selectedFood,
          selected_drink: updates.selectedDrink,
          category: updates.category,
          updated_at: new Date().toISOString()
        })
        .eq('access_code', accessCode);
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error updating guest:', err);
      return false;
    }
  };

  // Gallery
  const getGallery = async (): Promise<PhotoItem[]> => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(item => ({
        title: item.title,
        imageUrl: item.image_url
      }));
    } catch (err) {
      console.error('Error fetching gallery:', err);
      return [];
    }
  };

  const addGalleryPhoto = async (photo: PhotoItem): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('gallery')
        .insert({
          title: photo.title,
          image_url: photo.imageUrl
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding gallery photo:', err);
      return false;
    }
  };

  const removeGalleryPhoto = async (index: number): Promise<boolean> => {
    try {
      // Get all photos to find the one at the index
      const { data, error: fetchError } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      if (data && data[index]) {
        const { error } = await supabase
          .from('gallery')
          .delete()
          .eq('id', data[index].id);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error removing gallery photo:', err);
      return false;
    }
  };

  // Food Menu
  const getFoodMenu = async (): Promise<FoodItem[]> => {
    try {
      const { data, error } = await supabase
        .from('food_menu')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(item => ({
        name: item.name,
        description: item.description,
        imageUrl: item.image_url,
        category: item.category as 'main' | 'appetizer' | 'dessert'
      }));
    } catch (err) {
      console.error('Error fetching food menu:', err);
      return [];
    }
  };

  const addFoodItem = async (item: FoodItem): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('food_menu')
        .insert({
          name: item.name,
          description: item.description,
          image_url: item.imageUrl,
          category: item.category
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding food item:', err);
      return false;
    }
  };

  const removeFoodItem = async (index: number): Promise<boolean> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('food_menu')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      if (data && data[index]) {
        const { error } = await supabase
          .from('food_menu')
          .delete()
          .eq('id', data[index].id);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error removing food item:', err);
      return false;
    }
  };

  // Drink Menu
  const getDrinkMenu = async (): Promise<DrinkItem[]> => {
    try {
      const { data, error } = await supabase
        .from('drink_menu')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(item => ({
        name: item.name,
        description: item.description,
        imageUrl: item.image_url,
        category: item.category as 'alcoholic' | 'non-alcoholic' | 'water'
      }));
    } catch (err) {
      console.error('Error fetching drink menu:', err);
      return [];
    }
  };

  const addDrinkItem = async (item: DrinkItem): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('drink_menu')
        .insert({
          name: item.name,
          description: item.description,
          image_url: item.imageUrl,
          category: item.category
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding drink item:', err);
      return false;
    }
  };

  const removeDrinkItem = async (index: number): Promise<boolean> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('drink_menu')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      if (data && data[index]) {
        const { error } = await supabase
          .from('drink_menu')
          .delete()
          .eq('id', data[index].id);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error removing drink item:', err);
      return false;
    }
  };

  // Asoebi Items
  const getAsoebiItems = async (): Promise<AsoebiItem[]> => {
    try {
      const { data, error } = await supabase
        .from('asoebi_items')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(item => ({
        title: item.title,
        description: item.description,
        imageUrl: item.image_url,
        price: parseFloat(item.price.toString()),
        gender: item.gender as 'male' | 'female' | 'unisex'
      }));
    } catch (err) {
      console.error('Error fetching asoebi items:', err);
      return [];
    }
  };

  const addAsoebiItem = async (item: AsoebiItem): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('asoebi_items')
        .insert({
          title: item.title,
          description: item.description,
          image_url: item.imageUrl,
          price: item.price,
          gender: item.gender
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding asoebi item:', err);
      return false;
    }
  };

  const removeAsoebiItem = async (index: number): Promise<boolean> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('asoebi_items')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      if (data && data[index]) {
        const { error } = await supabase
          .from('asoebi_items')
          .delete()
          .eq('id', data[index].id);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error removing asoebi item:', err);
      return false;
    }
  };

  // Registry Items
  const getRegistryItems = async (): Promise<RegistryItem[]> => {
    try {
      const { data, error } = await supabase
        .from('registry_items')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(item => ({
        item: item.item,
        description: item.description,
        imageUrl: item.image_url,
        price: parseFloat(item.price.toString()),
        link: item.link
      }));
    } catch (err) {
      console.error('Error fetching registry items:', err);
      return [];
    }
  };

  const addRegistryItem = async (item: RegistryItem): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('registry_items')
        .insert({
          item: item.item,
          description: item.description,
          image_url: item.imageUrl,
          price: item.price,
          link: item.link
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding registry item:', err);
      return false;
    }
  };

  const removeRegistryItem = async (index: number): Promise<boolean> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('registry_items')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      if (data && data[index]) {
        const { error } = await supabase
          .from('registry_items')
          .delete()
          .eq('id', data[index].id);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error removing registry item:', err);
      return false;
    }
  };

  // Payment Details
  const getPaymentDetails = async (): Promise<PaymentDetails | null> => {
    try {
      const { data, error } = await supabase
        .from('payment_details')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return null;
      }
      
      const paymentData = data[0];
      return {
        accountName: paymentData.account_name,
        accountNumber: paymentData.account_number,
        bankName: paymentData.bank_name,
        whatsappNumber: paymentData.whatsapp_number
      };
    } catch (err) {
      console.error('Error fetching payment details:', err);
      return null;
    }
  };

  const updatePaymentDetails = async (details: PaymentDetails): Promise<boolean> => {
    try {
      // Get the most recent payment details record to update
      const { data: existingData, error: fetchError } = await supabase
        .from('payment_details')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (fetchError) throw fetchError;
      
      if (!existingData || existingData.length === 0) {
        // No payment details exist, create new one
        const { error } = await supabase
          .from('payment_details')
          .insert({
            account_name: details.accountName,
            account_number: details.accountNumber,
            bank_name: details.bankName,
            whatsapp_number: details.whatsappNumber
          });
        
        if (error) throw error;
      } else {
        // Update existing payment details
        const { error } = await supabase
          .from('payment_details')
          .update({
            account_name: details.accountName,
            account_number: details.accountNumber,
            bank_name: details.bankName,
            whatsapp_number: details.whatsappNumber,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData[0].id);
        
        if (error) throw error;
      }
      
      return true;
    } catch (err) {
      console.error('Error updating payment details:', err);
      return false;
    }
  };

  // Wedding Party
  const getWeddingParty = async (): Promise<WeddingPartyMember[]> => {
    try {
      const { data, error } = await supabase
        .from('wedding_party')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(member => ({
        name: member.name,
        role: member.role,
        imageUrl: member.image_url,
        bio: member.bio || ''
      }));
    } catch (err) {
      console.error('Error fetching wedding party:', err);
      return [];
    }
  };

  const addWeddingPartyMember = async (member: WeddingPartyMember): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('wedding_party')
        .insert({
          name: member.name,
          role: member.role,
          image_url: member.imageUrl,
          bio: member.bio || ''
        });
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding wedding party member:', err);
      return false;
    }
  };

  const removeWeddingPartyMember = async (index: number): Promise<boolean> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('wedding_party')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      if (data && data[index]) {
        const { error } = await supabase
          .from('wedding_party')
          .delete()
          .eq('id', data[index].id);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error removing wedding party member:', err);
      return false;
    }
  };

  return {
    loading,
    error,
    setLoading,
    setError,
    // Settings
    getSettings,
    updateSettings,
    // Guests
    getGuests,
    addGuest,
    updateGuest,
    // Gallery
    getGallery,
    addGalleryPhoto,
    removeGalleryPhoto,
    // Food Menu
    getFoodMenu,
    addFoodItem,
    removeFoodItem,
    // Drink Menu
    getDrinkMenu,
    addDrinkItem,
    removeDrinkItem,
    // Asoebi Items
    getAsoebiItems,
    addAsoebiItem,
    removeAsoebiItem,
    // Registry Items
    getRegistryItems,
    addRegistryItem,
    removeRegistryItem,
    // Payment Details
    getPaymentDetails,
    updatePaymentDetails,
    // Wedding Party
    getWeddingParty,
    addWeddingPartyMember,
    removeWeddingPartyMember
  };
};