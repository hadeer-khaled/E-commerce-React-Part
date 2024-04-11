import { useEffect } from 'react';
import ProductsList from '../../components/product-list/product-list';
import Hero from '../../components/hero/hero';
import './Home.css';
import ProductCardSlider from '../../components/ProductCardSlider/ProductCardSlider';
import Swal from 'sweetalert2';
import { setProfileData } from "../../store/slices/userProfileSlice";
import { useDispatch } from 'react-redux';
// import Hero from '../../components/hero/hero.jsx';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Home() {
  
  const dispatch = useDispatch()

  useEffect( () => {
    
    const params = {}
    const query = new URLSearchParams(window.location.search);
    for(const [key,value] of query.entries())
    {
      params[key] = value
      console.log(`${key} : ${value}`)
    }
    console.log("params",params)
    const data = JSON.parse(localStorage.getItem("data"))
    const userData = JSON.parse(localStorage.getItem("user"))

    if(userData)
    {
      dispatch(setProfileData(userData))
    }

    if (params.success) {

      client.post("/payment/confirm",data)
      .then(()=> {
        console.log("success")
      })
      .catch(() => {
        console.log("failed")
      })
      Swal.fire({
        icon:'success',
        title:'payment went successfully !!',
        timer:2000
      })
    }

    if (params.canceled) {
      Swal.fire({
        icon:'error',
        title:'payment got canceled',
        timer:2000
      })
    }
  },[])

  return (
    <div className="home">
      <Hero/>
      <div className="home-content py-20">
      <ProductCardSlider/>
        {/* <h1 className="font-extrabold text-red-600 bg-emerald-200">Home-Page</h1> */}
        <ProductsList/>
      </div>
    </div>
  );
}
export default Home;
