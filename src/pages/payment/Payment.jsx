import { useEffect } from "react";
// import  QueryString  from 'query-string'
function Payment() {

useEffect(() => {
    // // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    // console.log(query)
    // // const values = QueryString(location.search)
    // if (query.location.success) {
    // console.log("Order placed! You will receive an email confirmation.");
    // }

    // if (query.location.canceled) {
    //   // send alert !
    // console.log(
    //     "Order canceled -- continue to shop around and checkout when you're ready."
    // );
    // }
}, []);

    const url = import.meta.env.VITE_BASE_URL

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
        <form action={`${url}/payment/create-checkout-session`} method="POST">
        <button className="btn btn-successs" type="submit">
            Checkout
        </button>
        </form>
    </section>
)
}

export default Payment


