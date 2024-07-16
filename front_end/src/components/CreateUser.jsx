import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const CreateUser = () => {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        address: '',
        userType: '',
        gender: '',
        sLocation: '',
        businessName: '',
        ownerDescription: ''
    })

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/Admin', { state: { initialComponent: 'users' } }); // Navigate to AdminDashboard with the subcomponent of AdminDItems
      };

    function handleSubmit(e){
        e.preventDefault()

        axios.post('http://localhost:3001/add_user', values)
        .then((res)=>{
            
            // navigate('/Admin')
            // navigate('/Admin', { state: { initialComponent: 'users' } }); // Redirect to AdminDashboard with the subcomponent of AdminDItems
            handleGoBack();
            console.log(res)
        })
        .catch((err)=>console.log(err))
    };

    


  return (
    <div className='h-screen bg-blue-200 p-5'>
        <div className='bg-blue-400 rounded-md w-1/3 m-auto'>
            <h3 className='text-3xl text-center text-blue-700 font-bold pb-5' >Add User</h3>

            <div className='m-5 pb-5'>
            <div className='d-flex justify-content-end'>
                {/* <Link to='/Admin' class='btn btn-success'>Go Back</Link> */}
                <button onClick={handleGoBack} className='bg-blue-700 text-white px-2 py-1 rounded-md'>
              Go Back
            </button>
            </div>
            <form onSubmit={handleSubmit} className=''>

                <div className='relative my-3 flex justify-center w-full'>
                    {/* <label className='w-4/5 ml-10' htmlFor='first_name'>First Name</label> */}
                    <input type='text' className='w-3/4 h-[2.2rem] rounded-md pl-2' id='first_name' name='first_name' placeholder='First Name' autoComplete='off' required onChange={(e)=> setValues({...values, first_name: e.target.value})} />
                </div>

                <div className='relative my-3 flex justify-center w-full'>
                    {/* <label className='w-4/5 ml-10' htmlFor='last_name'>Last Name</label> */}
                    <input type='text' className='w-3/4 h-[2.2rem] rounded-md pl-2' id='last_name' name='last_name' placeholder='Last Name' autoComplete='off' required onChange={(e)=> setValues({...values, last_name: e.target.value})} />
                </div>

                <div className='relative my-3 flex justify-center w-full'>
                    {/* <label className='w-4/5 ml-10' htmlFor='email'>Email</label> */}
                    <input type='email' className='w-3/4 h-[2.2rem] rounded-md pl-2' id='email' name='email' placeholder='Email' autoComplete='off' required onChange={(e)=> setValues({...values, email: e.target.value})} />
                </div>

                <div className='relative my-3 flex justify-center w-full'>
                    {/* <label className='w-4/5 ml-10' htmlFor='password'>Password</label> */}
                    <input type='password' className='w-3/4 h-[2.2rem] rounded-md pl-2' id='password' name='password' placeholder='Password' autoComplete='off' required onChange={(e)=> setValues({...values, password: e.target.value})} />
                </div>

                <div className='relative my-3 flex justify-center'>
                    {/* <label className='w-4/5 ml-10' htmlFor='address'>Address</label> */}
                    <input type='text' className='w-3/4 h-[2.2rem] rounded-md pl-2' id='address' name='address' placeholder='Address' autoComplete='off' required onChange={(e)=> setValues({...values, address: e.target.value})} />
                </div>

                <div className="relative my-3 flex justify-center">
                    {/* <label htmlFor="userType" className="w-4/5 ml-10">User Type</label> */}
                    <select id="userType" name="userType" autoComplete='off' 
                        className="mt-1 block w-3/4 py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        required onChange={(e) => setValues({...values, userType: e.target.value})}>
                            <option value="">Select User Type</option>
                            <option value="supplier">Supplier</option>
                            <option value="customer">Customer</option>
                            <option value="owner">Owner</option>
                    </select>
                </div>

                {values.userType === 'customer' && (
                            <div className='relative my-3 flex justify-center'>
                                {/* <label className='w-4/5 ml-10' htmlFor='gender'>Gender</label> */}
                                <input type='text' id='gender' className='w-3/4 h-[2.2rem] rounded-md pl-2' name='gender' placeholder='Gender' autoComplete='off' onChange={(e) => setValues({ ...values, gender: e.target.value })} />
                            </div>
                        )}
                        {values.userType === 'supplier' && (
                            <>
                                <div className='relative my-3 flex justify-center'>
                                    {/* <label className='w-4/5 ml-10' htmlFor='sLocation'>Supplier Location</label> */}
                                    <input type='text' id='sLocation' className='w-3/4 h-[2.2rem] rounded-md pl-2' name='sLocation' placeholder='Supplier Location' autoComplete='off' onChange={(e) => setValues({ ...values, sLocation: e.target.value })} />
                                </div>
                                <div className='relative my-3 flex justify-center'>
                                    {/* <label className='w-4/5 ml-10' htmlFor='businessName'>Business Name</label> */}
                                    <input type='text' id='businessName' className='w-3/4 h-[2.2rem] rounded-md pl-2' name='businessName' placeholder='Business Name' autoComplete='off' onChange={(e) => setValues({ ...values, businessName: e.target.value })} />
                                </div>
                            </>
                        )}
                        {values.userType === 'owner' && (
                            <div className='relative my-3 flex justify-center'>
                                {/* <label className='w-4/5 ml-10' htmlFor='ownerDescription'>Owner Description</label> */}
                                <input type='text' id='ownerDescription' className='w-3/4 h-[2.2rem] rounded-md pl-2' name='ownerDescription' placeholder='Owner Description' autoComplete='off' onChange={(e) => setValues({ ...values, ownerDescription: e.target.value })} />
                            </div>
                        )}

                <div className='form-group my-3'>
                    <button type='submit' id='submit' name='submit' autoComplete='off' className='bg-blue-700 text-white px-2 py-1 rounded-md'>Save</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
};

export default CreateUser;