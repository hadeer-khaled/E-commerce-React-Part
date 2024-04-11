import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { setProfileData , resetProfileData } from '../../store/slices/userProfileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email format"),
      password: Yup.string().required("Password is required").min(8),
    }),
    onSubmit: (values) => {
      values.role = "user";
      client
        .post("/users/login/", values)
        .then((res) => {
          console.log(res.data.message);
          console.log(res.data.data);
          localStorage.setItem('jwt',res.data.jwt)
          Swal.fire({
            icon: 'success',
            title: `Welcome ${res.data.data.first_name}`,
            timer: 2000
          })

          dispatch(setProfileData(res.data.data))
          navigate('/')
        })
        .catch(() => {
          Swal.fire({
            icon:'error',
            text:"incorrect email or password",
            timer:2000
          })
        });
      
    },
  });

  function handleLogout() {
    client
      .post("/users/logout/", { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
      });
      localStorage.removeItem('jwt')
      dispatch(resetProfileData())
      navigate('/')
  }

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <form className="md:w-1/3 max-w-sm" onSubmit={formik.handleSubmit}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}

        <div className="mt-4 flex justify-between font-semibold text-sm"></div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Login
          </button>
        </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don &apos; t have an account?{" "}
        <Link to="/register">
            <p className="text-red-600 hover:underline hover:underline-offset-4">
              Register
            </p>
        </Link>
          </div>
      </form>

      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}

export default Login;