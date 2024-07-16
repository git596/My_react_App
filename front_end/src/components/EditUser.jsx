import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = ({ user, setEditMode , updateUserDetails }) => {
    const [editedUser, setEditedUser] = useState(user);
    const { userId } = useParams(); // Access userId from URL parameters using useParams()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/user/${userId}`, {...editedUser, userId: userId} )
            .then(response => {
                console.log('User updated successfully:', response.data);
                updateUserDetails(editedUser);  // Update user details in ViewUser component
                setEditMode(false); // Exit edit mode after successful update
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="firstName" className="font-bold">First Name:</label> */}
                    <input type="text" id="firstName" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="first_name" value={editedUser.first_name} onChange={handleChange} />
                </div>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="lastName" className="font-bold">Last Name:</label> */}
                    <input type="text" id="lastName" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="last_name" value={editedUser.last_name} onChange={handleChange} />
                </div>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="email" className="font-bold">Email:</label> */}
                    <input type="email" id="email" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="email" value={editedUser.email} onChange={handleChange} />
                </div>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="address" className="font-bold">Address:</label> */}
                    <input type="text" id="address" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="address" value={editedUser.address} onChange={handleChange} />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                    <button onClick={() => setEditMode(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
