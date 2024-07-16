import React from "react";
import { GiStairsGoal } from "react-icons/gi";
import { PiUserList } from "react-icons/pi";
// import { MdHomeRepairService } from "react-icons/md";

import OurTeam from "./OurTeam";
const About = () => {
  return (
    <div className="bg-gray-700 pb-10">
    <div className="w-11/12 m-auto flex flex-col justify-between items-start md:space-x-10 space-y-10 md:space-y-0 ">
      {/* <div className="flex md:space-x-10 space-x-4">
        <div className="mt-10 space-y-4 ">
          <div className="w-48 flex flex-col items-center  text-center  drop-shadow-2xl p-5 rounded-md">
            <MdHomeRepairService size={"1.8rem"} />
            <h1 className="text-xl font-bold">Good Services</h1>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              harum eius quaerat?
            </p>
          </div>
          <div className="w-48 flex flex-col items-center text-center  drop-shadow-2xl p-5 rounded-md">
            <MdHomeRepairService size={"1.8rem"} />
            <h1 className="text-xl font-bold">Buy Dream Your House</h1>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              harum eius quaerat?
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-48 flex flex-col items-center text-center  drop-shadow-2xl p-5 rounded-md">
            <MdHomeRepairService size={"1.8rem"} />
            <h1 className="text-xl font-bold">Sell Your House Easily</h1>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              harum eius quaerat?
            </p>
          </div>
          <div className="w-48 flex flex-col items-center text-center  drop-shadow-2xl p-5 rounded-md">
            <MdHomeRepairService size={"1.8rem"} />
            <h1 className="text-xl font-bold">Good Services</h1>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              harum eius quaerat?
            </p>
          </div>
        </div>
      </div> */}
      <div className="w-full  space-y-5 pt-10">
        <h1 className="text-6xl font-bold">
          Know <span className="text-yellow-400">About us</span>{" "}
        </h1>
        <p className="text-2xl text-gray-100 flex justify-between items-center">
        At Rasanjana Communications, we're dedicated to providing top-notch products and services to meet all your communication needs. Established in 2020, we have been serving our valued customers with excellence and professionalism.
        </p>
        {/* <button className="px-5 py-2 rounded-md bg-yellow-400">
          Read more
        </button> */}
      </div>
      <div className="flex flex-row justify-start items-center space-x-40">
          <div className="w-11/12 md:w-2/3 spce-y-5 pt-10 pl-32 ">
            <h1 className="text-3xl font-semibold text-yellow-400">Our Mission</h1>
            <p className="text-lg text-gray-100 pt-5 text-justify">Our mission is simple: to offer high-quality communication products and services that enhance your everyday life. We strive to exceed customer expectations by delivering innovative solutions and exceptional customer service.</p>
          </div>
          <div className=" pt-10  ">
            <GiStairsGoal className="h-full  text-indigo-300 text-9xl"/>
          </div>
      </div>
      <div className="flex flex-row justify-start items-center space-x-40">
          <div className="w-11/12 md:w-2/3 spce-y-5 pt-10 pl-32 ">
            <h1 className="text-3xl font-semibold text-yellow-400">Core Values</h1>
            <p className="text-lg text-gray-100 pt-5 text-justify">At Rasanjana Communications, integrity, reliability, and customer satisfaction are at the core of everything we do. We believe in building long-term relationships with our customers based on trust, transparency, and mutual respect.</p>
          </div>
          <div className=" pt-10  ">
            <PiUserList className="h-full  text-indigo-300 text-9xl"/>
          </div>
      </div>
      <div className="space-x-40 w-full">
          {/* <OurTeam /> */}
          <div className="w-11/12 md:w-2/3 spce-y-5 pt-10 pl-32 ">
            <h1 className="text-3xl font-semibold text-yellow-400 w-full pb-5">Co Founder</h1>
            <div className="flex flex-row gap-5 items-center">
              <img className="h-16 w-16 bg-gray-400 rounded-full" alt=""/>
              <h1 className="text-indigo-400 font-semibold text-xl">Rasanjana</h1>
            </div>
          </div>
      </div>
      
      </div>
    </div>
  );
};

export default About;
