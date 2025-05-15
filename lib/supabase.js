import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const productService = {
  async getAllProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { data: null, error: error.message };
    }
  },

  async createProduct({ name, price, description, imageUrl }) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name,
            price,
            description,
            image_url: imageUrl, // ensure column is `image_url` in DB
          },
        ])
        .select();

      if (error) throw error;
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Error creating product:', error);
      return { data: null, error: error.message };
    }
  }
};

export default supabase;
