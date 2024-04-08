import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCategoriesThunk } from "../../store/slices/categoriesSlice";
import { useNavigate } from 'react-router-dom';

const FilterForm = ({ onSubmit, initialCategory }) => {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categoriesSliceReducer.categoryList);
  let navigateTo  = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    category: "", // Set initial category value to empty string
    order: "",
  });

  useEffect(() => {
    dispatch(getCategoriesThunk({ page: '', limit: '' }));
  }, [dispatch]);

  useEffect(() => {
    onSubmit(filters);
  }, [filters, onSubmit]);

  // Find category ID based on the initial category name
  useEffect(() => {
    const initialCategoryId = categoriesList.find(category => category.name === initialCategory)?.category_id || "";
    setFilters(prevFilters => ({ ...prevFilters, category: initialCategoryId }));
  }, [categoriesList, initialCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      navigateTo(`/shop`);
    } else if (name === "category") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedText = selectedOption ? selectedOption.textContent : "";
      navigateTo(`/shop?category=${selectedText}`);
    }
    setFilters({ ...filters, [name]: value });
  };

  return (
    <form className="pt-2 pb-4">
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
            {categoriesList.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/2 px-4">
          <select
            id="sortBy"
            name="order"
            value={filters.order}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Sort by</option>
            <option value="-avg_rating">Price: High rated first</option>
            <option value="price">Price: low prices first</option>
            <option value="-price">Rating: High prices first</option>
            <option value="avg_rating">Rating: low rated first</option>
            {/* Add more options for sorting */}
          </select>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
