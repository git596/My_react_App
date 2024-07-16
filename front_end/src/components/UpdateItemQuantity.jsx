import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UpdateItemQuantity = () => {
  const [values, setValues] = useState({
    item_id: '',
    supplier_id: '',
    item_quantity: '',
  });
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [updateStatus, setUpdateStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
        try {
          const suppliersResponse = await axios.get('http://localhost:3001/suppliers');
          setSuppliers(suppliersResponse.data);
        //   console.log(suppliersResponse.data);
        } catch (error) {
          console.error('Error fetching suppliers:', error);
        }
      };
  
      fetchSuppliers();
    }, []);

    const fetchItems = async (supplier_id) => {
        try {
          const itemsResponse = await axios.get(`http://localhost:3001/fetchitems?supplier_id=${supplier_id}`);
          setItems(itemsResponse.data);
        //   console.log(itemsResponse.data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'supplier_id') {
      fetchItems(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/update_quantity', values);
      setUpdateStatus(response.data.success);
      navigate('/Admin');
    } catch (error) {
      console.error('Error updating quantity:', error);
      setUpdateStatus('Error updating quantity.');
    }
  };

  return (
    <div className='h-screen bg-blue-200 p-5'>
      <div className='bg-blue-400 rounded-md w-1/3 m-auto'>
        <h3 className='text-3xl text-center text-blue-700 font-bold pb-5'>Update Item Quantity</h3>
        <div className='m-5 pb-5'>
          <div className='d-flex justify-content-end'>
            <button className='bg-blue-700 text-white px-2 py-1 rounded-md'>
              <Link to='/Admin' className='btn btn-success'>Go Back</Link>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='relative my-3 flex justify-center'>
              <select id='supplier_id' name='supplier_id' className='mt-1 block w-3/4 py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required onChange={handleInputChange}>
                <option value=''>Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
                    {supplier.FirstName}
                  </option>
                ))}
              </select>
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              <select id='item_id' name='item_id' className='mt-1 block w-3/4 py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required onChange={handleInputChange} disabled={!values.supplier_id}>
                <option value=''>Select Item</option>
                {items.map((item) => (
                  <option key={item.Item_ID} value={item.Item_ID}>
                    {item.ItemName}
                  </option>
                ))}
              </select>
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              <input type='number'  id='item_quantity' className='w-3/4 h-[2.2rem] rounded-md pl-2' name='item_quantity' placeholder='Item Quantity' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='form-group my-3'>
              <button type='submit' className='bg-blue-700 text-white px-2 py-1 rounded-md'>Update</button>
            </div>
          </form>
          {updateStatus && <p className='mt-4'>{updateStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdateItemQuantity;
