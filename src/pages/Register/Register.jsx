import {useState} from 'react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const client = axios.create({
baseURL: "http://127.0.0.1:8000" 
})

function Register() {

    const navigate = useNavigate();

    // image upload variables
    const [imgUrl,setImgUrl] = useState('')
    const [isLoading, setLoading] = useState(false)

    // img on change event
    const handleImgChange = (e)=>
    {
        setImgUrl(e.target.files[0])
    }

    const formik = useFormik({
        initialValues: {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirm_password:'',
            phone:'',
            image:'https://res.cloudinary.com/dywqswxz9/image/upload/v1712786118/596d1abe-c91c-4927-b2cf-f1edaa443966_eqwmbl.jpg'
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required("First Name is required").min(3).max(20),
            last_name: Yup.string().required("Last Name is required").min(3).max(20),
            email: Yup.string().required("Email is required").email("Wrong email format"),
            password: Yup.string().min(8,"Password must be at least 8 charachters"),
            confirm_password: Yup.string().oneOf([Yup.ref('password'),null], "Password doesn't match"),
            phone: Yup.string().matches('^01[0125][0-9]{8}','Wrong phone number format'),
            image: Yup.string()
        }),
        onSubmit: async (values) => {

        try {
            if(imgUrl)
            {
            
            setLoading(true)
            let imageURL;
                
            if(imgUrl && (imgUrl.type === "image/png" ||
                imgUrl.type === "image/jpg" ||
                imgUrl.type === "image/jpeg" ))
            {
                const image = new FormData()
                image.append("file", imgUrl)
                image.append("cloud_name", "dywqswxz9")
                image.append("upload_preset", "dcqofyur")

                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dywqswxz9/image/upload",
                    {
                        method: "post",
                        body: image
                    }
                )
                
                const imgData = await res.json()
                imageURL = imgData.url.toString()
            }
            
            setLoading(false)
            
            
            values.role = 'user'
            values.image = imageURL
            
            const response = await client.post("/users/register/", values)
            .then(()=> {
                Swal.fire({
                    icon:'success',
                    text:'registered successfully !!',
                    timer:2000
                })
                navigate('/login')
            })
            .catch(
                (err)=> {
                    console.log(11,err.response.data.message)
                    console.log("Here")
                    Swal.fire(
                        {
                            icon:'error',
                            text: err.response.data.message ,
                            timer:2000
                        }
                    )
                }
            );
            console.log("res",response);
        }

        else {
            values.role = 'user'
            values.image = "https://res.cloudinary.com/dywqswxz9/image/upload/v1712786118/596d1abe-c91c-4927-b2cf-f1edaa443966_eqwmbl.jpg"
            const response = await client.post("/users/register/", values)
            .then(()=> {
                Swal.fire({
                    icon:'success',
                    text:'registered successfully !!',
                    timer:2000
                })
                navigate('/login')
            })
            .catch(
                    (err)=> {
                    console.log(11,err.response.data.message)
                    Swal.fire(
                        {
                            icon:'error',
                            text: err.response.data.message ,
                            timer:2000
                        }
                    )
                }
            );
            
            console.log("res",response);
        }

    }  catch(err) {
            console.log(err.message)
        }
    }
    })
return (
    <section className="bg-gray-50 dark:bg-gray-900 heig p-10">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register
            </h1>
        <form className="space-y-4 md:space-y-4" onSubmit={formik.handleSubmit}>

        <div id="Name Fiels" className="flex justify-between align-middle">

        {/* First Name */}
            <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
            First Name 
            </label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
            />

        {/* Last Name */}
            <label
                htmlFor="last_name"
                className="mx-3 text-sm font-medium text-gray-900 dark:text-white"
                >
            Last Name 
            </label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                />      
        </div>
        <div className="flex align-baseline justify-between">
            {formik.touched.first_name && <p className="right-0 text-red-500">{formik.errors.first_name}</p>}
            {formik.touched.last_name && <p className="left-0 text-red-500">{formik.errors.last_name}</p>}
        </div>

        {/* Email */}
        <div>
                <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Your email
                </label>
                <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />
            {formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
        </div>           
            {/* Phone Number */}
            <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Phone Number
            </label>
            <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
            />       
            {formik.touched.phone && <p className="text-red-500">{formik.errors.phone}</p>}
            
        {/* Password */}
        <div>
                <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Password
                </label>
                <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && <p className="text-red-500">{formik.errors.password}</p>}
            </div>
            <div>
            <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Confirm password
            </label>
            <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
            />
            {formik.touched.confirm_password && <p className="text-red-500">{formik.errors.confirm_password}</p>}
            </div>

            <label className="form-control w-full max-w-xs">
                    <div className="label">
                    <p className="text-white">Profile Picture</p> 
                    </div>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" name="image" onChange={handleImgChange}/>
                    <div className="label">
                    </div>
            </label>
            <button
            type="submit"
            className=" btn btn-active btn-neutral w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={!formik.isValid && !formik.dirty}
            >
            Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to='/login'>
            <p
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
                Login here
            </p>
            </Link>
            </p>
        </form>
        {isLoading ? <p>Creating your account</p> : ""}
        </div>
    </div>
    </div>
</section>
);
}

export default Register;