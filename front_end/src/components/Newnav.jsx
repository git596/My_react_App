import React from 'react';
// import '../animation.css';

import { useState } from "react";
import { Link } from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";
// import animation from "../animation";
const Newnav = () => {
    const [click, setClick] = useState(false);  //using useState hook for a responsive navbar
    const handleClick = () => setClick(!click); //to display the nav bar and not display the nav bar when user clicked respective buttons (toggles value of 'click' between true and false)

    //content variable contains JSX for the collapsible menu, which is conditionally rendered based on the value of click.
    const content = <>
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-orange-900 transition-all">
        <ul className="text-center text-xl p-20">
            <Link spy={true} smooth={true} to="Mouse">
                  <li className="my-4 py-4 border-b border-yellow-800 hover:bg-slate-800 hover:rounded">Mouse</li>
            </Link>
            <Link spy={true} smooth={true}to="PenDrive">
                  <li className="my-4 py-4 border-b border-yellow-800 hover:bg-slate-800 hover:rounded">PenDrive</li>
            </Link>
            <Link spy={true} smooth={true}to="Charger">
                  <li className="my-4 py-4 border-b border-yellow-800 hover:bg-slate-800 hover:rounded">Charger</li>
            </Link>
            <Link spy={true} smooth={true}to="Headset">
                  <li className="my-4 py-4 border-b border-yellow-800 hover:bg-slate-800 hover:rounded">Headset</li>
            </Link>
        </ul>
    </div>
        </>
    return (
        <nav className="bg-blue-900 m-1 rounded-xl"> {/* Apply the background color here */}
            <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-0 py-4">
                <div className="flex items-center flex-1 px-10">
                    <span className="px-5 text-3xl font-bold">Items</span>
                </div>
                <div className="lg:flex md:flex flex-1 items center justify-center font-normal hidden">
                    <div className="flex-10">
                    <ul className="flex gap-8 mr-16 text-[16px] px-0">
                        <Link spy={true} smooth={true} to="/">
                            <li className="hover:text-gray-900 transition bg-blue-500 rounded-xl cursor-pointer px-2 p-1">Mouse</li>
                        </Link>
                        <Link spy={true} smooth={true} to="/">
                            <li className="hover:text-gray-900 transition bg-blue-500 rounded-xl cursor-pointer p-1">PenDrive</li>
                        </Link>
                        <Link spy={true} smooth={true} to="/">
                            <li className="hover:text-gray-900 transition bg-blue-500 rounded-xl cursor-pointer p-1">Charger</li>
                        </Link>
                        <Link spy={true} smooth={true} to="/">
                            <li className="hover:text-gray-900 transition bg-blue-500 rounded-xl cursor-pointer p-1">Headset</li>
                        </Link>
                    </ul>
                    </div>
                </div>
                <div>
                    {/* to conditionally render the content JSX when click is true.  */}
                    {click && content}
                </div>

                <button className="block sm:hidden transition" onClick={handleClick}>
                    {/* When the screen size is less than 768px, the button will be displayed */}
                    {click ? <FaTimes/> : <CiMenuFries/>}
                </button>

            </div>

        </nav>
    );
};

export default Newnav;