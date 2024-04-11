import axios from 'axios'
import { useSelector } from 'react-redux'

function TestPayment() {

    // user id
    const user = useSelector( (state) => state.userReducer.LoggedUser)
    console.log("userId:",user.user_id)

    // Address , city
    const {address , city} = useSelector((state) => state.orderDetailsReducer)
    console.log('Address => '+ address)
    console.log('City => '+ city)

    // products 
    const products = useSelector((state) => state.userShoppingCartReducer).cartItems
    const order_products = products.map((el)=>{
        let obj = {
            ...el.product,
            quantity: el.quantity
        }
        return obj
    })
    console.log("prods",order_products)

    // all data
    const data = {
        "user_id": user.user_id,
        products: order_products,
        order_details: {
            address,
            city
        }
    }

    localStorage.setItem("data",JSON.stringify(data))
    localStorage.setItem("user",JSON.stringify(user))

    console.log("see Local storage")

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
        {/* <form action={`${url}/payment/test-checkout`} method="POST">
        <button className="btn btn-successs" type="submit">
            Checkout
        </button>
        </form> */}

        <button className="btn btn-info" onClick={handleCheckout}>Check out</button>
    </section>
)
}

export default TestPayment

