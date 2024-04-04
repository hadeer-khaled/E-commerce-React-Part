import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../ProductCard/ProductCard'; // Adjust the path accordingly

const ProductsList = () => {
//   const dispatch = useDispatch();
//   const productList = useSelector(state => state.products.productList);
//   const isLoading = useSelector(state => state.products.isLoading);
//   const error = useSelector(state => state.products.error);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!productList || productList.length === 0) {
//     return <div>No products found.</div>;
//   }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {productList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
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
