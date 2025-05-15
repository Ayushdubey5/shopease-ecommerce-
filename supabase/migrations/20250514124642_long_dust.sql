/*
  # Create products table

  1. New Table
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `price` (numeric, required)
      - `description` (text, required)
      - `image_url` (text, optional)
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for authenticated users to create products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);