import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductCardSlider.css";

const ProductCardSlider = ({ productList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modifiedProductList, setModifiedProductList] = useState([]);

  useEffect(() => {
    const adjustedLength = Math.floor(productList.length / 4) * 4;
    const adjustedList = productList.slice(0, adjustedLength);
    setModifiedProductList(adjustedList);
  }, [productList]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (modifiedProductList.length / 4));
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (modifiedProductList.length / 4)) %
        (modifiedProductList.length / 4)
    );
  };

  // Check if there are fewer than 4 products
  const lessThanFourProducts = modifiedProductList.length < 4;

  return (
    <div className="ProductCardSlider-container my-3">
      {!lessThanFourProducts && ( // Render the slider only if there are 4 or more products
        <div className="ProductCardSlider hidden md:block w-5/6 self-center mx-auto">
          <div className="carousel w-full relative">
            {modifiedProductList.length > 0 && (
              <div className="carousel-inner flex gap-4 ps-20 pe-20">
                {modifiedProductList
                  .slice(currentIndex * 4, (currentIndex + 1) * 4)
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
              </div>
            )}
            <div className="absolute flex justify-between items-center w-full">
              <button className="btn btn-circle border right-3" onClick={handlePrev}>
                ❮
              </button>
              <button className="btn btn-circle border" onClick={handleNext}>
                ❯
              </button>
            </div>
          </div>
        </div>
      )}
      {lessThanFourProducts && ( // Render a message if there are fewer than 4 products
        <div>No products to display</div>
      )}
    </div>
  );
};

ProductCardSlider.propTypes = {
  productList: PropTypes.array.isRequired,
};

export default ProductCardSlider;
