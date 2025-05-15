'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-center gap-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-lg font-medium mt-2">${parseFloat(item.price).toFixed(2)}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
          
          <div className="mt-8 p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}