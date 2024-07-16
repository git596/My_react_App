// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// const AdminDUsermanagement = () => {
//     const [data, setData] = useState([])
//     const [deleted, setDeleted] = useState(true)
//     useEffect(()=>{
//         if(deleted){
//             setDeleted(false)
//             axios.get('/students')
//             .then((res)=>{
//                 setData(res.data.data)                  //original code was setData(res.data)
//             })
//             .catch((err)=>console.log(err))
//         }
//     }, [deleted])

//     function handleDelete(id){
//         axios.delete(`/delete/${id}`)
//         .then((res)=>{
//             setDeleted(true)
//         })
//         .catch((err)=> console.log(err))
//     }

//     return (
//         <div className='flex flex-col gap-10 w-full m-5'>
//             <div className='w-full'>
//                 <div><h3>Students</h3></div>
//                 <div className=''>
//                     <button className='bg-blue-500 text-white px-2 py-1 rounded-md'>
//                         <Link className='' to='/CreateUser'>Add Student</Link>
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <table>

//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Address</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {data && Array.isArray(data) && data.map((student)=>{           //this line and below line are modified from original
//                             return (<tr key={student.id}>                               
//                                 <td>{student.id}</td>
//                                 <td>{student.first_name}</td>
//                                 <td>{student.last_name}</td>
//                                 <td>{student.email}</td>
//                                 <td>{student.address}</td>
//                                 <td>
//                                     <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
//                                     <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
//                                     <button onClick={()=>handleDelete(student.id)} className='btn mx-2 btn-danger'>Delete</button>
//                                 </td>
//                             </tr>)
//                         })}
//                     </tbody>

//                 </table>
//             </div>

//         </div>
//     );
// };

// export default AdminDUsermanagement;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    return (
        <div className=''>
        <div className='m-5'>
            <div className='flex flex-row justify-end'>

                
                {/* <h1 className='text-3xl text-center text-blue-500 font-bold pb-5'>ManageUsers</h1> */}
                <Link to={"/CreateUser"}>     
                                <button type="submit" className="text-white w-32 mb-4 ml-10 text-lg  rounded-md bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
                                        Add User
                                </button>
                </Link>
            </div>
            <div className='justify-center flex'>
            <table className='grow border-separate border border-slate-500 border-separate border-spacing-0 table-auto'>
                <thead className='bg-slate-400'>
                    <tr className="text-xl text-left ">
                        <th className='pl-3'>User Type</th>
                        <th className='pl-3'>First Name</th>
                        <th className='pl-3'>Last Name</th>
                        <th className='pl-3'>Email</th>
                        <th className='pl-3'>Address</th>
                        <th className='pl-3'>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr className='text-1xl' key={user.User_ID}>
                            <td className="w-1/4 h-5 pl-3">{user.user_type}</td>
                            <td className="w-1/4 h-5 pl-3">{user.first_name}</td>
                            <td className="w-1/4 h-5 pl-3">{user.last_name}</td>
                            <td className="w-1/4 h-5 pl-3">{user.email}</td>
                            <td className="w-1/4 h-5 pl-3">{user.address}</td>
                            <td className="w-1/4 h-5 pl-3 text-center font-bold text-blue-800">
                                {/* <Link to={"/ViewUser"}>View</Link> */}
                                <button className='my-0.5 bg-blue-500 rounded-md'><Link to={`/ViewUser/${user.User_ID}`} className="mx-2 hover:text-blue-200 text-blue-800 font-bold">View</Link></button>
                                {/* This will navigate to the ViewUser component with the user ID as a parameter. */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default AdminDUsers;

