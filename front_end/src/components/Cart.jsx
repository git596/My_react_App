import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('No token found in local storage');
                    return;
                }
                const response = await axios.get('http://localhost:3001/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const updateQuantity = async (cartId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:3001/cart', { cartId, quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(cartItems.map(item => item.Cart_ID === cartId ? { ...item, CartQuantity: quantity } : item));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const removeItem = async (cartId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/cart/${cartId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(cartItems.filter(item => item.Cart_ID !== cartId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.ItemPrice * item.CartQuantity, 0);
    };

    const subtotal = calculateSubtotal();

    const handleCheckout = () => {
        navigate('/Checkout');
    };

    return (
        <div className="cart h-screen overflow-x-auto flex flex-col items-center mt-10 gap-5">
            {/* <NavBar /> */}
            {/* <h2 className='text-3xl font-semibold mb-5'>Shopping Cart</h2> */}
            {cartItems.map(item => (
                <div key={item.Cart_ID} className="cart-item mx-5 bg-slate-200 rounded-md flex flex-row justify-center items-center w-1/2 h-[200px]">
                    <div className='mx-2 w-[400px] h-full flex justify-start items-center'>
                        <img src={item.Image_URL} className="rounded-lg bg-slate-100 h-[85%] w-[50%]" alt="..." />
                    </div>
                    <div className='h-full mt-2 flex flex-col justify-center items-start w-1/3'>
                    <p className='text-md text-green-500 w-full'>{item.ItemName}</p>
                    <p className='text-md text-green-500'>{item.ItemBrand}</p>
                    <p className='mt-2 mb-5'>Price: {item.ItemPrice}</p>
                    <div className='flex flex-row gap-3 items-center text-md w-full'> 
                        <h1 className='mr-2'>Qty: </h1>
                        <button className='bg-green-400 h-[18px] w-[18px] rounded-full flex justify-center items-center' onClick={() => updateQuantity(item.Cart_ID, item.CartQuantity - 1)} disabled={item.CartQuantity <= 1}>
                            <h1 className='text-xl pb-1'>-</h1>
                        </button>
                        <span>{item.CartQuantity}</span>
                        <button className='bg-green-400 h-[18px] w-[18px] rounded-full flex justify-center items-center' onClick={() => updateQuantity(item.Cart_ID, item.CartQuantity + 1)} disabled={item.CartQuantity >= item.ItemQuantity}>
                        <h1 className='text-md pb-1'>+</h1>
                        </button>
                    </div>
                    <button onClick={() => removeItem(item.Cart_ID)} className='text-red-400 font-semibold'>Remove</button>
                    </div>
                </div>
            ))}
            <div className="cart-subtotal mt-10 text-xl text-center">
                <h3>Subtotal: <span className='text-blue-600 font-semibold'>{calculateSubtotal()}</span></h3>
                {subtotal === 0 && (
                    <p className="text-red-500 mt-5">Your cart is empty</p>
                )}
            </div>
            {subtotal > 0 && (
            <button onClick={handleCheckout} className="mt-5 px-4 py-2 mb-3 bg-blue-500 text-white rounded">
                Proceed to Checkout
            </button>
            )}
        </div>
    );
};

export default Cart;
