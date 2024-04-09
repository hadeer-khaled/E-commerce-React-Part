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
    <div className="card card-compact w-70 h-80 bg-base-300 shadow-lg m-0 p-0 border">
      <figure>
        <Link to={`/products/${product.product_id}`}>
          <img src={imageUrl} alt={product.name} />
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/products/${product.product_id}`}>
            {product.name}
          </Link>
        </h2>
        <p className='self-start badge'>{product.stock} items</p>
        <p>{product.description}</p>
        <Link to={`/shop?category=${product.category}`} className='grid-cols-subgrid text-blue-600 self-start ps-3'>{product.category}</Link>
        <div className="card-actions p-3 flex items-center justify-between">
    <div className="flex items-center w-full">
        <div className="rating-container">
            <div className="rating grid-cols-subgrid">
                {renderRatingStars(product.avg_rating)}
            </div>
        </div>
        <button className="grid-cols-subgrid xl:w-1/2 ml-4"><i className="fas fa-heart fa-xl text-red-800"></i></button>
    </div>
</div>

      </div>
    </div>
  );
};

export default ProductCard;
