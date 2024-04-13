import { useEffect } from 'react';
import ProductsList from '../../components/product-list/product-list';
import Hero from '../../components/hero/hero';
import './Home.css';
import ProductHomeSliderSection from '../../components/ProductHomeSliderSection/ProductHomeSliderSection';
import Swal from 'sweetalert2';
import { setProfileData } from "../../store/slices/userProfileSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_BASE_URL

const client = axios.create({
  baseURL: baseURL,
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
        <ProductHomeSliderSection/>
        <ProductsList/>
      </div>
    </div>
  );
}
export default Home;
