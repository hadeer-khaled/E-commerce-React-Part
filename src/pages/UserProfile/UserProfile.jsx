import { useState, useEffect } from "react";
import { getUserById, updateUserById } from "./../../axios/UserProfile.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLoggedUserThunk,
//   updateUserThunk,
// } from "./../../store/slices/userProfileSlice";

const UserProfile = () => {
  const userId = 1;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserById(userId)
      .then((res) => {
        console.log("getUserById data", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateUser() {
    updateUserById(userId, { first_name: "Hesham" })
      .then((res) => {
        console.log("updated data", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect(() => {
  //   getUserById(userId)
  //     .then((res) => {
  //       console.log("res", res.data);

  //       setUserData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [userData]);

  // const dispatch = useDispatch();
  // const loggedUser = useSelector((state) => state.userReducer.LoggedUser);

  // useEffect(() => {
  //   dispatch(getLoggedUserThunk(userId));
  // }, [dispatch]);
  // console.log("loggedUser:", loggedUser);

  // const updateUserProfile = async () => {
  //   const updatedUserData = {
  //     first_name: "Rahma",
  //   };
  //   try {
  //     console.log("Dispatching updateUserThunk action");
  //     dispatch(updateUserThunk(userId));
  //     console.log("Update dispatch successful");
  //   } catch (error) {
  //     console.error("Error updating user profile:", error);
  //   }
  // };
  return (
    <div className="container mt-3">
      <h1>User Data </h1>
      <div className="row mt-3">
        <ul>
          <li> {userData.first_name}</li>
          <li> {userData.last_name}</li>
          <li> {userData.phone}</li>
        </ul>
      </div>
      <button className="btn" onClick={updateUser}>
        Update Profile
      </button>
    </div>
  );
};
export default UserProfile;
