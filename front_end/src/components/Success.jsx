// // Success.js
// import React, { useEffect, useRef } from 'react';
// import success2 from '../assets/success2.gif';
// import { useNavigate } from 'react-router-dom';
// import { Card } from '@material-tailwind/react';
// import axios from 'axios';


// const Success = () => {

//     const navigate = useNavigate();
//     const effectRan = useRef(false);


//     const handleNaviagate = () => {
//         navigate('');
//     };

//     const Naviagate = () => {
//         navigate('/items');
//     };

//     useEffect(() => {
//         if (effectRan.current) return;
//         effectRan.current = true;

        
//         const urlParams = new URLSearchParams(window.location.search);
//         const sessionId = urlParams.get('session_id');
//         const customerId = urlParams.get('customer_id');

//         const clearCartAndUpdateQuantities = async () => {
//             try {
//                 const token = localStorage.getItem('token');

//                 // Update item quantities
//                 await axios.post('http://localhost:3001/update-item-quantities', {}, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 // Clear the cart
//                 await axios.delete('http://localhost:3001/clear-cart', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 // Insert transaction record
//                 await axios.get('http://localhost:3001/transaction-complete', {
//                     params: { session_id: sessionId, customer_id: customerId, success: 'true' }
//                 });

//             } catch (error) {
//                 console.error('Error updating item quantities, clearing cart, or inserting transaction:', error);
//             }
//         };

//         clearCartAndUpdateQuantities();
//     }, []);


//   return (
//     <div className='bg-gray-400 h-screen'>
//             <div className='flex justify-center items-center h-screen'>
//             <Card className="bg-gray-700 h-2/3 w-1/2 m-5">
//                 <div className='my-10'>
//                     <h2 className="text-white text-3xl font-bold text-center ">Payment Successful !</h2>
//                     <p className="text-gray-600 text-green-200 font-semibold mt-6 text-center">Click the button below to Shop More</p>
//                     <img src={success2} alt="" className="w-1/3 m-auto bg-transparent pt-10"/>
//                     <div className='flex justify-center gap-2 pt-32 w-full px-2 items-center'>
                            
//                             <button onClick={handleNaviagate} type="submit" className="text-white w-[38%] mb-4 text-lg mt-1 rounded-full bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
//                             Download Invoice
//                             </button>
                        
                            
//                             <button onClick={Naviagate} type="submit" className="text-white w-[38%] mb-4 text-lg mt-1 rounded-full bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
//                             Shop More
//                             </button>
                        
//                     </div>
//                 </div>
//             </Card>
//             </div>
            
            
//         </div>
//   );
// };

// export default Success;

// Success.js
import React, { useEffect, useRef } from 'react';
import success2 from '../assets/success2.gif';
import { useNavigate } from 'react-router-dom';
import { Card } from '@material-tailwind/react';
import axios from 'axios';
import jsPDF from 'jspdf';

const Success = () => {
    const navigate = useNavigate();
    const effectRan = useRef(false);

    const handleNaviagate = () => {
        navigate('');
    };

    const Naviagate = () => {
        navigate('/items');
    };

    const downloadInvoice = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        const customerId = urlParams.get('customer_id');
    
        try {
            const response = await axios.get('http://localhost:3001/get-invoice-details', {
                params: { session_id: sessionId, customer_id: customerId }
            });
    
            const { cartItems, transaction } = response.data;
            const doc = new jsPDF();
    
            doc.setFontSize(18);
            doc.text('Invoice', 10, 10);
    
            doc.setFontSize(12);
            doc.text(`Transaction ID: ${transaction.Transaction_ID}`, 10, 20);
            doc.text(`Date: ${new Date(transaction.Transaction_Date).toLocaleDateString()}`, 10, 30);
            doc.text(`Customer ID: ${transaction.Customer_ID}`, 10, 40);
    
            // Ensure Transaction_Amount is parsed as a number before formatting
            const transactionAmount = Number(transaction.Transaction_Amount);
            doc.text(`Amount: $${transactionAmount.toFixed(2)}`, 10, 50);
    
            let yPosition = 60;
            cartItems.forEach(item => {
                doc.text(`Item: ${item.ItemName}`, 10, yPosition);
                doc.text(`Quantity: ${item.CartQuantity}`, 10, yPosition + 10);
                doc.text(`Price: $${item.ItemPrice.toFixed(2)}`, 10, yPosition + 20);
                yPosition += 30;
            });
    
            doc.save('invoice.pdf');
        } catch (error) {
            console.error('Error generating invoice:', error);
        }
    };
    
    
    
    

    useEffect(() => {
        if (effectRan.current) return;
        effectRan.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        const customerId = urlParams.get('customer_id');

        const clearCartAndUpdateQuantities = async () => {
            try {
                const token = localStorage.getItem('token');

                // Update item quantities
                await axios.post('http://localhost:3001/update-item-quantities', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Clear the cart
                await axios.delete('http://localhost:3001/clear-cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Insert transaction record
                await axios.get('http://localhost:3001/transaction-complete', {
                    params: { session_id: sessionId, customer_id: customerId, success: 'true' }
                });

            } catch (error) {
                console.error('Error updating item quantities, clearing cart, or inserting transaction:', error);
            }
        };

        clearCartAndUpdateQuantities();
    }, []);

    return (
        <div className='bg-gray-400 h-screen'>
            <div className='flex justify-center items-center h-screen'>
                <Card className="bg-gray-700 h-2/3 w-1/2 m-5">
                    <div className='my-10'>
                        <h2 className="text-white text-3xl font-bold text-center ">Payment Successful !</h2>
                        <p className="text-gray-600 text-green-200 font-semibold mt-6 text-center">Click the button below to Shop More</p>
                        <img src={success2} alt="" className="w-1/3 m-auto bg-transparent pt-10"/>
                        <div className='flex justify-center gap-2 pt-32 w-full px-2 items-center'>
                            <button onClick={downloadInvoice} type="submit" className="text-white w-[38%] mb-4 text-lg mt-1 rounded-full bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
                                Download Invoice
                            </button>
                            <button onClick={Naviagate} type="submit" className="text-white w-[38%] mb-4 text-lg mt-1 rounded-full bg-green-700 hover:bg-blue-600 hover:text-gray py-2 transition-colors duration-300">
                                Shop More
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Success;

