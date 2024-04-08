import { Link } from "react-router-dom";
import "./hero.css";
const Hero = () => {
  return (
    <div className="hero bg-blend-overlay pt-11 bg-base-300">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold max-md:text-4xl">Best E-Commerce Shop Of The Year!</h1>
          <p className="py-3 text-2xl max-md:text-lg">
          Welcome to our e-commerce hero page! Explore convenience and excellence in online retail with our user-friendly platform and innovative features.
          </p>
          <button>
            <Link to="/shop" id="shopButton" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white">Shop Now</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero