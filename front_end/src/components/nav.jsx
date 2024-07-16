import React, { useEffect } from 'react';
// import '../animation.css';
import Ras from "../assets/Ras.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";
import { FaUser, FaCaretDown, FaBell } from 'react-icons/fa';
// import animation from "../animation";

import axios from 'axios';                                  //for cart and cartcount
import { FaCartShopping } from "react-icons/fa6";           //for cart and cartcount



const nav = () => {
    const [click, setClick] = useState(false);        //newww
    const [userName, setUserName] = useState('');      //newww
    const [dropdownOpen, setDropdownOpen] = useState(false);    //newww

    const [cartCount, setCartCount] = useState(0);          //for cart and cartcount
    const [userType, setUserType] = useState('');           //for cart and cartcount

    const [newMessagesCount, setNewMessagesCount] = useState(0);   // this is to show notifications

    const toggleDropdown = () => {                  //newww
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {                                               //newww
        //Retrieve the user's first name from local storage
        const displayName = localStorage.getItem('userName');
        setUserName(displayName);

        const token = localStorage.getItem('token');            //for cart and cartcount
        const userType = localStorage.getItem('userType');      //for cart and cartcount
        setUserType(userType);                                  //for cart and cartcount

        const fetchCartCount = async () => {            //this function is for cart and cartcount
            if (userType === 'customer') {
                try {
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
            }
        };          //this function is for cart and cartcount

        const fetchNewMessagesCount = async () => {               //this is to show notifications
            if (userType === 'owner') {
                try {
                    const response = await axios.get('http://localhost:3001/messages/count', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setNewMessagesCount(response.data.count);
                } catch (error) {
                    console.error('Error fetching new messages count:', error);
                }
            }
        };                                                      //this is to show notifications

        fetchCartCount();           //for cart and cartcount
        fetchNewMessagesCount();   //this is to show notifications
    }, []);




    const closeMenu = () => setClick(false);        //newwww
    const navigateTo = useNavigate();               //neewww

    const logout = () => {                          //newww
        localStorage.removeItem('token');
        navigateTo('/Login');
    }

    const handleMessagesClick = () => {
        navigateTo('/messages');
        setNewMessagesCount(0);
    }
    
    return (
        <nav className="bg-gray-900 h-20"> {/* Apply the background color here */}
            <div className="h-full flex justify-between z-50 text-white px-0">
                <div className='h-full flex justify-between'>
                <img src={Ras} alt="" className="h-3/4 flex justify-between items-center  m-auto bg-transparent w-full ml-3 "/>
                </div>
                <div className="lg:flex md:flex flex-1 items center justify-end font-normal hidden pr-4">
                    <div className="flex-10">
                        <ul className="flex gap-0 mr-0 text-[18px] px-0">
                            {/* <Link spy={true} smooth={true} to="/Home" className='my-1'>
                            <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Home</label>
                            </Link> */}
                            <Link spy={true} smooth={true} to="/About" className='my-1'>
                                <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">About</label>
                            </Link>
                            <Link spy={true} smooth={true} to="/Services" className='my-1'>
                                <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Services</label>
                            </Link>
                            <Link spy={true} smooth={true} to="/Items" className='my-1'>
                                <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Items</label>
                            </Link>
                            <Link spy={true} smooth={true} to="/Contact" className='my-1'>
                                <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Contact Us</label>
                            </Link>

                            {userType === 'customer' && (
                                <Link to="/cart" className='my-1'>
                                    <div className='my-1 relative'>
                                        <div className="cart-icon px-3 pt-5 flex flex-row items-center hover:text-indigo-500 rounded-xl cursor-pointer">
                                            <FaCartShopping className='text-3xl hover:text-indigo-500 font-semibold' />
                                                {/* <span className='text-sm font-semibold'>
                                                    ({cartCount})
                                                </span> */}
                                                <span className='absolute top-1 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                                                    {cartCount}
                                                </span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {userType === 'owner' && (
                                <div className='flex flex-row'>
                                    <div className='my-1 relative'>
                                        <Link spy={true} smooth={true} to="/Admin" className='my-1'>
                                            <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Dashboard</label>
                                        </Link>
                                    </div>
                                    <div className='my-1 relative'>
                                        <div className="cart-icon px-3 pt-5 flex flex-row items-center hover:text-indigo-500 rounded-xl cursor-pointer" onClick={handleMessagesClick}>
                                            <FaBell className='text-2xl hover:text-indigo-500 font-semibold' />
                                            {/* {newMessagesCount > 0 && ( */}
                                                <span className='absolute top-2 right-0 bg-green-500 text-black font-bold rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                                                    {newMessagesCount}
                                                </span>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='flex flex-col justify-between items-center pl-16'>
                                <div className='flex flex-row justify-between items-center'>
                                        <div className='flex items-center pt-3'>
                                        <FaUser className='text-2xl pt-0'/>
                                            <button onClick={toggleDropdown} className='nav-link px-0 py-2'>
                                                <FaCaretDown className='text-white' />
                                            </button>
                                        </div>
                                </div>

                                {dropdownOpen && (
                                        <div className='absolute top-16 right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg'>
                                            <button onClick={logout} className="nav-link px-3 py-2 block w-full text-left text-white hover:bg-gray-700">
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }
                                                                {/* <div className='flex flex-row justify-between items-center'>
                                                                    <Link spy={true} smooth={true} to="/Login" className='my-0'>
                                                                    <label className=" pt-2 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Sign In</label>
                                                                    </Link>
                                                                    <label className='px-1 pt-2 flex justify-between items-center'>/</label>
                                                                    <Link spy={true} smooth={true} to="/Registration" className='my-0'>
                                                                    <label className=" pt-2 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Sign Up</label>
                                                                    </Link> 
                                                                </div> */}

                                
                                  

                                <div>
                                    {/* newwww, to display user's first name */}
                                    <label>
                                    {userName && <span className='text-indigo-500 font-semibold pt-1'>Hi, {userName}</span>}  
                                    </label>   
                                </div>   
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default nav;