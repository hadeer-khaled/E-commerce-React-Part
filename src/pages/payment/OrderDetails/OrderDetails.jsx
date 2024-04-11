import { Link } from "react-router-dom";
import {useState} from 'react';
import {setDetails} from '../../../store/slices/orderDetailsSlice'
import {useDispatch , useSelector} from 'react-redux'
function OrderDetails() {

    const [address1 , setAddress] = useState('')
    const [city1 , setCity] = useState('')
    const dispatch = useDispatch()

    const {address,city} = useSelector( (state) => state.orderDetailsReducer)

    function handleAddress(e)
    {
        setAddress(e.target.value)
    }

    function handleCity(e)
    {
        setCity(e.target.value)
    }

    function handleSubmit()
    {
        dispatch(setDetails({address: address1,city: city1}))
        console.log("data is set")
        console.log(`Address : ${address} , City: ${city}`)
    }
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-8 m-8">
    <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

            {/* <!-- Shipping Address --> */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
                

                <div className="mt-4">
                    <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Address</label>
                    <input type="text" onChange={handleAddress} id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>

                <div className="mt-4">
                    <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                    <input type="text" onChange={handleCity} id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>
            </div>

            <Link to="/payment" onClick={handleSubmit}>
            <div className="mt-8 flex justify-end">
                <button className="btn btn-success text-white font-normal">Place Order</button>
            </div>
            </Link>

        </div>
    </div>
    </div>
    )
    }

export default OrderDetails;