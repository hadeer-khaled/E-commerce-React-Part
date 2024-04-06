import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserThunk,
  updateUserThunk,
} from "./../../store/slices/userProfileSlice";
import { BaseURL } from "./../../axios/config";

import { useFormik } from "formik";
import * as Yup from "yup";
import "./UserProfile.css";
const UserProfile = () => {
  const userId = 7;
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);

  useEffect(() => {
    dispatch(getLoggedUserThunk(userId));
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) {
      formik.setValues({
        first_name: loggedUser.first_name,
        last_name: loggedUser.last_name,
        email: loggedUser.email,
        phone: loggedUser.phone,
        // image: loggedUser.image,
      });
    }
  }, [loggedUser]);

  const updateUserProfile = async (formData) => {
    try {
      dispatch(updateUserThunk({ userId, formData }));
      console.log("Update dispatch successful");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // --------------------- Formik ---------------- \\
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      // image: null,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      // formData.append("image", values.image);
      updateUserProfile(formData);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <div className="drawer lg:drawer-open width-fit-content">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
              <div className="menu p-4 w-80 min-h-full bg-base-200">
                <div className="sidebar-container">
                  {loggedUser.image && (
                    <div className="avatar">
                      <div className="w-40 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                        <img src={`${BaseURL}/${loggedUser.image}`} />
                      </div>
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <p className="mb-3">{loggedUser.username}</p>
                    <p>{loggedUser.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center"> */}
        <div className="col-span-2">
          <div className="form-div rounded-lg mt-4 p-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
              {/* ------------------------------ Image ------------------------------ */}
              {/* <div>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
          </div> */}
              {/* ------------------------------ First Name ------------------------------ */}
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    First Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                  {formik.errors.first_name && formik.touched.first_name && (
                    <div className="error">{formik.errors.first_name}</div>
                  )}
                </div>
              </div>
              {/* ------------------------------ Last Name ------------------------------ */}
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Last Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />
                  {formik.errors.last_name && formik.touched.last_name && (
                    <div className="error">{formik.errors.last_name}</div>
                  )}
                </div>
              </div>
              {/* ------------------------------ Email ------------------------------ */}
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </div>
              </div>
              {/* ------------------------------ Phone ------------------------------ */}

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Phone
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="error">{formik.errors.phone}</div>
                  )}
                </div>
              </div>
              {/* ------------------------------ Button ------------------------------ */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow info  bg-accent hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
