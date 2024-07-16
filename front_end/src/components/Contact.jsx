import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { MdContactMail } from 'react-icons/md';
import { FiMapPin } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Retrieve user's name and email from local storage
        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('email');

        if (storedName && storedEmail) {
            setName(storedName);
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve token from local storage
        const token = localStorage.getItem('token');

        Axios.post('http://localhost:3001/contact', {
            name,
            email,
            message
        }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(response => {
            console.log(response.data);
            alert('Your message has been sent successfully!');
        }).catch(error => {
            console.error(error);
            alert('There was an error sending your message.');
        });
    }

    return (
        <div className="flex flex-col justify-center overflow-x-auto items-center  bg-gray-100">
                <div className='bg-blue-500 w-full'>
                    <h2 className="text-sm text-white font-bold my-2 text-center underline underline-offset-2 decoration-2">CONTACT US</h2>
                    <h3 className="text-xl text-white font-semibold mb-4 text-center">Get In Touch With Us</h3>
                </div>
                <div className="flex flex-row justify-center items-center pt-5">

                    <div className="max-w-3xl mx-auto bg-gray-100 py-8 mr-10 w-[600px]">
                        <p className="mb-6 text-start font-bold">We welcome your feedback and queries.</p>
                        <p className="mb-6 text-sm text-start">
                        Please contact us through our website, email, or phone. You can also visit our shop. We are committed to providing the best customer service and will do our best to assist you.
                        </p>
                        <p className="mb-6 text-start">
                        ONLINE WORKING HOURS - Monday to Friday - 9.00am - 5.30 pm<br />
                        Saturday - 9.00 am - 1.30 pm
                        </p>

                        <div className="bg-slate-300 hover:bg-blue-500 p-6 text-black hover:text-white rounded-lg mb-6 transition duration-500 ease-in-out">
                        <div className="flex items-center mb-4">
                        <FiMapPin className='h-6 w-6 mr-2'/>
                            <span className="font-semibold">Address</span>
                            <span className="ml-2">
                            No.30, <br />
                            Madapatha Rd, <br />
                            Bandaragama, <br />
                            Sri Lanka.
                            </span>
                        </div>
                        </div>

                        <div className="flex items-center mb-6 bg-slate-300 hover:bg-blue-500 text-black hover:text-white text-black p-6 rounded-lg transition duration-500 ease-in-out">
                        <MdOutlinePhoneInTalk className='h-6 w-6 mr-2'/>
                        <span className="font-semibold">Contact Number</span>
                        <span className="ml-2">+94 716034101</span>
                        </div>

                        <div className="flex items-center bg-slate-300 hover:bg-blue-500 text-black hover:text-white text-black p-6 rounded-lg transition duration-500 ease-in-out">
                        <MdOutlineMail className='h-6 w-6 mr-2'/>
                        <span className="font-semibold">Email Address</span>
                        <span className="ml-2">ishadyaap@gmail.com</span>
                        </div>
                    </div>
                

            <div className="bg-blue-300 rounded-lg shadow-lg p-8 max-w-lg">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Contact us</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between mb-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border-[1px] border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled // Disable editing of name field
                            />
                        </div>
                        <div className="ml-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border-[1px] border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled // Disable editing of name field
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border-[1px] border-black rounded w-full py-2 px-3 bg-blue-300 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            rows="3"
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send Message
                        </button>
                        <div className="ml-4">
                            <MdContactMail className="text-5xl text-blue-600"/>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Contact;
