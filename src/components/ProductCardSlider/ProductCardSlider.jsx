import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCardSlider.css'

const ProductCardSlider = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(productList.length / 4));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(productList.length / 4)) % Math.ceil(productList.length / 4));
    };

    return (
        <div className="ProductCardSlider hidden md:block">
            <div className="carousel w-full relative">
                {productList.length > 0 && (
                    <div className="carousel-inner flex gap-4 ps-20 pe-20">
                        {productList.slice(currentIndex * 4, (currentIndex + 1) * 4).map((product, index) => (
                            <ProductCard key={index} product={product}/>
                        ))}
                    </div>
                )}
                <div className="absolute flex justify-between items-center w-full">
                    <button className="btn btn-circle border" onClick={handlePrev}>❮</button>
                    <button className="btn btn-circle border" onClick={handleNext}>❯</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSlider;



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