import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get('http://localhost:3001/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    };

    return (
        <div className=''>
        <div className='m-5'>
            <div className='flex flex-row justify-end'>

                
                {/* <h1 className='text-3xl text-center text-blue-500 font-bold pb-5'>ManageItems</h1> */}
                <Link to={"/CreateItem"}>     
                                <button type="submit" className="text-white w-32 mb-4 ml-10 text-lg  rounded-md bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
                                        Add Item
                                </button>
                </Link>
            </div>
            <div className='justify-center flex'>
            <table className='grow border-separate border border-slate-500 border-separate border-spacing-0 table-auto'>
                <thead className='bg-slate-400'>
                    <tr className="text-xl text-left ">
                        <th className='pl-2'>Item Type</th>
                        <th className='pl-2'>Name</th>
                        <th className='pl-2'>Price</th>
                        <th className='pl-2'>Quantity</th>
                        {/* <th className='pl-2'>Is Available</th>
                        <th className='pl-2'>Stock</th> */}
                        <th className='pl-2'>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr className='text-1xl' key={item.Item_ID}>
                            <td className="w-1/4 h-5 pl-2">{item.item_type}</td>
                            <td className="w-1/4 h-5 pl-2">{item.item_name}</td>
                            <td className="w-1/4 h-5 pl-2">{item.item_price}</td>
                            <td className="w-1/4 h-5 pl-2 font-bold">
                                {item.item_quantity <= 5 ? (
                                        <>
                                        {item.item_quantity} <span className='text-red-700'>(Low)</span>
                                        </>
                                    ) : (
                                        item.item_quantity
                                    )}
                            </td>
                            {/* <td className="w-1/4 h-5 pl-2">{item.availability}</td>
                            <td className="w-1/4 h-5 pl-2">{item.stock_level}</td> */}
                            <td className="w-1/4 h-5 pl-3 text-center font-bold text-blue-800">
                                {/* <Link to={"/ViewItem"}>View</Link> */}
                                <button className='my-0.5 bg-blue-500 rounded-md'><Link to={`/ViewItem/${item.Item_ID}`} className="mx-2 hover:text-blue-200 text-blue-800 font-bold">View</Link></button>
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

export default AdminDItems;