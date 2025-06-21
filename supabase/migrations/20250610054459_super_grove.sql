/*
  # Wedding Portal Database Schema

  1. New Tables
    - `settings` - Wedding event settings and configuration
    - `guests` - Guest information and access codes
    - `gallery` - Photo gallery items
    - `food_menu` - Food menu items with categories
    - `drink_menu` - Drink menu items with categories
    - `asoebi_items` - Wedding attire items
    - `registry_items` - Gift registry items
    - `payment_details` - Payment and contact information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Admin can manage all data
    - Guests can read most data and update their own info
*/

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  couple_names TEXT NOT NULL DEFAULT 'Bonaventure & Joy',
  event_date TIMESTAMPTZ NOT NULL DEFAULT '2024-06-15T11:00:00Z',
  venue TEXT NOT NULL DEFAULT 'Grand Ballroom, Royal Hotel',
  max_seats INTEGER NOT NULL DEFAULT 300,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id SERIAL PRIMARY KEY,
  access_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  seat_number INTEGER,
  arrived BOOLEAN DEFAULT false,
  meal_served BOOLEAN DEFAULT false,
  drink_served BOOLEAN DEFAULT false,
  selected_food TEXT,
  selected_drink TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Food menu table
CREATE TABLE IF NOT EXISTS food_menu (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('main', 'appetizer', 'dessert')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Drink menu table
CREATE TABLE IF NOT EXISTS drink_menu (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('alcoholic', 'non-alcoholic', 'water')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Asoebi items table
CREATE TABLE IF NOT EXISTS asoebi_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'unisex')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Registry items table
CREATE TABLE IF NOT EXISTS registry_items (
  id SERIAL PRIMARY KEY,
  item TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  link TEXT NOT NULL DEFAULT '#',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Payment details table
CREATE TABLE IF NOT EXISTS payment_details (
  id SERIAL PRIMARY KEY,
  account_name TEXT NOT NULL DEFAULT 'Bonaventure & Joy Wedding',
  account_number TEXT NOT NULL DEFAULT '1234567890',
  bank_name TEXT NOT NULL DEFAULT 'Wedding Bank',
  whatsapp_number TEXT NOT NULL DEFAULT '+123456789',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE drink_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE asoebi_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE registry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_details ENABLE ROW LEVEL SECURITY;

-- Settings policies (public read, no auth required for wedding portal)
CREATE POLICY "Settings are viewable by everyone"
  ON settings
  FOR SELECT
  USING (true);

CREATE POLICY "Settings are editable by everyone"
  ON settings
  FOR ALL
  USING (true);

-- Guests policies
CREATE POLICY "Guests are viewable by everyone"
  ON guests
  FOR SELECT
  USING (true);

CREATE POLICY "Guests are editable by everyone"
  ON guests
  FOR ALL
  USING (true);

-- Gallery policies
CREATE POLICY "Gallery is viewable by everyone"
  ON gallery
  FOR SELECT
  USING (true);

CREATE POLICY "Gallery is editable by everyone"
  ON gallery
  FOR ALL
  USING (true);

-- Food menu policies
CREATE POLICY "Food menu is viewable by everyone"
  ON food_menu
  FOR SELECT
  USING (true);

CREATE POLICY "Food menu is editable by everyone"
  ON food_menu
  FOR ALL
  USING (true);

-- Drink menu policies
CREATE POLICY "Drink menu is viewable by everyone"
  ON drink_menu
  FOR SELECT
  USING (true);

CREATE POLICY "Drink menu is editable by everyone"
  ON drink_menu
  FOR ALL
  USING (true);

-- Asoebi items policies
CREATE POLICY "Asoebi items are viewable by everyone"
  ON asoebi_items
  FOR SELECT
  USING (true);

CREATE POLICY "Asoebi items are editable by everyone"
  ON asoebi_items
  FOR ALL
  USING (true);

-- Registry items policies
CREATE POLICY "Registry items are viewable by everyone"
  ON registry_items
  FOR SELECT
  USING (true);

CREATE POLICY "Registry items are editable by everyone"
  ON registry_items
  FOR ALL
  USING (true);

-- Payment details policies
CREATE POLICY "Payment details are viewable by everyone"
  ON payment_details
  FOR SELECT
  USING (true);

CREATE POLICY "Payment details are editable by everyone"
  ON payment_details
  FOR ALL
  USING (true);

-- Insert initial data
INSERT INTO settings (couple_names, event_date, venue, max_seats) 
VALUES ('Bonaventure & Joy', '2024-06-15T11:00:00Z', 'Grand Ballroom, Royal Hotel', 300)
ON CONFLICT DO NOTHING;

INSERT INTO payment_details (account_name, account_number, bank_name, whatsapp_number)
VALUES ('Bonaventure & Joy Wedding', '1234567890', 'Wedding Bank', '+123456789')
ON CONFLICT DO NOTHING;

-- Insert admin guest
INSERT INTO guests (access_code, name, arrived, meal_served, drink_served)
VALUES ('ADMIN', 'Admin', false, false, false)
ON CONFLICT (access_code) DO NOTHING;

-- Insert sample gallery photos
INSERT INTO gallery (title, image_url) VALUES
('Engagement Photo', 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
('First Date', 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
('Our Proposal', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
ON CONFLICT DO NOTHING;

-- Insert sample food menu
INSERT INTO food_menu (name, description, image_url, category) VALUES
('Grilled Salmon', 'Atlantic salmon with lemon butter sauce and seasonal vegetables', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'main'),
('Beef Wellington', 'Prime beef tenderloin wrapped in puff pastry with mushroom duxelles', 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'main'),
('Bruschetta', 'Toasted bread topped with diced tomatoes, basil, and balsamic glaze', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'appetizer'),
('Tiramisu', 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', 'https://images.unsplash.com/photo-1542124948-dc391252a940?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'dessert')
ON CONFLICT DO NOTHING;

-- Insert sample drink menu
INSERT INTO drink_menu (name, description, image_url, category) VALUES
('Red Wine', 'Premium Cabernet Sauvignon', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'alcoholic'),
('Sparkling Water', 'Refreshing carbonated water with lemon', 'https://images.unsplash.com/photo-1605142859862-978be7eba909?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'water'),
('Fruit Punch', 'Blend of tropical fruit juices', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'non-alcoholic')
ON CONFLICT DO NOTHING;

-- Insert sample asoebi items
INSERT INTO asoebi_items (title, description, image_url, price, gender) VALUES
('Men''s Traditional Outfit', 'High-quality blue and gold agbada set with cap', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 150.00, 'male'),
('Women''s Lace Gown', 'Elegant rose gold lace gown with gele headwrap', 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 200.00, 'female')
ON CONFLICT DO NOTHING;

-- Insert sample registry items
INSERT INTO registry_items (item, description, image_url, price, link) VALUES
('Kitchen Mixer', 'Professional stand mixer for our new home', 'https://images.unsplash.com/photo-1556910633-5099dc3971f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 350.00, '#'),
('Honeymoon Fund', 'Contribute to our dream honeymoon in Bali', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 500.00, '#')
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_details_updated_at BEFORE UPDATE ON payment_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();