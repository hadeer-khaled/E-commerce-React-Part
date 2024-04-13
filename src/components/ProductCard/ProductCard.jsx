import "./ProductCard.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { addToWishlist } from "../../axios/UserWishlist";
import { addToCart } from "../../axios/userShoppingCart";
import { useSelector } from "react-redux";
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
      stars.push(
        <input
          key={i}
          type=""
          name="rating"
          className={`cursor-default pointer-events-none mask mask-star-2 size-5 ${starColor}`}
        />
      );
    }
    return stars;
  };
  const wishlistItems = useSelector(
    (state) => state.userWishlistReducer.wishlistItems
  );

  
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
  const userId = loggedUser.user_id; // user

  const handleAddToWishlist = async (productId) => {
    try {
      if(!userId)
      {
        Swal.fire({
          icon:'error',
          title:'you are not logged in',
          timer:2000
        })
        return null
      }
      const isProductInWishlist = wishlistItems.some(
        (item) => item.product_id === productId
      );
      if (isProductInWishlist) {
        Swal.fire({
          title: "Adding the same product!",
          text: "This product is already in your wishlist.",
          icon: "info",
        });
      } else {
        const response = await addToWishlist(userId, productId);
        Swal.fire({
          title: "Product added to wishlist!",
          text: response.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      if(!userId)
      {
        Swal.fire({
          icon:'error',
          title:'you are not logged in',
          timer:2000
        })
        return null
      }
      await addToCart(userId, productId);
      console.log("Product added to cart successfully!");
      Swal.fire({
          title: "Product added to Shopping Cart!",
          text: "Added To cart",
          icon: "success",
        });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="card card-product card-compact w-70 h-80 bg-base-300 shadow-lg m-0 p-0 border">
      <figure className="h-1/2">
        <Link to={`/products/${product.product_id}`}>
          <img className="image-tag" src={imageUrl} alt={product.name} />
        </Link>
      </figure>
      <div className="card-body">
        <div className="">
          <div className="flex">
            <div className="rating-container w-full text-start pb-1">
              <div className="rating grid-cols-subgrid">
                {renderRatingStars(product.avg_rating)}
              </div>
            </div>
            <p className="w-28">
              <span className="badge">{product.stock} items</span>
            </p>
          </div>

          <h2 className="card-title flex m-0">
            <Link className="m-0" to={`/products/${product.product_id}`}>
              {product.name}
            </Link>
          </h2>
        </div>

        <div className="card-actions flex items-center justify-between">
          <div className="flex w-full justify-between m-0 p-0">
            <Link
              to={`/shop?category=${product.category}`}
              className="grid-cols-subgrid text-blue-600"
            >
              {product.category}
            </Link>
          </div>
        </div>

        <div className="text-start">
          <p>{product.description}</p>
          <p className="pt-2">Price: <span className="text-lime-700">${product.price}</span></p>
        </div>
      </div>
      <div className="card-actions flex items-center justify-between pb-3 px-5">
        <div className="flex w-full justify-between gap-1 py-2 px-3">
          {/* <div className='grid-cols-subgrid xl:w-1/2'>
          <button className="btn btn-primary p-0 w-11/12 " onClick={() =>handleAddToCart(product.product_id)}>Add to cart</button>
        </div>
        <div className='grid-cols-subgrid xl:w-1/2'>
          <button className="btn btn-primary p-0 w-11/12" onClick={() =>handleAddToCart(product.product_id)}>Add to wishlist</button>
        </div> */}
          {/* <button className="btn btn-primary grid-cols-subgrid xl:w-1/2 p-0" onClick={() =>handleAddToCart(product.product_id)}>Add to cart</button> */}
          <span className="grid-cols-subgrid xl:w-1/2 ml-4 text-start ps-0 ms-0">
            <i
              className="fas fa-cart-plus fa-xl cursor-pointer"
              onClick={() => handleAddToCart(product.product_id)}
            ></i>
          </span>
          <span className="grid-cols-subgrid xl:w-1/2 ml-4 text-end">
            <i
              className={`fas fa-heart fa-xl cursor-pointer ${
                wishlistItems.some(
                  (item) => item.product_id === product.product_id
                )
                  ? "text-red-500"
                  : "text-white"
              }`}
              onClick={() => handleAddToWishlist(product.product_id)}
            ></i>
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
