import { useEffect } from "react";
import axios from 'axios'
// import  QueryString  from 'query-string'
function TestPayment() {

useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    console.log(query)
    // const values = QueryString(location.search)
    if (query.location.success) {
        // call api
    console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.location.canceled) {
      // send alert !
    console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
    );
    }
}, []);

    const data = {
	"user_id": 1,
	"products" : [
	{
            "product_id": 1,
            "name": "Google Pixel 6",
            "price": "899.00",
            "description": "The Google Pixel 6 is here, with an incredible camera and smooth performance.",
            "avg_rating": "4.50",
            "category": 1,
            "quantity":1,
            "payment_id":"price_1P2pQYEbT5QdQbCz6EHWq0yT"
        },
        {
            "product_id": 2,
            "name": "MacBook Pro 2023",
            "price": "2399.00",
            "description": "The ultimate MacBook Pro, with unmatched performance and stunning display.",
            "avg_rating": "4.70",
            "category": 2,
            "quantity":1,
            "payment_id":"price_1P2pUiEbT5QdQbCzsqFd7uBA"
        }
	],
	"order_details": {
	"city":"Cairo",
	"address":"9 st. 5th settelment"   
	}
}
    const url = import.meta.env.VITE_BASE_URL
    const client = axios.create({
        baseURL: "http://localhost:8000"
    })

    function handleCheckout()
    {
        client.post(`/payment/test-checkout`,data)
        .then((res)=> {console.log(res.data.url)
        window.location.href = res.data.url
        } )
        .catch((err)=> console.log(err.message))
    }

    return (
    <section className="mt-28">
        <div className="product text-center">
        <img
            src="https://res.cloudinary.com/dywqswxz9/image/upload/v1712472992/6191aDbiwjL._AC_UF894_1000_QL80__q9tuqw.jpg"
            alt="The cover of Stubborn Attachments"
            style={{width:"200px", margin:"auto"}}
        />
        <div className="description">
        <h3>Google Pixel 6</h3>
        <h5>$899.00</h5>
        </div>
        </div>
        <form action={`${url}/payment/test-checkout`} method="POST">
        <button className="btn btn-successs" type="submit">
            Checkout
        </button>
        </form>

        <button className="btn btn-info" onClick={handleCheckout}>Pay Now</button>
    </section>
)
}

export default TestPayment


