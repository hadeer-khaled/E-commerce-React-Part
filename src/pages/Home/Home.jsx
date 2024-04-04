import React from 'react';
import ProductsList from '../../components/product-list/product-list';

function Home() {
  return (
    <div className="home">
      {/* <h1 className="font-extrabold text-red-600 bg-emerald-200">Home-Page</h1> */}
      <ProductsList></ProductsList>
    </div>
  );
}

export default Home;
