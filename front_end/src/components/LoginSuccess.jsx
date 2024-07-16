import React from 'react';
import success2 from '../assets/success2.gif';
import { Link } from 'react-router-dom';
import { Card } from '@material-tailwind/react';

const LoginSuccess = () => {
    return (
        <div className='bg-gray-600 h-screen justify-center items-center'>
            <div className='flex justify-center items-center h-screen'>
            <Card className="bg-gray-800 h-1/2 w-1/2 mt-10">
                <div className='my-10'>
                    <h2 className="text-white text-3xl font-bold text-center ">Login Successful !</h2>
                    <img src={success2} alt="" className="w-1/3 m-auto bg-transparent"/>
                    {/* <button  className="text-white-500 w-full mb-4 text-[24px] mt-6 rounded-full bg-white-500 py-2">Continue</button> */}
                    <div className='flex justify-center'>
                        {/* To navigate to the very first page of the web */}
                        <Link to={"/Services"}>     
                            <button type="submit" className="text-white w-32 mb-4 text-lg mt-1 rounded-full bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
                                    Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </Card>
            </div>
            
            
        </div>
    );
};

export default LoginSuccess;