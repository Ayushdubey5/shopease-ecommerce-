'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductSubmission from "@/components/ProductSubmission";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Product Management</h1>
      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Product Submission</TabsTrigger>
          <TabsTrigger value="products">My Products</TabsTrigger>
        </TabsList>
        <TabsContent value="submit">
          <ProductSubmission />
        </TabsContent>
        <TabsContent value="products">
          <ProductList />
        </TabsContent>
      </Tabs>
    </div>
  );
}