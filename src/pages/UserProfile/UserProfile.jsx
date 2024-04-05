import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserThunk,
  updateUserThunk,
} from "./../../store/slices/userProfileSlice";
import axiosInstance from "./../../axios/config";

import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfile = () => {
  const userId = 7;
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);

  useEffect(() => {
    dispatch(getLoggedUserThunk(userId));
  }, [dispatch]);

  // Update the form initial values whenever loggedUser changes
  useEffect(() => {
    if (loggedUser) {
      formik.setValues({
        first_name: loggedUser.first_name,
        email: loggedUser.email,
      });
    }
  }, [loggedUser]);

  const updateUserProfile = async (formData) => {
    try {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
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
      email: "",
      profileImage: null,
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
      formData.append("email", values.email);
      formData.append("profileImage", values.profileImage);

      updateUserProfile(formData);
    },
  });

  return (
    <div className="container mt-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={formik.handleSubmit}>
          <div>
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
          <div>
            <input
              type="text"
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
          <div>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue(
                  "profileImage",
                  event.currentTarget.files[0]
                );
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
