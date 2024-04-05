import React, { useState } from 'react';

export default function Wishlist() {
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
      <div className='m-0 mt-25'>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/wish-list-8725018-7045277.png" alt="Wishlist" />
      </div>
      {/* Table */}
      <div className="overflow-x-auto flex-grow">
        <table className="table">
          {/* head */}
          <thead>
            <tr >
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Favorite</th>
              <th>Remove Favorite</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-warning'>
              <td >
                <div className="flex items-center gap-9">
                  <div className="avatar">
                    <div className="mask mask-squircle w-28 h-28">
                      <img src="https://cdn.mos.cms.futurecdn.net/WvxcvGGY8hJSQTVsqxLznE.jpeg" alt="Avatar Tailwind CSS Component" />
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
              <td>
                <button className="btn" disabled>
                  Added
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="red" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </td>
              <td>
                <button className="btn" onClick={handleClick}>
                  Remove
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
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
                      <img src="https://cdn.mos.cms.futurecdn.net/WvxcvGGY8hJSQTVsqxLznE.jpeg" alt="Avatar Tailwind CSS Component" />
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
              <td>
                <button className="btn" disabled>
                  Added
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="red" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </td>
              <td>
                <button className="btn" onClick={handleClick}>
                  Remove
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
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
            <tr className='bg-warning'>
              <td >
                <div className="flex items-center gap-9">
                  <div className="avatar">
                    <div className="mask mask-squircle w-28 h-28">
                      <img src="https://cdn.mos.cms.futurecdn.net/WvxcvGGY8hJSQTVsqxLznE.jpeg" alt="Avatar Tailwind CSS Component" />
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
              <td>
                <button className="btn" disabled>
                  Added
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="red" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </td>
              <td>
                <button className="btn" onClick={handleClick}>
                  Remove
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
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
    </div>
  );
}
