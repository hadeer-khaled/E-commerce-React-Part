import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
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
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
