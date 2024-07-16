import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";
import Ras from "../assets/Ras.png";
import { FaUser } from 'react-icons/fa';
import { LuUserCircle2 } from "react-icons/lu";

const HomeNav = () => {

    const [click, setClick] = useState(false);      //using useState hook for a responsive navbar
    const handleClick = () => setClick(!click);     //to display the nav bar and not display the nav bar when user clicked respective buttons (toggles value of 'click' between true and false)
    
    //content variable contains JSX for the collapsible menu, which is conditionally rendered based on the value of click.
    const content = <>                              
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition-all">
        <ul className="text-center text-xl p-20">
            
            {/* <Link spy={true} smooth={true}to="/Home">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">Home</label>
            </Link>
            <Link spy={true} smooth={true}to="/About">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">About</label>
            </Link>
            <Link spy={true} smooth={true}to="/Services">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">Services</label>
            </Link>
            <Link spy={true} smooth={true}to="/Items">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">Items</label>
            </Link>
            <Link spy={true} smooth={true}to="/Contact">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">Contact Us</label>
            </Link> */}
            <Link spy={true} smooth={true} to="/Login">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">Sign In</label>
            </Link>
            <Link spy={true} smooth={true}to="/Registration">
            <label className=" px-2 py-1 hover:text-yellow-600 rounded-xl text-xl md:text-base">Sign Up</label>
            </Link>
        </ul>
    </div>
    </>
    
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
                            <label className="px-3 pt-5 flex justify-between items-center hover:text-yellow-600 rounded-xl cursor-pointer">Home</label> 
                            </Link>

                            <Link spy={true} smooth={true} to="/About" className='my-1'>
                            <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">About</label>
                            </Link>

                            <Link spy={true} smooth={true} to="/Services" className='my-1'>
                            <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Services</label>
                            </Link>

                            <Link spy={true} smooth={true} to="/CItems" className='my-1'>
                            <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Items</label>
                            </Link>

                            <Link spy={true} smooth={true} to="/Contact" className='my-1'>
                            <label className="px-3 pt-5 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">Contact Us</label>
                            </Link> */}
                            
                            <div className='flex flex-col justify-between items-center pl-16'>
                                <div>
                                    <FaUser className='text-4xl pt-3'/>
                                </div>
                                <div className='flex flex-row justify-between items-center'>

                                    <Link spy={true} smooth={true} to="/Login" className='my-0'>
                                    <label className=" pt-2 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer">
                                        Sign In
                                    </label>
                                    </Link>

                                    <label className='px-1 pt-2 flex justify-between items-center'>/</label>

                                    <Link spy={true} smooth={true} to="/Registration" className='my-0'>
                                    <label className=" pt-2 flex justify-between items-center  hover:text-yellow-600 rounded-xl cursor-pointer"> 
                                        Sign Up
                                    </label>
                                    </Link> 

                                </div>
                            </div>
                             
                        </ul>
                    </div>
                </div>

                <div>
                    {/*  to conditionally render the content JSX when click is true. */}
                    {click && content} 
                </div>

                {/* When the screen size is less than 768px, the button will be displayed */}
                <button className="block sm:hidden transition" onClick={handleClick}> 
                    {click ? <FaTimes/> : <CiMenuFries/>}       
                </button>
            </div>
        </nav>
    );
};

export default HomeNav;


{/* <div className='flex flex-col justify-between items-center gap-0'>
    <LuUserCircle2 style={{fontSize:"2rem"}} className='text-yellow-500 justify-end' />
    <label className='text-sm text-yellow-500'>You aren't logged in</label>
</div> */}

// The useState hook is a fundamental tool in React for managing state in functional components, and it's commonly used to create interactive and responsive UI components.