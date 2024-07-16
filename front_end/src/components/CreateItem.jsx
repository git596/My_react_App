import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateItem = () => {
  const [values, setValues] = useState({
    item_name: '',
    item_type: '',
    item_price: '',
    purchase_price: '',
    item_brand: '',
    item_quantity: '',
    image: null,
    supplier_id: ''
  });
  const [uploadStatus, setUploadStatus] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleGoBack = () => {
    navigate('/Admin', { state: { initialComponent: 'items' } }); // Navigate to AdminDashboard with the subcomponent of AdminDItems
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('item_name', values.item_name);
    formData.append('item_type', values.item_type);
    formData.append('item_price', values.item_price);
    formData.append('purchase_price', values.purchase_price);
    formData.append('item_brand', values.item_brand);
    formData.append('item_quantity', values.item_quantity);
    formData.append('image', values.image);
    formData.append('supplier_id', values.supplier_id);


    try {
      const response = await axios.post('http://localhost:3001/add_item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus(response.data.success);
      // navigate('/Admin');
      // navigate('/Admin', {state: { initialComponent: 'items'}});      //redirect to AdminDashboard with the subcomponent of AdminDItems
      handleGoBack();
    } catch (error) {
      console.error('Error adding item:', error);
      setUploadStatus('Error adding item.');
    }
  };

  

  return (
    <div className='h-screen bg-blue-200 p-5'>
      <div className='bg-blue-400 rounded-md w-1/3 m-auto'>
        <h3 className='text-3xl text-center text-blue-700 font-bold pb-5'>Add Item</h3>
        <div className='m-5 pb-5'>
          <div className='d-flex justify-content-end'>
              <button onClick={handleGoBack} className='bg-blue-700 text-white px-2 py-1 rounded-md'>
              Go Back
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='relative my-3 flex justify-center w-full'>
              {/* <label className='w-4/5 ml-10' htmlFor='item_name'>Item Name</label> */}
              <input type='text' id='item_name' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' name='item_name' placeholder='Item Name' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              {/* <label className='w-4/5 ml-10' htmlFor='item_type'>Item Type</label> */}
              <input type='text' id='item_type' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' name='item_type' placeholder='Item Type' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              {/* <label className='w-4/5 ml-10' htmlFor='item_price'>Item Price</label> */}
              <input type='number' id='item_price' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' name='item_price' placeholder='Item Price' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              {/* <label className='w-4/5 ml-10' htmlFor='purchase_price'>Purchase Price</label> */}
              <input type='number' id='purchase_price' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' name='purchase_price' placeholder='Purchase Price' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              {/* <label className='w-4/5 ml-10' htmlFor='item_brand'>Item Brand</label> */}
              <input type='text' id='item_brand' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' name='item_brand' placeholder='Item Brand' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              <input type='number' id='item_quantity' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' name='item_quantity' placeholder='Item Quantity' autoComplete='off' required onChange={handleInputChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              {/* <label className='w-4/5 ml-10' htmlFor='image'>Item Image</label> */}
              <input type='file' id='image' name='image' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' placeholder='Item Image' accept='image/*'  required onChange={handleFileChange} />
            </div>
            <div className='relative my-3 flex justify-center w-full'>
              <select id='supplier_id' name='supplier_id' className='w-3/4 h-[2.2rem] rounded-md pl-2 sm:text-sm' required onChange={handleInputChange}>
                <option value=''>Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
                    {supplier.FirstName}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group my-3'>
              <button type='submit' className='bg-blue-700 text-white px-2 py-1 rounded-md'>Save</button>
            </div>
          </form>
          {uploadStatus && <p className='mt-4'>{uploadStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
