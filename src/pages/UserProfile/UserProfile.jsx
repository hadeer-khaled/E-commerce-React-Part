import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserThunk,
  updateUserThunk,
} from "./../../store/slices/userProfileSlice";
import { BaseURL } from "./../../axios/config";

import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./UserProfile.css";

const UserProfile = () => {
  const userId = 1;
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);

  const navigate = useNavigate();

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
  const handleNavigateMyOrders = () => {
    navigate("/userorders");
  };
  const phoneRegExp = /^(010|011|012|015)[0-9]{8}$/;
  const nameRegExp = /^[a-zA-Z ]+$/;

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
      first_name: Yup.string()
        .required("First Name is required")
        .matches(
          nameRegExp,
          "First Name must contain English alphabetic characters only"
        ),
      last_name: Yup.string()
        .required("Last Name is required")
        .matches(
          nameRegExp,
          "Last Name must contain English alphabetic characters only"
        ),
      phone: Yup.string()
        .required("Phone is required")
        .matches(phoneRegExp, "Invalid phone number"),
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
    <div className="userprofile-container  container mx-auto mt-4 pt-6 pb-6 rounded-lg">
      <div className="flex">
        <div className="basis-1/4">
          <div className="sidebar-container">
            {loggedUser.image && (
              <div className="image-div">
                <div className="avatar">
                  <div className="w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                    <img src={`${BaseURL}/${loggedUser.image}`} />
                  </div>
                </div>
                <div className="image-edit-btn badge bg-accent badge-lg rounded-full">
                  <FontAwesomeIcon icon={faPen} style={{ fontSize: "14px" }} />
                  {/* <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  /> */}
                  {/* <label htmlFor="image-upload">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ fontSize: "14px" }}
                    />
                  </label> */}
                </div>
              </div>
            )}
            <div className="mt-4 text-center" style={{ color: "#a3a3a3" }}>
              <p className="mb-3">{loggedUser.username}</p>
              <p>{loggedUser.email}</p>
              <button
                className="show-order-btn rounded-full shadow info btn btn-outline btn-sm btn-accent text-white mt-4  px-4 rounded"
                type="button"
                onClick={handleNavigateMyOrders}>
                My Orders
              </button>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="form-div rounded-lg p-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
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
                    className="input input-bordered input-sm w-full max-w-xs"
                  />
                  {formik.errors.first_name && formik.touched.first_name && (
                    <p
                      className="mt-3"
                      style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.first_name}
                    </p>
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
                    className="input input-bordered input-sm w-full max-w-xs"
                  />
                  {formik.errors.last_name && formik.touched.last_name && (
                    <p
                      className="mt-3"
                      style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.last_name}
                    </p>
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
                    className="input input-bordered  input-sm w-full max-w-xs"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p
                      className="mt-3"
                      style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.email}
                    </p>
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
                    className="input input-bordered  input-sm w-full max-w-xs"
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <p
                      className="mt-3"
                      style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              </div>
              {/* ------------------------------ Button ------------------------------ */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="update-btn rounded-full shadow info btn  btn-accent text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={!formik.isValid}>
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
