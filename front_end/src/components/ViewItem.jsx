import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PiUserSquareThin } from "react-icons/pi";
import EditItem from './EditItem';


const ViewItem = () => {

    const navigate = useNavigate();

    // Get the item ID from the URL parameter
    const { itemId } = useParams();

    const [item, setItem] = useState(null);
    const [editMode, setEditMode] = useState(false);    // State to control edit mode
    const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State to control visibility of delete confirmation dialog


    
    

    // Function to update item details
    const updateItemDetails = (updatedItem) => {
        setItem(updatedItem);
    };

    

    useEffect(() => {
        // Fetch item data from the server based on the item ID
        //and dispaly them in ViewUser component
        axios.get(`http://localhost:3001/item/${itemId}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching item:', error);
            });
    }, [itemId]);


    const handleEdit = () => {
        setEditMode(true);  // Set edit mode to true when Edit button is clicked
    };

    const handleGoBack = () => {
        navigate('/Admin', { state: { initialComponent: 'items' } }); // Navigate to AdminDashboard with the subcomponent of AdminDItems
      };

    const handleDelete = () => {
        //Execute the delete action
        axios.delete(`http://localhost:3001/item/${itemId}`)
            .then(response => {
                console.log('Item deleted successfully:', response.data);
                navigate('/Admin', {state: { initialComponent: 'items'}});      //redirect to AdminDashboard with the subcomponent of AdminDItems
                // navigate('/Admin');

            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };


    if (!item) {
        return <div>Loading...</div>;
    }

    return (

        <div className='h-screen bg-blue-200 p-5'>
             <div className='bg-blue-400 rounded-md w-1/4 h-[50%] m-auto'>


            {editMode ? (  // Render the EditItem component if editMode is true
                <EditItem item={item} setEditMode={setEditMode} updateItemDetails={updateItemDetails}/>
            ) : (

            
                <div className="container mx-auto">
                    <h1 className="text-center text-3xl font-bold mb-4">Item Details</h1>

                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row justify-center items-center gap-0 w-full'> 

                                <div className='flex flex-col justify-start ml-3 w-full items-start gap-0 h-[70%]'>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Item Name: </h5>
                                            <p>{item.item_name}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Item Type: </h5>
                                            <p>{item.item_type}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Item Price: </h5>
                                            <p>{item.item_price}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold">Item Brand: </h5>
                                            <p>{item.item_brand}</p>
                                        </div>
                                        
                                        
                                        
                                </div>
                                
                                <div className='w-full flex flex-col'>
                                    <h5 className="font-bold pl-6">photo</h5>
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
                                {/* <Link to="/EditItem" className="text-blue-800 w-full font-bold">Edit</Link> */}
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
                        <p className="text-lg font-semibold">Do you really want to delete this item?</p>
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

export default ViewItem;