import React, { useState } from 'react';

interface Product {
  name: string;
  price: number;
  description: string;
  image: File | null;
}

const AddProduct: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    description: '',
    image: null,
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files exist before setting the state
    const file = e.target.files ? e.target.files[0] : null;
    setProduct((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log('Product submitted:', product);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Product
      </button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg p-6 mt-4 w-80">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
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
              <label className="block text-sm font-medium text-gray-700">Price</label>
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
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleTextAreaChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 w-full text-sm text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
