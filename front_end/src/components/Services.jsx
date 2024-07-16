import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="flex flex-col gap-10 items-center justify-center  py-60 space-x-5 ">
            <Link to="/FileUpload">
                <button className="text-white w-80 h-20 bg-slate-900 hover:bg-green-600 hover:text-gray-800 rounded-xl text-3xl ">Laminating</button>
            </Link>
            <Link to="/FileUpload">
                <button className="text-white w-80 h-20 bg-slate-900 hover:bg-green-600 hover:text-gray-800 rounded-xl text-3xl ">Printout</button>
            </Link>
            <Link to="/FileUpload">
                <button className="text-white w-80 h-20 bg-slate-900 hover:bg-green-600 hover:text-gray-800 rounded-xl text-3xl ">TypeSetting</button>
            </Link>
        </div>
    );
};

export default Services;