// FilterForm.js
import React, { useState } from "react";

const FilterForm = ({ onSubmit }) => {
  const [filters, setFilters] = useState({
    search: "",
    // category: "",
    order: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting filters:", filters); // Add this log to see the filters before submission
    onSubmit(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-4 px-8">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 flex-1"
        />
      </div>
      <div className="flex flex-wrap mb-4 px-4">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0 px-4">
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">All Categories</option>
            {/* Add options for different categories */}
          </select>
        </div>
        <div className="w-full sm:w-1/2 px-4">
          <select
            id="sortBy"
            name="order"
            value={filters.sortBy}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Sort by Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            {/* Add more options for sorting */}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
