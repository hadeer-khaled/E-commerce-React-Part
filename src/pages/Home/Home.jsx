import React from 'react';
import ProductsList from '../../components/product-list/product-list';
import Hero from '../../components/hero/hero';
import './Home.css';

// import Hero from '../../components/hero/hero.jsx';

function Home() {
  return (
    <div className="home">
      <Hero/>
      <div className="home-content py-20">
        {/* <h1 className="font-extrabold text-red-600 bg-emerald-200">Home-Page</h1> */}
        <ProductsList/>
      </div>
    </div>
  );
}

export default Home;
