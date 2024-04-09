import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../../store/slices/productsSlice';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../pagination/Pagination';
import { useLocation } from 'react-router-dom';

const ProductsList = ({ filters }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsSliceReducer.productList);
  const isLoading = useSelector((state) => state.productsSliceReducer.isLoading);
  const error = useSelector((state) => state.productsSliceReducer.error);
  const currentPage = useSelector((state) => state.productsSliceReducer.currentPage);
  const totalPages = useSelector((state) => state.productsSliceReducer.totalPages);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const productsPerPage = 16;

  const location = useLocation();

  useEffect(() => {
    handlePageChange(pageNumber);
  }, [dispatch, pageNumber, filters]);

  useEffect(() => {
    // Reset page number to 1 when location changes
    setPageNumber(1);
  }, [location]);

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
    <div className='products-list text-center min-h-52 mt-1'>
      {productList.length > 0 ? (
        <>
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
        </>
      ) : (
        <h2 className='card-title text-4xl pb-8 text-center m-auto self-center'>No products</h2>
      )}
    </div>
  );
};

export default ProductsList;
