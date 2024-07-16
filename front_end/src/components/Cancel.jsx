// Cancel.js
import React, { useEffect, useRef } from 'react';
import success2 from '../assets/success2.gif';
import problemIcon from '../assets/Problem_Icon.png';
import { useNavigate } from 'react-router-dom';
import { Card } from '@material-tailwind/react';
import axios from 'axios';

const Cancel = () => {

    const navigate = useNavigate();
    const effectRan = useRef(false);

    const handleNaviagate = () => {
        navigate('/Checkout');
    };

    useEffect(() => {

        if (effectRan.current) return;
        effectRan.current = true;


        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        const customerId = urlParams.get('customer_id');

        const logFailedTransaction = async () => {
            try {
                await axios.get('http://localhost:3001/transaction-complete', {
                    params: { session_id: sessionId, customer_id: customerId, success: 'false' }
                });
            } catch (error) {
                console.error('Error logging failed transaction:', error);
            }
        };

        logFailedTransaction();
    }, []);

  return (
    <div className='bg-gray-400 h-screen'>
            <div className='flex justify-center items-center h-screen'>
            <Card className="bg-gray-700 h-2/3 w-1/2 m-5">
                <div className='my-10'>
                    <h2 className="text-white text-3xl font-bold text-center ">Payment Cancelled !</h2>
                    <p className="text-red-400 font-semibold mt-6 text-center">Your payment was not completed. Please try again</p>
                    <img src={problemIcon} alt="" className="w-1/5 m-auto bg-transparent pt-20"/>
                    <div className='flex justify-center gap-2 pt-32 w-full px-2 items-center'>
                            
                            <button onClick={handleNaviagate} type="submit" className="text-white w-[38%] mb-4 text-lg mt-1 rounded-full bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
                            Back to Checkout
                            </button>
                        
                    </div>
                </div>
            </Card>
            </div>
            
            
        </div>
  );
};

export default Cancel;


/* 
<h2>Payment Cancelled</h2>
      <p>Your payment was not completed. Please try again.</p>
*/