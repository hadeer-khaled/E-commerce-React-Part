import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Prepend 'https:\\' before the image URL
  const imageUrl = `https:\\${product.images[0]}`;

// Function to generate stars with different colors based on average rating
const renderRatingStars = (avgRating) => {
  const stars = [];
  const maxRating = 5;
  const filledColor = "bg-orange-400"; // Color for filled stars
  const emptyColor = "bg-gray-200"; // Color for empty stars

  // Round the average rating to the nearest integer
  const roundedRating = Math.round(avgRating);

  // Loop to generate stars
  for (let i = 1; i <= maxRating; i++) {
    // Determine whether the star should be filled or empty based on the rounded rating
    const starColor = i <= roundedRating ? filledColor : emptyColor;
    stars.push(<input key={i} type="radio" name="rating" className={`mask mask-star-2 size-5 ${starColor}`} />);
  }
  return stars;
};


  return (
    <div className="card card-compact w-70 h-80 bg-base-300 shadow-lg m-0 p-0 border -z-10">
      <figure><img src={imageUrl} alt={product.name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <Link to='/' className='grid-cols-subgrid text-blue-600 self-start ps-3'>{product.category}</Link>
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
