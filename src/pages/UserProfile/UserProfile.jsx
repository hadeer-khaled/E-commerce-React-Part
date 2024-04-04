import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserThunk,
  updateUserThunk,
} from "./../../store/slices/userProfileSlice";

import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfile = () => {
  const userId = 1;
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);

  useEffect(() => {
    dispatch(getLoggedUserThunk(userId));
  }, [dispatch]);
  console.log("loggedUser:", loggedUser);

  // Update the form initial values whenever loggedUser changes
  useEffect(() => {
    if (loggedUser) {
      formik.setValues({
        first_name: loggedUser.first_name,
        email: loggedUser.email,
      });
    }
  }, [loggedUser]);

  const updateUserProfile = async (updatedUserData) => {
    try {
      console.log("Dispatching updateUserThunk action");
      dispatch(updateUserThunk({ userId, updatedUserData }));
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
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      updateUserProfile(values);
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
