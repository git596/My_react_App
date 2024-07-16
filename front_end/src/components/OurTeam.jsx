
//This component is no used hehe

import React from 'react';
// import { AiOutlineTeam } from "react-icons/ai";

const people = [
    {
    name: 'Rasanjana',
    role: 'Owner',
    // imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
    name: 'Suneru',
    role: 'Assistant',
    // imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    
            
]

const OurTeam = () => {
    return (
        <div>
            <div className=" py-2 sm:py-10 pl-24">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                <h1 className="text-3xl font-semibold text-yellow-400">Our Team</h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                Behind every successful venture is a dedicated team. 
                We're here to assist you every step of the way.
                </p>
                </div>
                
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-y-16 xl:col-span-2">       
                {people.map((person) => (
                    <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                        <img className="h-16 w-16 bg-gray-400 rounded-full" src={person.imageUrl} alt="" />
                        <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-300">{person.name}</h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-300">{person.role}</p>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            </div>
            {/* <AiOutlineTeam className="h-full  text-indigo-300 text-9xl"/> */}
        </div>
    );
};

export default OurTeam;