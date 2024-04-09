import { Link } from "react-router-dom";

function OrderDetails() {
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
                    <input type="text" id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>

                <div className="mt-4">
                    <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                    <input type="text" id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label htmlFor="state" className="block text-gray-700 dark:text-white mb-1">State</label>
                        <input type="text" id="state" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                    <div>
                        <label htmlFor="zip" className="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                        <input type="text" id="zip" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                </div>
            </div>

            <Link to="/payment" >
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