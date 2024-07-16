import React from "react";
import { Link } from "react-router-dom";
import NewestDeals from "./NewestDeals";
import BestDeals from "./BestDeals";
import HNewestDeals from "./HNewestDeals";

const Hero = () => { 
  return (
    
    <div className="flex justify-center h-[90vh]" style={{backgroundImage: "url('../src/assets/office_copy.png')", backgroundSize: "cover"}}>
        {/* <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{"backgroundImage": "url('../src/assets/bg.jpg')"}}>
      <nav className="flex justify-between items-center py-2">
        <h1 className="text-xl md:text-2xl font-bold mt-0">Rasanjana Communications</h1>
        <div className="flex items-center space-x-5">
            <Link to="/Login">
                <button className="bg-slate-900 px-2 py-1 hover:bg-yellow-600 hover:text-gray-800 rounded-xl text-xs md:text-base">Sign In</button>
            </Link>
        </div>
        <ul className="flex items-center space-x-5 text-xs md:text-base">
          <li>Features</li>
          <li>Trending</li>
          <li>About</li>
        </ul>
        <div className="flex items-center space-x-5">
            <Link to="/Registration">
                <button className="bg-slate-900 px-2 py-1 hover:bg-yellow-600 hover:text-gray-800 rounded-xl text-xs md:text-base">Sign Up</button>
            </Link>
        </div>
      </nav> */}
      <div className="flex flex-col gap-5 justify-center items-center w-full h-[90vh] ">
      <h1 className="text-3xl text-cyan-400 font-sans md:text-6xl font-bold italic subpixel-antialiased text-center px-3">Rasanjana Communications</h1>
      <h2 className="text-3xl text-cyan-200 font-sans md:text-2xl font-bold italic subpixel-antialiased text-center px-3">we're dedicated to providing top-notch products and services <br />to meet all your communication needs with<br /> excellence and professionalism.</h2>
      <div className="flex flex-row gap-5 pt-10">
        <Link className="w-full" to={"/Login"}>
          <button className="bg-green-500 hover:bg-green-700 w-[7.5rem] px-5 py-2 rounded-xl text-xl space-x-2">
            <span className="text-gray-800 font-bold text-center">
              Sign In
            </span>
          </button>
        </Link>
        <Link className="w-full" to={"/Registration"}>
          <button className="bg-green-500 hover:bg-green-700 w-[7.5rem] px-5 py-2 rounded-xl text-xl space-x-2">
            <span className="text-gray-800 font-bold text-center">
              Sign Up
            </span>
          </button>
        </Link>
      </div>
      {/* <h1 className="text-3xl text-cyan-200 font-sans md:text-4xl font-bold italic subpixel-antialiased text-justify px-3 pt-24 pb-0">Welcome</h1>
      <h1 className="text-3xl text-cyan-200 font-sans md:text-4xl font-bold italic subpixel-antialiased text-justify px-3 pt-24 pb-0">Welcome</h1>
      <h1 className="text-3xl text-cyan-200 font-sans md:text-4xl font-bold italic subpixel-antialiased text-justify px-3 pt-24 pb-0">Welcome</h1>
      <h1 className="text-3xl text-cyan-200 font-sans md:text-4xl font-bold italic subpixel-antialiased text-justify px-3 pt-28 pb-0">Welcome</h1>
      <h1 className="text-3xl text-cyan-200 font-sans md:text-4xl font-bold italic subpixel-antialiased text-justify px-3 pt-2 pb-0">Welcome</h1> */}
      </div>
      
        
        {/* <img
        
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-md relative opacity-50"
        /> 
        
      <div className="absolute bottom-5 w-full">
        <div className=" bg-white w-11/12 xl:w-4/5 m-auto grid grid-cols-2 lg:flex justify-between items-center p-5 drop-shadow-2xl md:space-x-5 md:rounded-3xl">
        <div className=" flex flex-col space-y-2 ">
        <label htmlFor="location" className="text-gray-500">Location</label>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" placeholder="USA" className="outline-0 text-xs"/>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="property" className="text-gray-500">property type</label>
          <input type="text" name="property" id="property" placeholder="property" className="outline-0 text-xs"/>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-gray-500">Max Price</label>
          <input type="text" name="price" id="price" placeholder="$8,544" className="outline-0 text-xs"/>
        </div>
        <div>
          <button className="bg-yellow-400 text-gray-800 px-5 py-2 mt-5 md:mt-0 md:rounded-full">Search</button>
        </div>
        </div>
      </div> */}
     
      {/* <NewestDeals/> */}
      {/* <BestDeals/> */}

    </div>

    
  );
};


export default Hero;
