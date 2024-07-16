/* this navigation bar was initially created to display "Cart" and the "Cartcount" 
but then this was cambined with the main navigation bar */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCartShopping } from "react-icons/fa6";

const NavBar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('No token found in local storage');
                    return;
                }

                const response = await axios.get('http://localhost:3001/cart/count', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartCount(response.data.count);
                
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        };

        fetchCartCount();
    }, []);

    return (
        <nav className="navbar flex flex-row space-x-5 ml-20 mb-10">
            <Link to="/">Home</Link>
            <Link to="/cart">
                <div className="cart-icon flex flex-row">
                    <FaCartShopping className='text-2xl text-blue-700'/><span>({cartCount})</span> 
                </div>
            </Link>
        </nav>
    );
};

export default NavBar;
