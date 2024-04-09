import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesThunk } from "../../store/slices/adminCategorySlice";
import { addCategory, deleteCategory } from "../../axios/AdminCategory";

const CategoryAdminDashboard = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.adminCategoryReducer.categoryList
  );
  const userId = 1;
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesThunk(userId));
  }, [dispatch]);

  const handleAddCategory = async () => {
    try {
      await addCategory(newCategoryName);
      dispatch(fetchCategoriesThunk(userId));
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      dispatch(fetchCategoriesThunk(userId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="categ flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Category Admin Dashboard</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>
      <div className="w-full max-w-screen-lg">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Category Name</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category.id} className="border border-gray-400">
                  <td className="border border-gray-400 px-4 py-2">{category.name}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      onClick={() => handleDeleteCategory(category.category_id)}
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

export default CategoryAdminDashboard;
