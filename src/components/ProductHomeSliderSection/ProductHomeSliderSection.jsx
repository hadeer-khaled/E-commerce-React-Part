import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../store/slices/productsSlice";
import ProductCardSlider from "../ProductCardSlider/ProductCardSlider";
import './ProductHomeSliderSection.css'

const ProductHomeSliderSection = () => {
  // const dispatch = useDispatch();
  const productList = useSelector(
    (state) => state.productsSliceReducer.productList
  );

  // useEffect(() => {
  //   dispatch(getProductsThunk({page:'1',limit:'16'}));
  // }, [dispatch]);

  return (
    <div className="ProductHomeSliderSection">
      {productList.length >= 4 && (
        <ProductCardSlider productList={productList} />
      )}
    </div>
  );
};

export default ProductHomeSliderSection;
