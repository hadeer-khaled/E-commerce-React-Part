import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../../store/slices/productsSlice';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCardSlider.css'

const ProductCardSlider = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productsSliceReducer.productList);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(getProductsThunk());
      }, [dispatch]);

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
