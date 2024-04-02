import { useEffect } from "react";
// import { getUserById } from "./../../axios/UserProfile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserThunk } from "./../../store/slices/userProfileSlice";

const UserProfile = () => {
  // const userId = 1;
  // const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   getUserById(userId)
  //     .then((res) => {
  //       console.log("res", res.data);
  //       setUserData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // useEffect(() => {
  //   if (userData) {
  //     console.log("userData: ", userData);
  //   }
  // }, [userData]);

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => {
    return state.userReducer.LoggedUser;
  });
  // const isLoading = useSelector((state) => state.userReducer.isLoading);

  useEffect(() => {
    dispatch(getLoggedUserThunk());
  }, [dispatch]);

  console.log("loggedUser:", loggedUser);

  return (
    <div className="container mt-3">
      <h1>User Data </h1>
      <div className="row mt-3">
        {/* <ul>
          <li> {userData.first_name}</li>
          <li> {userData.last_name}</li>
          <li> {userData.phone}</li>
        </ul> */}
      </div>
    </div>
  );
};
export default UserProfile;
