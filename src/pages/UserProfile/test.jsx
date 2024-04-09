import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserThunk,
  updateUserThunk,
} from "./../../store/slices/userProfileSlice";
const TestCloudinary = () => {
  const [imgUrl, setImgUrl] = useState("");
  const userId = 11;
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImgUrl(e.target.files[0]);
  };

  // const handleImageSubmit = async () => {
  //   const image = new FormData();
  //   image.append("file", imgUrl);
  //   image.append("cloud_name", "dywqswxz9");
  //   image.append("upload_preset", "dcqofyur");

  //   fetch("https://api.cloudinary.com/v1_1/dywqswxz9/image/upload", {
  //     method: "post",
  //     body: image,
  //   }).then((res) => {
  //     console.log(res);
  //     res.json().then((imgData) => {
  //       const imageURL = imgData.url.toString();
  //       console.log(imageURL);
  //       return imageURL;
  //     });
  //   });
  // };
  const handleImageSubmit = async () => {
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

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      image: null,
    },
    // validationSchema: Yup.object({
    //   first_name: Yup.string()
    //     .required("First Name is required")
    //     .matches(
    //       nameRegExp,
    //       "First Name must contain English alphabetic characters only"
    //     ),
    //   last_name: Yup.string()
    //     .required("Last Name is required")
    //     .matches(
    //       nameRegExp,
    //       "Last Name must contain English alphabetic characters only"
    //     ),
    //   phone: Yup.string()
    //     .required("Phone is required")
    //     .matches(phoneRegExp, "Invalid phone number"),
    //   email: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is required"),
    // }),
    onSubmit: (values) => {
      handleImageSubmit()
        .then((imageURL) => {
          console.log("Uploaded image URL:", imageURL);
          console.log("Form values:", values);
          const formData = new FormData();
          formData.append("first_name", values.first_name);
          formData.append("last_name", values.last_name);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          formData.append("image", imageURL);
          for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
          updateUserProfile(formData);
        })
        .catch((error) => {
          console.error("Error handling image submission:", error);
        });
    },
  });

  return (
    <div className="basis-1/2">
      <div className="form-div rounded-lg p-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
          {/* ------------------------------ Image ------------------------------ */}
          <div>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </div>
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
                <p className="mt-3" style={{ color: "red", fontSize: "14px" }}>
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
                <p className="mt-3" style={{ color: "red", fontSize: "14px" }}>
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
                <p className="mt-3" style={{ color: "red", fontSize: "14px" }}>
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
                <p className="mt-3" style={{ color: "red", fontSize: "14px" }}>
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
                // onClick={(e) => {
                //   handleImageSubmit(e);
                // }}
                disabled={!formik.isValid}>
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestCloudinary;
