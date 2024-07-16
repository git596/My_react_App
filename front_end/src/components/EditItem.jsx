import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditItem = ({ item, setEditMode , updateItemDetails }) => {
    const [editedItem, setEditedItem] = useState(item);
    const { itemId } = useParams(); // Access itemId from URL parameters using useParams()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/item/${itemId}`, {...editedItem, itemId: itemId} )
            .then(response => {
                console.log('User updated successfully:', response.data);
                updateItemDetails(editedItem);  // Update item details in ViewUser component
                setEditMode(false); // Exit edit mode after successful update
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold mb-4">Edit Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="item_name" className="font-bold">Item Name:</label> */}
                    <input type="text" id="item_name" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="item_name" value={editedItem.item_name} onChange={handleChange} />
                </div>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="item_type" className="font-bold">Item Type:</label> */}
                    <input type="text" id="item_type" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="item_type" value={editedItem.item_type} onChange={handleChange} />
                </div>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="item_price" className="font-bold">Item Price:</label> */}
                    <input type="text" id="item_price" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="item_price" value={editedItem.item_price} onChange={handleChange} />
                </div>
                <div className="relative my-3 flex justify-center w-full">
                    {/* <label htmlFor="item_brand" className="font-bold">Item Brand:</label> */}
                    <input type="text" id="item_brand" className='w-3/4 h-[2.2rem] rounded-md pl-2' name="item_brand" value={editedItem.item_brand} onChange={handleChange} />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                    <button onClick={() => setEditMode(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditItem;
