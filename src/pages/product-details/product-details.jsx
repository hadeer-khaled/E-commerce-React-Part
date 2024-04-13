import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductByIdThunk } from '../../store/slices/productsSlice';
import { Link } from 'react-router-dom';
import ProductCardSlider from "../../components/ProductCardSlider/ProductCardSlider";
import { getProductsThunk } from "../../store/slices/productsSlice";

const ProductDetails = () => {

  const dispatch = useDispatch();
  const { product_id } = useParams();
  const product = useSelector((state) => state.productsSliceReducer.productDetail);
  const isLoading = useSelector((state) => state.productsSliceReducer.isLoading);
  const error = useSelector((state) => state.productsSliceReducer.error);
  const productList = useSelector(
    (state) => state.productsSliceReducer.productList
  );
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(getProductByIdThunk({ product_id }));
    dispatch(getProductsThunk({page:'1',limit:'16'}));
  }, [dispatch, product_id]);

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { images } = product;
  const imagesWithHttps = images.map(image => `https://${image}`);

  const renderRatingStars = (avgRating) => {
    const stars = [];
    const maxRating = 5;
    const filledColor = "bg-orange-400";
    const emptyColor = "bg-gray-200";
  
    const roundedRating = Math.round(avgRating);
  
    for (let i = 1; i <= maxRating; i++) {
      const starColor = i <= roundedRating ? filledColor : emptyColor;
      stars.push(<input key={i} type="" name="rating" className={`cursor-default pointer-events-none mask mask-star-2 size-5 ${starColor}`} />);
    }
    return stars;
  };





  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2 min-h-screen content-center">
        <div className="flex flex-col md:flex-row -mx-4 px-20">
          <div className="md:flex-1 m-3 mx-10">
            <div className="h-[400px] rounded-lg mb-4">
              {/* Render the current image */}
              <img className="w-full h-full object-cover rounded-md" src={imagesWithHttps[currentImageIndex]} alt={product.name} />
            </div>
            <div className="other-product-images mt-1 grid grid-cols-3 md:grid-cols-4 sm:grid-cols-2 w-full gap-y-1 gap-x-2">
              {/* Render all other images */}
              {imagesWithHttps.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className="w-full border border-gray-600 cursor-pointer h-20 object-cover rounded-sm"
                  onClick={() => changeImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="md:flex-1 mx-10 p-5 m-3">
            <h2 className="text-2xl font-bold mb-2 py-5 text-start">{product.name}</h2>
            <div className=' justify-items-start text-start'>
              <span className="font-bold">Category: </span>
              <Link to={`/shop?category=${product.category}`} className='grid-cols-subgrid text-blue-600'>{product.category}</Link>
            </div>

            <div className=' justify-items-start text-start py-5'>
              <span className="font-bold">Description:</span>
              <p className="text-gray-600 text-sm mb-4 py-1">{product.description}</p>
            </div>
            <div className="flex mb-4 py-6">
              <div className="mr-4">
                <span className="font-bold">Price: </span>
                <span>${product.price}</span>
              </div>
              <div>
                <span className="font-bold">Availability:</span>
                <span>{product.stock > 0 ? ` ${product.stock} items In Stock` : 'Out of Stock'}</span>
              </div>
            </div>
            <div className="flex mb-4 py-6">
              <div className="mr-4">
                <span className="font-bold">Rating: </span>
                <span>{product.avg_rating}</span>
              </div>
              <div className='flex'>
                <div className="rating-container w-full text-start pb-1">
                  <div className="rating grid-cols-subgrid">
                      {renderRatingStars(product.avg_rating)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex -mx-2 my-4">
              <div className="xl:w-1/2 px-2">
                <button className="w-full py-2 px-4 rounded-full font-bold border transition duration-300 ease-in-out transform hover:scale-105">Add to Cart</button>
              </div>
              <div className="xl:w-1/2 px-2">
                <button className="w-full py-2 px-4 rounded-full font-bold border w-36 transition duration-300 ease-in-out transform hover:scale-105">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relatedCagegories bg-red-600 h-">

      </div>


      <div className="pb-5 pt-0">
        <h3 className='text-3xl pb-8 text-center m-auto self-center'>Related products</h3>
        {productList.length >= 4 && (
          <ProductCardSlider productList={productList.filter((relatedProduct)=>relatedProduct.category == product.category)} className="h-52 bg-black static z-50"/>
        )}
      </div>

    </>
  );
};

export default ProductDetails;
