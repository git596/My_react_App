import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";
import {FiTwitter,FiFacebook} from 'react-icons/fi';
import {AiOutlineInstagram,AiOutlineYoutube,AiFillGithub} from 'react-icons/ai';
import Ras from "../assets/Ras.png";
import { HiOutlineMail } from "react-icons/hi";
import { TbPhoneCall } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="w-full ">
      {/* <div className="download w-full  py-16 rounded-xl">
        <div className="flex flex-col justify-center items-center space-y-5">
          <h1 className="textxl md:text-3xl font-bold text-gray-600">
            Rasanjana Communications
          </h1>
          <div className="flex space-x-5">
            <div className="flex items-center space-x-2 px-5 py-2 bg-slate-800 rounded-2xl drop-shadow-xl">
              <FaGooglePlay size={"1.5rem"} />
              <div>
                <p className="text-xs text-white ">Get ON</p>
                <h1 className="text-sm text-white ">Google Play</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-5 py-2 bg-slate-800 rounded-2xl drop-shadow-xl">
              <IoLogoAppleAppstore size={"1.5rem"} />
              <div>
                <p className="text-xs text-white">Get ON</p>
                <h1 className="text-sm text-white">App Store</h1>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <footer className="flex flex-row w-full py-5 pt-10 px-20 bg-gray-900 text-white">

        <div className="gap-2 flex flex-col ">
              <div className=''>
                <img src={Ras} alt="" className="h-[3.5rem] flex justify-between items-center bg-transparent w-[15rem]"/>
              </div>
            {/* <div className="flex ml-10 h-12 w-40 text-gray-200 items-center space-x-2 px-5 py-2 bg-slate-700 rounded-2xl drop-shadow-xl">
                  <FaGooglePlay size={"1.5rem"} />
                  <div>
                    <p className="text-xs ">Get ON</p>
                    <h1 className="text-sm ">Google Play</h1>
                  </div>
            </div>
            <div className="flex ml-10 h-12 w-40 text-gray-200 items-center space-x-2 px-5 py-2 bg-slate-700 rounded-2xl drop-shadow-xl">
                  <IoLogoAppleAppstore className="" size={"1.5rem"} />
                  <div>
                    <p className="text-xs">Get ON</p>
                    <h1 className="text-sm">App Store</h1>
                  </div>
            </div> */}
            <div className="mt-3">
                <div className=" ml-9 flex flex-row items-center h-9 w-50 text-gray-400 space-x-2  my-0 rounded-2xl drop-shadow-xl">
                  <HiOutlineMail size={"2.0rem"}/>
                  <a href="mailto:ishadyaap@gmail.com" className="text-md text-blue-500 hover:underline">ishadyaap@gmail.com</a>
                </div> 
                
                <div className=" ml-9 flex flex-row items-center h-9 w-50 text-gray-400 space-x-2  my-0 rounded-2xl drop-shadow-xl">
                  <TbPhoneCall size={"2.0rem"}/>
                  <a href="https://wa.me/+94716034101" className="text-md text-blue-500 hover:underline">+ 94 71 603 4101</a>
                </div> 
            </div>
        </div>
        
        <div className="w-11/12 text-gray-400 md:w-1/3 mb-0 m-auto flex flex-col items-center text-center space-y-5">
          
          {/* <ul className="flex items-cener space-x-5 text-sm">
            <li>Features</li>
            <li>Trending</li>
            <li>About</li>
          </ul> */}
          <p className="text-sm  p-5">Rasanjana Communications in Bandaragama offers quality photocopying, printing, laminating, typesetting, online payments, binding, and a selection of stationery. Serving the community with dedication for years.</p>
          <p className="pb-0">© 2024. All rights reserved. MIT Technologies</p>
        </div>
        <div className="gap-3 flex flex-col items-end text-gray-400 ml-16">
        <h1 className="text-2xl font-bold">Follow Us</h1>
        <div className="icons flex items-center space-x-4 ">
                <a href="https://www.instagram.com/ish_adya_/" className="hover:text-blue-500"><AiOutlineInstagram size={"2rem"}/></a>
                <a href="https://www.youtube.com/channel/UCYjKEqyijJI8uaCy36I51wA" className="hover:text-blue-500"><AiOutlineYoutube size={"2.4rem"}/></a>
                <a href="https://www.facebook.com/damindu.abeysinghe.7" className="hover:text-blue-500"><FiFacebook size={"1.8rem"}/></a>
                
        </div>
        <div className="space-y-5 space-x-5 text-sm text-right">
          No 143/1 Madapatha Rd, <br/>
          Bandaragama, <br/>
          Piliyandala.
        </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
