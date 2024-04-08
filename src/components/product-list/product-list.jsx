// ProductsList.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../../store/slices/productsSlice';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../pagination/Pagination';

const ProductsList = ({ filters }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsSliceReducer.productList);
  const isLoading = useSelector((state) => state.productsSliceReducer.isLoading);
  const error = useSelector((state) => state.productsSliceReducer.error);
  const currentPage = useSelector((state) => state.productsSliceReducer.currentPage);
  const totalPages = useSelector((state) => state.productsSliceReducer.totalPages);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const productsPerPage = 16;

  useEffect(() => {
    console.log("Filters changed:", filters); // Add this log to see when filters change
    handlePageChange(pageNumber);
  }, [dispatch, pageNumber, filters, error]);

  const handlePageChange = (page) => {
    setPageNumber(page);
    const limit = productsPerPage;
    dispatch(getProductsThunk({ page, limit, ...filters }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='products-list pt-16 text-center'>
      <h2 className='card-title text-4xl pb-8 text-center m-auto self-center'>Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16">
        {productList.map(product => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsList;
