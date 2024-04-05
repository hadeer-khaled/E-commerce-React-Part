import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Prepend 'https:\\' before the image URL
  const imageUrl = `https:\\${product.images[0]}`;

  return (
    <div className="card card-compact w-70 h-80 bg-base-300 shadow-lg m-0 p-0 border -z-10">
      <figure><img src={imageUrl} alt={product.name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between items-center p-3 grid-cols-* gap-4">
            <div className='rating-container'>
                <div className="rating grid-cols-subgrid">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 size-5" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 size-5" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 size-5" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 size-5" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 size-5" />
                </div>
            </div>
            <Link to='/' className='grid-cols-subgrid text-blue-600'>{product.category}</Link>
            <button className=' justify-self-start grid-cols-subgrid'><i className="fas fa-heart fa-xl text-red-800"></i></button>
            {/* <button className="btn btn-primary">Add to cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
