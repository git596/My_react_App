// import React from 'react';
// import { Link } from 'react-router-dom';
// import { PiUserSquareThin } from "react-icons/pi";

// const ViewUser = () => {
//     return (
//         <div className='h-screen bg-gray-200 p-5'>
//             <div className='bg-gray-400 rounded-md w-1/3 h-[60%] m-auto'>
//                 <h3 className='text-3xl text-center text-blue-700 font-bold pb-5' >View User</h3>

//                     <div className='flex flex-col justify-between items-center gap-0 h-[70%]'>
//                             <div>
                                
//                                 <div className='flex justify-center'>
//                                      <PiUserSquareThin size={150}/>
//                                 </div>

//                             </div>

//                             <div className='m-5 pb-5 w-full'>
//                             <div className='flex w-full justify-end pr-5 pb-5'>
//                             <button className='bg-blue-700 text-white  px-2 py-1 rounded-md'>
//                                 <Link to='/Admin'>Go Back</Link>
//                             </button>
//                             </div>
//                             <div className='flex flex-col gap-2 pl-3 text-left '>
//                                 <h5>First Name: </h5>
//                                 <h5>Last Name: </h5>
//                                 <h5>Email: </h5>
//                                 <h5>Address: </h5>
//                             </div>
//                             </div>
//                     </div>
//             </div>
//         </div>
        
//     );
// };

// export default ViewUser;


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PiUserSquareThin } from "react-icons/pi";
import EditUser from './EditUser';


const ViewUser = () => {

    const navigate = useNavigate();

    // Get the user ID from the URL parameter
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);    // State to control edit mode
    const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State to control visibility of delete confirmation dialog


    const handleGoBack = () => {
        navigate('/Admin', { state: { initialComponent: 'users' } }); // Navigate to AdminDashboard with the subcomponent of AdminDItems
      };
    
    

    // Function to update user details
    const updateUserDetails = (updatedUser) => {
        setUser(updatedUser);
    };

    

    useEffect(() => {
        // Fetch user data from the server based on the user ID
        //and dispaly them in ViewUser component
        axios.get(`http://localhost:3001/user/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [userId]);


    const handleEdit = () => {
        setEditMode(true);  // Set edit mode to true when Edit button is clicked
    };


    const handleDelete = () => {
        //Execute the delete action
        axios.delete(`http://localhost:3001/user/${userId}`)
            .then(response => {
                console.log('User deleted successfully:', response.data);
                navigate('/Admin', {state: { initialComponent: 'users'}});      //redirect to AdminDashboard with the subcomponent of AdminDUsers
                //navigate('/Admin');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };


    if (!user) {
        return <div>Loading...</div>;
    }

    return (

        <div className='h-screen bg-blue-200 p-5'>
             <div className='bg-blue-400 rounded-md w-1/4 h-[50%] m-auto'>


            {editMode ? (  // Render the EditUser component if editMode is true
                <EditUser user={user} setEditMode={setEditMode} updateUserDetails={updateUserDetails}/>
            ) : (

            
                <div className="container mx-auto">
                    <h1 className="text-center text-3xl font-bold mb-4">User Details</h1>

                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row justify-center items-center gap-0 w-full'> 

                                <div className='flex flex-col justify-start ml-3 w-full items-start gap-0 h-[70%]'>
                                        <div className="mb-4">
                                            <h5 className="font-bold">First Name: </h5>
                                            <p>{user.first_name}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Last Name: </h5>
                                            <p>{user.last_name}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Email: </h5>
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Address: </h5>
                                            <p>{user.address}</p>
                                        </div>
                                        
                                        
                                        
                                </div>
                                
                                <div className='w-full flex flex-col'>
                                    <h5 className="font-bold pl-6">Profile photo</h5>
                                    <div className=''>
                                        <PiUserSquareThin size={150}/>
                                    </div>
                                </div>

                            </div>

                            <div className='w-full flex flex-row gap-2 text-center p-2'>

                                <button onClick={handleGoBack} className='bg-blue-700 w-1/3 text-white px-2 py-1 rounded-md'>
                                Go Back
                                </button>
                                {/* <Link to="/Admin" className="text-blue-800 w-full font-bold">Go Back</Link> */}
                                {/* <Link to="/EditUser" className="text-blue-800 w-full font-bold">Edit</Link> */}
                                <button onClick={handleEdit} className="bg-blue-700 w-1/3 text-white px-2 py-1 rounded-md">Edit</button>
                                
                                <button onClick={() => setShowDeleteDialog(true)} className="bg-blue-700 w-1/3 text-white px-2 py-1 rounded-md">Delete</button>
                            </div>

                        </div>


                </div>

            )}
            </div>

            {/* Delete confirmation dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md">
                        <p className="text-lg font-semibold">Do you really want to delete this user?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4">Confirm</button>
                            <button onClick={() => setShowDeleteDialog(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default ViewUser;
