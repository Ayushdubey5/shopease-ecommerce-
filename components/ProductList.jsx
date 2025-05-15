'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultProducts = [
  {
    id: 'default-1',
    name: 'Modern Office Chair',
    price: 299.99,
    description: 'Ergonomic office chair with lumbar support and adjustable height',
    imageUrl: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg'
  },
  {
    id: 'default-2',
    name: 'Smart 4K TV',
    price: 799.99,
    description: '55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps',
    imageUrl: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg'
  },
  {
    id: 'default-3',
    name: 'Gaming Laptop',
    price: 1299.99,
    description: 'High-performance gaming laptop with RGB keyboard and RTX graphics',
    imageUrl: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg'
  },
  {
    id: 'default-4',
    name: 'Wireless Earbuds',
    price: 149.99,
    description: 'Premium wireless earbuds with active noise cancellation and long battery life',
    imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'
  }
];

export default function ProductList() {
  const { toast } = useToast();
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (Array.isArray(data)) {
        setProducts([...defaultProducts, ...data]);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Could not load additional products. Showing default products only.');
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(product => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    const productText = `${product.name} ${product.description}`.toLowerCase();
    return searchTerms.every(term => productText.includes(term));
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            {product.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-lg font-medium text-primary mb-2">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              <p className="text-muted-foreground line-clamp-3 mb-4">{product.description}</p>
              <Button 
                onClick={() => addToCart(product)}
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No products found matching your search.
        </div>
      )}
    </div>
  );
}