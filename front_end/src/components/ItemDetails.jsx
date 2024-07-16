import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
/* import NavBar from './NavBar'; this navigation bar was combined with main nav bar in nav.jsx  */


const ItemDetails = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/items/${itemId}`);
                console.log(response.data);  // Ensure the data is logged correctly
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [itemId]);

    const addToCart = async () => {
        try {

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }

            const response = await axios.post('http://localhost:3001/cart', {
                itemId: item.Item_ID,
                quantity: 1 // Default to adding 1 item to the cart
            }
                , {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data);
            // Optionally show a success message or update UI
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    if (!item) {
        return <div>Loading...</div>;  // Show a loading message while the data is being fetched
    }

    return (
                                    // <div className="item-detail h-screen">
                                    //     {/* <NavBar /> this navigation bar was combined with main nav bar in nav.jsx*/}                  
                                    //     <h2>{item.ItemName}</h2>
                                    //     <p>Brand: {item.ItemBrand}</p>
                                    //     <p>Price: {item.ItemPrice}</p>
                                    //     <button className='bg-blue-500 text-white py-1 px-2 rounded' onClick={addToCart}>Add to Cart</button>
                                    //     {/* Add more details here */}
                                    // </div>

        <div className="flex flex-col items-center bg-gray-400 justify-center h-screen">
            <div className="max-w-md mx-auto w-[400px] h-[500px] rounded-lg shadow-lg bg-blue-300 p-6">
                <div className="relative w-full">
                    <div className={`w-1/3 top-0 font-bold left-0 ${item.ItemQuantity > 0 ? 'bg-green-400 text-green-800 border-2 border-green-600' : 'bg-red-400 text-red-800'} px-2 py-1 rounded-bl-lg rounded-tr-lg`}>
                        {item.ItemQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                    <div className='flex flex-col rounded-xl justify-center bg-blue-400 items-center mb-0 mt-2 mx-0'>
                        <img src={item.Image_URL} className="mx-auto rounded-lg h-[35%] w-[45%]" alt="Item..." />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mt-4 mb-0">{item.ItemName}</h2>
                <h2 className="text-2xl font-bold mt-0 mb-2">{item.ItemBrand}</h2>
                {/* <p className="text-gray-600 mb-4">Be the first to review this product</p> */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-700">{item.ItemPrice}</span>
                </div>
                
                <div className="flex justify-center pt-10">
                    {item.ItemQuantity > 0 ? (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={addToCart}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <span className="text-blue-600 font-bold text-center">
                            We are sorry ! <br />
                            This item is currently not available
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
