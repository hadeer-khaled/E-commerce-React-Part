import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserThunk,
  updateUserThunk,
} from "./../../store/slices/userProfileSlice";
import { BaseURL } from "./../../axios/config";

import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPen } from "@fortawesome/free-solid-svg-icons";

import "./UserProfile.css";

const UserProfile = () => {
  const userId = 11;

  const phoneRegExp = /^(010|011|012|015)[0-9]{8}$/;
  const nameRegExp = /^[a-zA-Z ]+$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

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
      });
    }
  }, [loggedUser]);
  const handleImageChange = (e) => {
    setImgUrl(e.target.files[0]);
  };
  const handleImageSubmit = async () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      const image = new FormData();
      image.append("file", imgUrl);
      image.append("cloud_name", "dywqswxz9");
      image.append("upload_preset", "dcqofyur");

      fetch("https://api.cloudinary.com/v1_1/dywqswxz9/image/upload", {
        method: "post",
        body: image,
      })
        .then((res) => {
          console.log(res);
          res.json().then((imgData) => {
            const imageURL = imgData.url.toString();
            console.log(imageURL);
            resolve(imageURL);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error("Error handling image submission:", error);
          reject(error);
        });
    });
  };

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

  // --------------------- User Data Formik ---------------- \\
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

  // --------------------- User Image Formik ---------------- \\
  const imageFormik = useFormik({
    initialValues: {
      image: null,
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
      handleImageSubmit()
        .then((imageURL) => {
          const formData = new FormData();
          formData.append("image", imageURL);
          updateUserProfile(formData);
        })
        .catch((error) => {
          console.error("Error handling image submission:", error);
        });
    },
  });

  return (
    <div className="userprofile-container container mt-28  mb-16 mx-auto  pt-6 pb-6 rounded-lg">
      <div className="flex">
        <div className="basis-1/4">
          <div className="sidebar-container">
            {loggedUser.image && (
              <div className="image-div">
                <div className="avatar">
                  <div className="w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                    <img src={`${loggedUser.image}`} />
                  </div>
                </div>
                <button
                  className="image-edit-btn btn-sm badge bg-accent badge-lg rounded-full"
                  style={{ outline: "none" }}
                  onClick={() =>
                    document.getElementById("change_image_modal").showModal()
                  }>
                  <FontAwesomeIcon icon={faPen} style={{ fontSize: "14px" }} />
                </button>
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

      <dialog
        id="change_image_modal"
        className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box p-1 flex flex-col justify-center items-center">
          <p className="py-4">
            Press ESC key to close the dialog after image uploading
          </p>
          <div className="modal-action">
            <form method="dialog" onSubmit={imageFormik.handleSubmit}>
              <div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="file-input file-input-bordered w-full file-input-accent file-input-sm max-w-xs"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </div>
              {/* <button
                type="submit"
                className="mb-4 show-order-btn rounded-full shadow info btn btn-outline btn-sm btn-accent text-white mt-4  px-4 rounded"
                disabled={!imageFormik.isValid}>
                Update Profile Picture
              </button> */}

              <p>
                {isLoading ? (
                  "Uploading..."
                ) : (
                  <button
                    type="submit"
                    className="mb-4 show-order-btn rounded-full shadow info btn btn-outline btn-sm btn-accent text-white mt-4  px-4 rounded"
                    disabled={!imageFormik.isValid}>
                    Update Profile Picture
                  </button>
                )}
              </p>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;
