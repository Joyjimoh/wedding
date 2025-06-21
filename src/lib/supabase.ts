import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema for wedding portal
export interface Database {
  public: {
    Tables: {
      settings: {
        Row: {
          id: number
          couple_names: string
          event_date: string
          venue: string
          max_seats: number
          welcome_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          couple_names: string
          event_date: string
          venue: string
          max_seats?: number
          welcome_image?: string | null
        }
        Update: {
          couple_names?: string
          event_date?: string
          venue?: string
          max_seats?: number
          welcome_image?: string | null
        }
      }
      guests: {
        Row: {
          id: number
          access_code: string
          name: string
          seat_number: number | null
          arrived: boolean
          meal_served: boolean
          drink_served: boolean
          selected_food: string | null
          selected_drink: string | null
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          access_code: string
          name: string
          seat_number?: number | null
          arrived?: boolean
          meal_served?: boolean
          drink_served?: boolean
          selected_food?: string | null
          selected_drink?: string | null
          category?: string
        }
        Update: {
          name?: string
          seat_number?: number | null
          arrived?: boolean
          meal_served?: boolean
          drink_served?: boolean
          selected_food?: string | null
          selected_drink?: string | null
          category?: string
        }
      }
      gallery: {
        Row: {
          id: number
          title: string
          image_url: string
          created_at: string
        }
        Insert: {
          title: string
          image_url: string
        }
        Update: {
          title?: string
          image_url?: string
        }
      }
      food_menu: {
        Row: {
          id: number
          name: string
          description: string
          image_url: string
          category: 'main' | 'appetizer' | 'dessert'
          created_at: string
        }
        Insert: {
          name: string
          description: string
          image_url: string
          category: 'main' | 'appetizer' | 'dessert'
        }
        Update: {
          name?: string
          description?: string
          image_url?: string
          category?: 'main' | 'appetizer' | 'dessert'
        }
      }
      drink_menu: {
        Row: {
          id: number
          name: string
          description: string
          image_url: string
          category: 'alcoholic' | 'non-alcoholic' | 'water'
          created_at: string
        }
        Insert: {
          name: string
          description: string
          image_url: string
          category: 'alcoholic' | 'non-alcoholic' | 'water'
        }
        Update: {
          name?: string
          description?: string
          image_url?: string
          category?: 'alcoholic' | 'non-alcoholic' | 'water'
        }
      }
      asoebi_items: {
        Row: {
          id: number
          title: string
          description: string
          image_url: string
          price: number
          gender: 'male' | 'female' | 'unisex'
          created_at: string
        }
        Insert: {
          title: string
          description: string
          image_url: string
          price: number
          gender: 'male' | 'female' | 'unisex'
        }
        Update: {
          title?: string
          description?: string
          image_url?: string
          price?: number
          gender?: 'male' | 'female' | 'unisex'
        }
      }
      registry_items: {
        Row: {
          id: number
          item: string
          description: string
          image_url: string
          price: number
          link: string
          created_at: string
        }
        Insert: {
          item: string
          description: string
          image_url: string
          price: number
          link: string
        }
        Update: {
          item?: string
          description?: string
          image_url?: string
          price?: number
          link?: string
        }
      }
      payment_details: {
        Row: {
          id: number
          account_name: string
          account_number: string
          bank_name: string
          whatsapp_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          account_name: string
          account_number: string
          bank_name: string
          whatsapp_number: string
        }
        Update: {
          account_name?: string
          account_number?: string
          bank_name?: string
          whatsapp_number?: string
        }
      }
      wedding_party: {
        Row: {
          id: number
          name: string
          role: string
          image_url: string
          bio: string
          created_at: string
        }
        Insert: {
          name: string
          role: string
          image_url: string
          bio?: string
        }
        Update: {
          name?: string
          role?: string
          image_url?: string
          bio?: string
        }
      }
    }
  }
}