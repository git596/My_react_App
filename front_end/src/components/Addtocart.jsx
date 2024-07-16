import React from 'react';
import charger_1 from '../assets/charger_1.png';

const Addtocart = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 justify-center h-screen">
      <div className="max-w-md mx-auto rounded-lg shadow-lg bg-blue-300 p-6">
        <div className="relative">
          <img
            src={charger_1}
            alt="Apple iPhone X"
            className="mx-auto rounded-lg"
          />
          <div className="absolute top-0 left-0 bg-gray-200 text-gray-800 px-2 py-1 rounded-tr-lg">
            In Stock
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4 mb-2">iPhone charger</h2>
        <h2 className="text-2xl font-bold mt-4 mb-2">iPhone charger</h2>
        <p className="text-gray-600 mb-4">Be the first to review this product</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">A$999.00</span>
          <div className="flex items-center">
            <label htmlFor="quantity" className="mr-2">Qty:</label>
            <input
              type="number"
              id="quantity"
              defaultValue="1"
              min="1"
              className="w-16 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <div className="flex">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 mr-2"
            >
              Add to Wish List
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtocart;