"use client";

import { Upload, Download, PenSquare, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";

// Supabase client initialization
const supabase = createClient(
  "https://suhnugrgknvbpoqanlgh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aG51Z3Jna252YnBvcWFubGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNzUyMTMsImV4cCI6MjA0Nzk1MTIxM30.oKPH92aETDbzAqHfvtYdFFmLvQVI4Sk6QCzQqrWwsZM"
);

interface Product {
  name: string;
  category: string;
  price: number;
  salePrice: number;
  stock: number;
  status: string;
  view: number;
  published: boolean;
  actions: string;
}

export default function ProductActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product>({
    name: "",
    category: "",
    price: 0,
    salePrice: 0,
    stock: 0,
    status: "",
    view: 0,
    published: false,
    actions: "",
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setProduct((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!product.name || !product.category || !product.price) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Save the product data to Supabase
      const { data, error } = await supabase.from("products").insert([
        {
          name: product.name,
          category: product.category,
          price: product.price,
          sale_price: product.salePrice,
          stock: product.stock,
          status: product.status,
          views: product.view,
          published: product.published,
          actions: product.actions,
        },
      ]);

      if (error) {
        console.error("Error saving product:", error.message);
        alert("Failed to save product. Please try again.");
        return;
      }

      console.log("Product saved successfully:", data);

      // Reset the form
      setProduct({
        name: "",
        category: "",
        price: 0,
        salePrice: 0,
        stock: 0,
        status: "",
        view: 0,
        published: false,
        actions: "",
      });

      // Close the form modal
      setIsOpen(false);

      alert("Product saved successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card className="mb-5">
      <form className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Upload className="mr-2 size-4" /> Export
          </Button>
          <Button variant="outline">
            <Download className="mr-2 size-4" /> Import
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="sm:flex-grow xl:flex-grow-0"
          >
            <PenSquare className="mr-2 size-4" /> Bulk Action
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="sm:flex-grow xl:flex-grow-0"
          >
            <Trash2 className="mr-2 size-4" /> Delete
          </Button>
          <div className="relative">
            <Button
              type="button"
              variant="default"
              size="lg"
              className="sm:flex-grow xl:flex-grow-0"
              onClick={handleToggle}
            >
              <Plus className="mr-2 size-4" /> Add Product
            </Button>
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 grid grid-cols-3 gap-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter category"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sale Price
                      </label>
                      <input
                        type="number"
                        name="salePrice"
                        value={product.salePrice}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter sale price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter stock quantity"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        value={product.status}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter status"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        View
                      </label>
                      <input
                        type="number"
                        name="view"
                        value={product.view}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter views"
                      />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="published"
                        checked={product.published}
                        onChange={handleInputChange}
                        className="rounded text-green-500"
                      />
                      <span>Published</span>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Actions
                      </label>
                      <input
                        type="text"
                        name="actions"
                        value={product.actions}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter actions"
                      />
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mr-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}
