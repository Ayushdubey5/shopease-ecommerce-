'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-blue-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-900">
            ShopEase
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/cart" 
              className="flex items-center text-blue-900 hover:text-blue-700"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <Badge variant="secondary" className="ml-1">
                {cartCount || 0}
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}