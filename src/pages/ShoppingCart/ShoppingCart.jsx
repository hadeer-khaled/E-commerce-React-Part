import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingCartItemsThunk } from "../../store/slices/userShoppingCartSlice";
import { addToCart, decrementQuantityInShoppingCart, incrementQuantityInShoppingCart, removeCartInShoppingCart, removeCartItemInShoppingCart } from "../../axios/userShoppingCart";
import { useNavigate } from "react-router-dom"

export default function ShoppingCart() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, cartItemsCount } = useSelector((state) => state.userShoppingCartReducer);

  const [showAlert, setShowAlert] = useState(false);
  // const userId = 2;

  const totalPrice = Array.isArray(cartItems) 
  ? cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) 
  : 0;

  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    setUserId(loggedUser.user_id);
    console.log("from cart page",userId);
    if(userId!=0){
      dispatch(fetchShoppingCartItemsThunk(userId));
    }
  }, [userId]);

  const handleClick = async (cartItemId) => {
    try {
      await removeCartItemInShoppingCart(userId, cartItemId);

      dispatch(fetchShoppingCartItemsThunk(userId));

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error handling remove item:", error.message);
    }
  };

  const incrementQuantity = async (cartItemId) => {
    try {
      await incrementQuantityInShoppingCart(userId, cartItemId);
      dispatch(fetchShoppingCartItemsThunk(userId));
    } catch (error) {
      console.error("Error handling incrementing quantity product:", error.message);
    }
  };

  const decrementQuantity = async (cartItemId) => {
    try {
      await decrementQuantityInShoppingCart(userId, cartItemId);

      dispatch(fetchShoppingCartItemsThunk(userId));
    } catch (error) {
      console.error("Error handling decrementing quantity product:", error.message);
    }
  };
  const removeCart = async () => {
    try {
      await removeCartInShoppingCart(userId);

      dispatch(fetchShoppingCartItemsThunk(userId));
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error handling decrementing quantity product:", error.message);
    }
  };
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(userId, productId); 
      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="flex">
    <div className="overflow-x-auto flex-grow">
    {cartItems && cartItems.length > 0 ? (
              <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th></th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((cartItem, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-9">
                    <div className="avatar">
                      <div className="mask mask-squircle w-28 h-28">
                        <img
                          src={cartItem.product.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                    <div className="font-bold">{cartItem.product.name}</div>
                </td>
                <td>{cartItem.product.description}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <div className="flex flex-col items-center">
                    <button className="btn btn-outline btn-warning btn-sm" onClick={() => incrementQuantity(cartItem.cart_item_id)}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-outline btn-info btn-sm" onClick={() => decrementQuantity(cartItem.cart_item_id)}>
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                  </div>
                </td>
                <td>{cartItem.product.price}</td>
                <td>
                  <button
                    className="btn btn-circle bg-transparent hover:text-red-500 shadow-lg"
                    onClick={() => handleClick(cartItem.cart_item_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </td>
                <td>
          <button className="btn btn-outline" onClick={() =>handleAddToCart(cartItem.product.product_id)}>
            Add to Cart
          </button>
        </td>
              </tr>
            ))}
            <tr>
            <td colSpan="10" className="text-center">
                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-secondary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800 dark:bg-[#202124] dark:text-secondary-400">
                total quantity is {totalQuantity}
                </span>
                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-secondary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800 dark:bg-[#202124] dark:text-secondary-400">
                number of items is {cartItemsCount}
                 </span>
                 <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-secondary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800 dark:bg-[#202124] dark:text-secondary-400">
                total price is {totalPrice}
                 </span>
              </td>
            </tr>
              <tr>
              <td colSpan="10" className="text-center">
                <button className="btn btn-md btn-outline btn-error mx-2"  onClick={() => removeCart()}>
                  Delete all
                </button>
                <button className="btn btn-outline btn-primary mx-2" onClick={()=> navigate('/order-details')}>
                  Order Now
                </button>
              </td>

            </tr>
          </tbody>
        </table>
         ) : (
          <h2 className="text-error ">Your cart is empty</h2>
        )}
      </div>
      <div>
        {showAlert && (
          <div className="toast toast-bottom toast-end">
            <div className="alert alert-success">
              <span>Product removed successfully.</span>
            </div>
          </div>
        )}
        <img
          src="https://premiumfoodsinc.com/assets/img/shops/mv.png"
          alt="ShoppingCart"
          style={{ width: "500px", height: "500px", marginTop: "-30px" }}
        />
      </div>
    </div>
    
  );
}
