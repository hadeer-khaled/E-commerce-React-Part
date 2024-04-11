import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = `https:\\${product.images[0]}`;

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
  <div className="card card-product card-compact w-70 h-80 bg-base-300 shadow-lg m-0 p-0 border">
    <figure className='h-1/2'>
      <Link to={`/products/${product.product_id}`}>
        <img className='image-tag' src={imageUrl} alt={product.name} />
      </Link>
    </figure>
    <div className="card-body">

      <div className=''>
        <div className='flex'>
          <div className="rating-container w-full text-start pb-1">
            <div className="rating grid-cols-subgrid">
                {renderRatingStars(product.avg_rating)}
            </div>
          </div>
          <p className='w-28'><span className='badge'>{product.stock} items</span></p>
        </div>

        <h2 className="card-title flex m-0">
          <Link className='m-0' to={`/products/${product.product_id}`}>
            {product.name}
          </Link>
        </h2>
      </div>

      <div className="card-actions flex items-center justify-between">
        <div className="flex w-full justify-between m-0 p-0">
          <Link to={`/shop?category=${product.category}`} className='grid-cols-subgrid text-blue-600'>{product.category}</Link>
        </div>
      </div>

      <div className='text-start'>
        <p>{product.description}</p>
      </div>

    </div>
    <div className="card-actions flex items-center justify-between pb-3 px-5">
      <div className="flex w-full justify-between">
        <button className="btn btn-primary grid-cols-subgrid xl:w-1/2 p-0">Add to cart</button>
        <button className="grid-cols-subgrid xl:w-1/2 ml-4 text-end"><i className="fas fa-heart fa-xl text-red-800"></i></button>
      </div>
    </div>
  </div>
);

};

export default ProductCard;
