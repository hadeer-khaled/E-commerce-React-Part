import React, { useState } from "react";

export default function ShoppingCart() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    // Show the alert
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="flex">
      {/* Image */}

      {/* Table */}
      <div className="overflow-x-auto flex-grow">
        <table className="table">
          {/* head */}
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
            <tr className="">
              <td>
                <div className="flex items-center gap-9">
                  <div className="avatar">
                    <div className="mask mask-squircle w-28 h-28">
                      <img
                        src="https://cdn.mos.cms.futurecdn.net/WvxcvGGY8hJSQTVsqxLznE.jpeg"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </td>
              <td>Indigo</td>
              <td></td>
              <td>
                <div className="flex flex-col items-center">
                  <button className="btn btn-outline btn-warning btn-sm">
                    <svg
                      className="w-3 h-3 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7H1"
                      />
                    </svg>
                  </button>
                  <button className="btn btn-outline btn-info btn-sm">
                    <svg
                      className="w-3 h-3 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 7h12M7 1v12"
                      />
                    </svg>
                  </button>
                </div>
              </td>

              <td>123.12</td>
              <td>
                <button
                  className="btn btn-circle bg-transparent hover:text-red-500 shadow-lg"
                  onClick={() => handleClick(product.product_id)}
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

                {/* Alert */}
                {showAlert && (
                  <div className="toast toast-bottom toast-end">
                    <div className="alert alert-success">
                      <span>Product removed successfully from wishlist.</span>
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex items-center gap-9">
                  <div className="avatar">
                    <div className="mask mask-squircle w-28 h-28">
                      <img
                        src="https://cdn.mos.cms.futurecdn.net/WvxcvGGY8hJSQTVsqxLznE.jpeg"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </td>
              <td>Indigo</td>
              <td></td>

              <td>
                <div className="flex flex-col items-center">
                  <button className="btn btn-outline btn-warning btn-sm">
                    <svg
                      className="w-3 h-3 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7H1"
                      />
                    </svg>
                  </button>
                  <button className="btn btn-outline btn-info btn-sm">
                    <svg
                      className="w-3 h-3 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 7h12M7 1v12"
                      />
                    </svg>
                  </button>
                </div>
              </td>

              <td>123.12</td>
              <td>
                <button
                  className="btn btn-circle bg-transparent hover:text-red-500 shadow-lg"
                  onClick={() => handleClick(product.product_id)}
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

                {/* Alert */}
                {showAlert && (
                  <div className="toast toast-bottom toast-end">
                    <div className="alert alert-success">
                      <span>Product removed successfully from wishlist.</span>
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tr className="">
              <td>
                <div className="flex items-center gap-9">
                  <div className="avatar">
                    <div className="mask mask-squircle w-28 h-28">
                      <img
                        src="https://cdn.mos.cms.futurecdn.net/WvxcvGGY8hJSQTVsqxLznE.jpeg"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </td>
              <td>Indigo</td>
              <td></td>

              <td>
                <div className="flex flex-col items-center">
                  <button className="btn btn-outline btn-warning btn-sm">
                    <svg
                      className="w-3 h-3 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7H1"
                      />
                    </svg>
                  </button>
                  <button className="btn btn-outline btn-info btn-sm">
                    <svg
                      className="w-3 h-3 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 7h12M7 1v12"
                      />
                    </svg>
                  </button>
                </div>
              </td>

              <td>123.12</td>
              <td>
                <button
                  className="btn btn-circle bg-transparent hover:text-red-500 shadow-lg"
                  onClick={() => handleClick(product.product_id)}
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

                {/* Alert */}
                {showAlert && (
                  <div className="toast toast-bottom toast-end">
                    <div className="alert alert-success">
                      <span>Product removed successfully from wishlist.</span>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* <img src="https://static.wixstatic.com/media/fad897_84838828ead94e9f9bffd7a3992050b2~mv2.png/v1/crop/x_237,y_190,w_1593,h_1707/fill/w_280,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/fad897_84838828ead94e9f9bffd7a3992050b2~mv2.png" alt="Wishlist" /> */}
        <img
          src="https://premiumfoodsinc.com/assets/img/shops/mv.png"
          alt="Wishlist"
          style={{ width: "500px", height: "500px", marginTop: "-30px" }}
        />
      </div>
    </div>
  );
}
