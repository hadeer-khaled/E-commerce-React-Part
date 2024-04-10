import { useEffect } from "react";
// import  QueryString  from 'query-string'
function Payment() {

useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    // const values = QueryString(location.search)
    // if (values.success) {
    //   // add cart items into order table
    //   // delete cart items for current user
    // console.log("Order placed! You will receive an email confirmation.");
    // }

    // if (values.canceled) {
    //   // send alert !
    // console.log(
    //     "Order canceled -- continue to shop around and checkout when you're ready."
    // );
    // }
}, []);

    const url = import.meta.env.VITE_BASE_URL

    return (
    <section>
        <div className="product">
        <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
        </div>
        </div>
        <form action={`${url}/payment/create-checkout-session`} method="POST">
        <button type="submit">
            Checkout
        </button>
        </form>
    </section>
)
}

export default Payment


