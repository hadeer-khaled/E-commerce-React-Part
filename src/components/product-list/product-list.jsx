import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductsList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8; // Number of products per page

  const pageCount = Math.ceil(productList.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handlePrev = () => {
    setPageNumber(prevPage => Math.max(0, prevPage - 1));
  };

  const handleNext = () => {
    setPageNumber(prevPage => Math.min(pageCount - 1, prevPage + 1));
  };

  const displayedProducts = productList.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  return (
    <div className='products-list pt-16 text-center'>
      <h2 className='card-title text-4xl pb-8 text-center m-auto self-center'>All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16">
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="join">
        <button className="join-item btn" onClick={handlePrev} disabled={pageNumber === 0}>«</button>
        {[...Array(pageCount).keys()].map(page => (
          <button key={page} className="join-item btn" onClick={() => handlePageChange({ selected: page })}>{page + 1}</button>
        ))}
        <button className="join-item btn" onClick={handleNext} disabled={pageNumber === pageCount - 1}>»</button>
      </div>
    </div>
  );
};

export default ProductsList;


// dummy data to try before fetching the products list
const productList =[
    {
        "id": 31,
        "name": "Samsung Galaxy S22 Ultra",
        "category": "smartphones",
        "price": 1299,
        "stock": 25,
        "description": "Experience the ultimate in smartphone technology with the Samsung Galaxy S22 Ultra.",
        "avg_rating": 4.7,
        "images": [
            "cdn.dummyjson.com/product-images/31/1.jpg",
            "cdn.dummyjson.com/product-images/31/2.jpg",
            "cdn.dummyjson.com/product-images/31/3.jpg",
            "cdn.dummyjson.com/product-images/31/4.jpg",
            "cdn.dummyjson.com/product-images/31/thumbnail.jpg",
        ]
    },
    {
        "id": 32,
        "name": "Asus ROG Zephyrus G14",
        "category": "laptops",
        "price": 1499,
        "stock": 15,
        "description": "Dominate the gaming arena with the Asus ROG Zephyrus G14 gaming laptop.",
        "avg_rating": 4.6,
        "images": [
            "cdn.dummyjson.com/product-images/32/1.jpg",
            "cdn.dummyjson.com/product-images/32/2.jpg",
            "cdn.dummyjson.com/product-images/32/3.jpg",
            "cdn.dummyjson.com/product-images/32/4.jpg",
            "cdn.dummyjson.com/product-images/32/thumbnail.jpg",
        ]
    },
    {
        "id": 33,
        "name": "Chanel No. 5",
        "category": "fragrances",
        "price": 199,
        "stock": 20,
        "description": "Chanel No. 5, the iconic fragrance that epitomizes luxury and elegance.",
        "avg_rating": 4.9,
        "images": [
            "cdn.dummyjson.com/product-images/33/1.jpg",
            "cdn.dummyjson.com/product-images/33/2.jpg",
            "cdn.dummyjson.com/product-images/33/3.jpg",
            "cdn.dummyjson.com/product-images/33/4.jpg",
            "cdn.dummyjson.com/product-images/33/thumbnail.jpg",
        ]
    },
    {
        "id": 31,
        "name": "Samsung Galaxy S22 Ultra",
        "category": "smartphones",
        "price": 1299,
        "stock": 25,
        "description": "Experience the ultimate in smartphone technology with the Samsung Galaxy S22 Ultra.",
        "avg_rating": 4.7,
        "images": [
            "cdn.dummyjson.com/product-images/31/1.jpg",
            "cdn.dummyjson.com/product-images/31/2.jpg",
            "cdn.dummyjson.com/product-images/31/3.jpg",
            "cdn.dummyjson.com/product-images/31/4.jpg",
            "cdn.dummyjson.com/product-images/31/thumbnail.jpg",
        ]
    },
    {
        "id": 32,
        "name": "Asus ROG Zephyrus G14",
        "category": "laptops",
        "price": 1499,
        "stock": 15,
        "description": "Dominate the gaming arena with the Asus ROG Zephyrus G14 gaming laptop.",
        "avg_rating": 4.6,
        "images": [
            "cdn.dummyjson.com/product-images/32/1.jpg",
            "cdn.dummyjson.com/product-images/32/2.jpg",
            "cdn.dummyjson.com/product-images/32/3.jpg",
            "cdn.dummyjson.com/product-images/32/4.jpg",
            "cdn.dummyjson.com/product-images/32/thumbnail.jpg",
        ]
    },
    {
        "id": 33,
        "name": "Chanel No. 5",
        "category": "fragrances",
        "price": 199,
        "stock": 20,
        "description": "Chanel No. 5, the iconic fragrance that epitomizes luxury and elegance.",
        "avg_rating": 4.9,
        "images": [
            "cdn.dummyjson.com/product-images/33/1.jpg",
            "cdn.dummyjson.com/product-images/33/2.jpg",
            "cdn.dummyjson.com/product-images/33/3.jpg",
            "cdn.dummyjson.com/product-images/33/4.jpg",
            "cdn.dummyjson.com/product-images/33/thumbnail.jpg",
        ]
    },
    {
        "id": 31,
        "name": "Samsung Galaxy S22 Ultra",
        "category": "smartphones",
        "price": 1299,
        "stock": 25,
        "description": "Experience the ultimate in smartphone technology with the Samsung Galaxy S22 Ultra.",
        "avg_rating": 4.7,
        "images": [
            "cdn.dummyjson.com/product-images/31/1.jpg",
            "cdn.dummyjson.com/product-images/31/2.jpg",
            "cdn.dummyjson.com/product-images/31/3.jpg",
            "cdn.dummyjson.com/product-images/31/4.jpg",
            "cdn.dummyjson.com/product-images/31/thumbnail.jpg",
        ]
    },
    {
        "id": 32,
        "name": "Asus ROG Zephyrus G14",
        "category": "laptops",
        "price": 1499,
        "stock": 15,
        "description": "Dominate the gaming arena with the Asus ROG Zephyrus G14 gaming laptop.",
        "avg_rating": 4.6,
        "images": [
            "cdn.dummyjson.com/product-images/32/1.jpg",
            "cdn.dummyjson.com/product-images/32/2.jpg",
            "cdn.dummyjson.com/product-images/32/3.jpg",
            "cdn.dummyjson.com/product-images/32/4.jpg",
            "cdn.dummyjson.com/product-images/32/thumbnail.jpg",
        ]
    },
    {
        "id": 33,
        "name": "Chanel No. 5",
        "category": "fragrances",
        "price": 199,
        "stock": 20,
        "description": "Chanel No. 5, the iconic fragrance that epitomizes luxury and elegance.",
        "avg_rating": 4.9,
        "images": [
            "cdn.dummyjson.com/product-images/33/1.jpg",
            "cdn.dummyjson.com/product-images/33/2.jpg",
            "cdn.dummyjson.com/product-images/33/3.jpg",
            "cdn.dummyjson.com/product-images/33/4.jpg",
            "cdn.dummyjson.com/product-images/33/thumbnail.jpg",
        ]
    },
    {
        "id": 31,
        "name": "Samsung Galaxy S22 Ultra",
        "category": "smartphones",
        "price": 1299,
        "stock": 25,
        "description": "Experience the ultimate in smartphone technology with the Samsung Galaxy S22 Ultra.",
        "avg_rating": 4.7,
        "images": [
            "cdn.dummyjson.com/product-images/31/1.jpg",
            "cdn.dummyjson.com/product-images/31/2.jpg",
            "cdn.dummyjson.com/product-images/31/3.jpg",
            "cdn.dummyjson.com/product-images/31/4.jpg",
            "cdn.dummyjson.com/product-images/31/thumbnail.jpg",
        ]
    },
    {
        "id": 32,
        "name": "Asus ROG Zephyrus G14",
        "category": "laptops",
        "price": 1499,
        "stock": 15,
        "description": "Dominate the gaming arena with the Asus ROG Zephyrus G14 gaming laptop.",
        "avg_rating": 4.6,
        "images": [
            "cdn.dummyjson.com/product-images/32/1.jpg",
            "cdn.dummyjson.com/product-images/32/2.jpg",
            "cdn.dummyjson.com/product-images/32/3.jpg",
            "cdn.dummyjson.com/product-images/32/4.jpg",
            "cdn.dummyjson.com/product-images/32/thumbnail.jpg",
        ]
    },
    {
        "id": 33,
        "name": "Chanel No. 5",
        "category": "fragrances",
        "price": 199,
        "stock": 20,
        "description": "Chanel No. 5, the iconic fragrance that epitomizes luxury and elegance.",
        "avg_rating": 4.9,
        "images": [
            "cdn.dummyjson.com/product-images/33/1.jpg",
            "cdn.dummyjson.com/product-images/33/2.jpg",
            "cdn.dummyjson.com/product-images/33/3.jpg",
            "cdn.dummyjson.com/product-images/33/4.jpg",
            "cdn.dummyjson.com/product-images/33/thumbnail.jpg",
        ]
    },
];