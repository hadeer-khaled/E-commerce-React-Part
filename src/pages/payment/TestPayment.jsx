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
    
    const baseURL = import.meta.env.VITE_BASE_URL

    const client = axios.create({
        baseURL: baseURL
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
        <>
    <section className="mt-28 row grid grid-cols-3 gap-4 m-auto">

        {order_products.map( (el) => {
            return <>
        <div className="p-4 text-center">
        <img src={el.image} alt="The cover of Stubborn Attachments" style={{width:"200px", margin:"auto"}}/>
        <div className="description my-5">
        <h3>{el.name}</h3>
        <h5>{el.price} $</h5>
        </div>
        </div>
        </>           
        })}
    </section>
        <button className="btn btn-info text-center my-10" onClick={handleCheckout}>Check out</button>
        </>
)
}

export default TestPayment

