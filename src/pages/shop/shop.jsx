// ShopPage.js
import React, { useState } from "react";
import ProductsList from "../../components/product-list/product-list";
import FilterForm from "../../components/filters/FilterForm";
import { useLocation } from 'react-router-dom';

const ShopPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || '';

  const [appliedFilters, setAppliedFilters] = useState({});

  const handleFilterSubmit = (filters) => {
    console.log("Filters submitted:", filters); // Add this log to see the filters received from the form
    setAppliedFilters(filters);
  };

  return (
    <div className='pt-20 px-24'>
      {/* <h1 className="text-3xl font-semibold text-center py-8">Shop</h1> */}
      <FilterForm onSubmit={handleFilterSubmit} initialCategory={initialCategory} />
      <ProductsList filters={appliedFilters} />
    </div>
  );
};

export default ShopPage;
