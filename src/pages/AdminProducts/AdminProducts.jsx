import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, deleteProductByIdThunk, updateProductByIdThunk, addProductThunk } from '../../store/slices/productsSlice';
import { getCategoriesThunk } from '../../store/slices/categoriesSlice';
import Pagination from '../../components/pagination/Pagination'; // Importing Pagination component

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsSliceReducer.productList);
  const isLoading = useSelector(state => state.productsSliceReducer.isLoading);
  const categoriesList = useSelector(state => state.categoriesSliceReducer.categoryList);
  const currentPage = useSelector(state => state.productsSliceReducer.currentPage);
  const totalPages = useSelector(state => state.productsSliceReducer.totalPages);

  const [newProduct, setNewProduct] = useState({
    category: null,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    avg_rating: 0,
    image: '',
    images: [],
    payment_id: '',
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk({ page: 1, limit: 10, order: '-product_id' }));
    dispatch(getCategoriesThunk({ page: '', limit: '' }));
  }, [dispatch]);

  const handleDeleteProduct = (product_id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProductByIdThunk({ product_id })).then(() => {
        dispatch(getProductsThunk({ page: 1, limit: 10, order: '-product_id' }));
      });
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === 'avg_rating') {
      const rating = parseFloat(value);
      if (!isNaN(rating) && rating >= 0 && rating <= 5) {
        newValue = rating;
      } else {
        alert('Average rating must be a number between 0 and 5.');
        return;
      }
    } else if (name === 'price' || name === 'stock') {
      newValue = parseFloat(value);
    }

    setNewProduct(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleAddProduct = () => {
    for (const key in newProduct) {
      if (newProduct[key] === '') {
        alert('Please fill in all fields.');
        return;
      }
    }

    if (!isCategorySelected) {
      alert('Please select a category.');
      return;
    }

    const imagesString = "/cdn.dummyjson.com/product-images/1/1.jpg,/cdn.dummyjson.com/product-images/1/2.jpg,/cdn.dummyjson.com/product-images/1/3.jpg,/cdn.dummyjson.com/product-images/1/4.jpg,/cdn.dummyjson.com/product-images/1/thumbnail.jpg";
    const imagesArray = imagesString.split(",");
    const newData = {
      ...newProduct,
      images: imagesArray,
      category: parseInt(newProduct.category)
    };
    dispatch(addProductThunk(newData)).then(() => {
      dispatch(getProductsThunk({ page: 1, limit: 10, order: '-product_id' }));
      setNewProduct({
        category: null,
        name: '',
        price: 0,
        stock: 0,
        description: '',
        avg_rating: 0,
        image: '',
        images: [],
        payment_id: '',
      });
    });
  };

  const handleUpdateProduct = (product_id) => {
    const productToUpdate = products.find(product => product.product_id === product_id);
    setNewProduct(productToUpdate);
    setEditingProductId(product_id);
  };

  const handleConfirmUpdate = () => {
    for (const key in newProduct) {
      if (newProduct[key] === '') {
        alert('Please fill in all fields.');
        return;
      }
    }

    if (!isCategorySelected) {
      alert('Please select a category before updating the product.');
      return;
    }

    const imagesString = "/cdn.dummyjson.com/product-images/1/1.jpg,/cdn.dummyjson.com/product-images/1/2.jpg,/cdn.dummyjson.com/product-images/1/3.jpg,/cdn.dummyjson.com/product-images/1/4.jpg,/cdn.dummyjson.com/product-images/1/thumbnail.jpg";
    const imagesArray = imagesString.split(",");
    const newData = {
      ...newProduct,
      images: imagesArray,
      category: parseInt(newProduct.category)
    };
    dispatch(updateProductByIdThunk({ product_id: editingProductId, data: newData })).then(() => {
      dispatch(getProductsThunk({ page: 1, limit: 10, order: '-product_id' }));
      setEditingProductId(null);
      setIsCategorySelected(false);
      setNewProduct({
        category: null,
        name: '',
        price: 0,
        stock: 0,
        description: '',
        avg_rating: 0,
        image: '',
        images: [],
        payment_id: '',
      });
    });
  };

  const handlePageChange = (page) => {
    dispatch(getProductsThunk({ page, limit: 10, order: '-product_id' }));
  };

  return (
    <div className='py-32 px-20 '>
      {isLoading && <p>Loading...</p>}
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Product ID</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Avg Rating</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Images</th>
            <th className="border px-2 py-1">Payment ID</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className=''>
            <td className="border px-2 py-2">New</td>
            <td className="border px-2 py-2">
              <select
                name="category"
                value={newProduct.category || ''}
                onChange={(e) => {
                  handleProductChange(e);
                  setIsCategorySelected(!!e.target.value);
                }}
                className="w-full border rounded px-1 py-1"
              >
                <option value="">Select Category</option>
                {categoriesList.map(category => (
                  <option key={category.category_id} value={category.category_id}>{category.name}</option>
                ))}
              </select>
            </td>
            <td className="border px-2 py-2">
              <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="number" name="price" value={newProduct.price} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="number" name="stock" value={newProduct.stock} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="text" name="description" value={newProduct.description} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="number" name="avg_rating" value={newProduct.avg_rating} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="text" name="image" value={newProduct.image} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="text" name="images" value={newProduct.images} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <input type="text" name="payment_id" value={newProduct.payment_id} onChange={handleProductChange} className="w-full border rounded px-1 py-1" />
            </td>
            <td className="border px-2 py-2">
              <button onClick={editingProductId ? handleConfirmUpdate : handleAddProduct} className="w-16 h-8 bg-emerald-500 hover:bg-emerald-700 text-white font-bold rounded mx-auto">{editingProductId ? 'Confirm' : 'Add'}</button>
            </td>
          </tr>
          {products.map(product => (
            <tr key={product.product_id}>
              <td className="border px-2 py-1">{product.product_id}</td>
              <td className="border px-2 py-1">{product.category}</td>
              <td className="border px-2 py-1">{product.name}</td>
              <td className="border px-2 py-1">{product.price}</td>
              <td className="border px-2 py-1">{product.stock}</td>
              <td className="border px-2 py-1">{product.description}</td>
              <td className="border px-2 py-1">{product.avg_rating}</td>
              <td className="border px-2 py-3 align-top">
                <img 
                  src={`https://${product.image}`} 
                  alt={`Image of ${product.name}`} 
                  className="max-w-xs max-h-xs w-8 h-8 object-cover"
                />
              </td>
              <td className="border px-2 py-1">
                <div className="flex flex-row flex-wrap gap-1">
                  {Array.isArray(product.images) && product.images.map((image, index) => (
                    <img key={index} src={`https://${image}`} alt={`Image ${index + 1} of ${product.name}`} className="w-8 h-8" />
                  ))}
                </div>
              </td>
              <td className="border px-2 py-1">{product.payment_id}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleUpdateProduct(product.product_id)} className="w-16 h-8 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded m-1">Edit</button>
                <button onClick={() => handleDeleteProduct(product.product_id)} className="w-16 h-8 bg-red-500 hover:bg-red-700 text-white font-bold rounded m-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pt-5'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminProducts;
