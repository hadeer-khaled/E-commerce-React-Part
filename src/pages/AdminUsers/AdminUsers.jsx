import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../../store/slices/adminUsersSlice";
import { deleteUser } from "../../axios/AdminUsers";

const UserAdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(
    (state) => state.adminUsersReducer.userList
  );
  const userId = 1;

  useEffect(() => {
    dispatch(getUsersThunk(userId));
  }, [dispatch]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      dispatch(getUsersThunk(userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="categ flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Users Admin Dashboard</h1>
      <div className="w-full max-w-screen-lg">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Users Images</th>
              <th className="border border-gray-400 px-4 py-2">Users First Names</th>
              <th className="border border-gray-400 px-4 py-2">Users Last Names</th>
              <th className="border border-gray-400 px-4 py-2">Users Emails</th>
              <th className="border border-gray-400 px-4 py-2">Users Phone Numbers</th>

              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id} className="border border-gray-400">
                  <td className="border border-gray-400 px-4 py-2">
                    <img src={user.image} alt="" className="m-auto" style={{"borderRadius":"50%" , "width":"50px"}}/>
                    </td>
                  <td className="border border-gray-400 px-4 py-2">{user.first_name}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.last_name}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(user.user_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  

};

export default UserAdminDashboard;
