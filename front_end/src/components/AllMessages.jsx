import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchAllMessages = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3001/all-messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching all messages:', error);
            }
        };

        fetchAllMessages();
    }, []);

    return (
        <div className="container mx-auto p-4 h-screen overflow-x-auto">
    <h1 className="text-2xl font-bold mb-4">All Messages</h1>
    <div className="bg-slate-300 shadow-md rounded-lg p-4">
        {messages.length === 0 ? (
            <p>No messages found</p>
        ) : (
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="w-[150px] py-1 border-2 text-center text-gray-700 font-bold">User ID</th>
                        <th className="w-[150px] py-2 border-2 text-center text-gray-700 font-bold">Name</th>
                        <th className="w-[200px] py-2 border-2 text-center text-gray-700 font-bold">Email</th>
                        <th className="w-[200px] py-2 border-2 text-center text-gray-700 font-bold">Received at</th>
                        
                        <th className="w-[500px] py-2 border-2 text-center text-gray-700 font-bold">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(message => (
                        <tr key={message.Message_ID} className="border-b border-gray-200">
                            <td className="py-2 text-center border-2">{message.User_ID}</td>
                            <td className="py-2 border-2 px-2">{message.Name}</td>
                            <td className="py-2 border-2 px-2">{message.E_mail}</td>
                            <td className="py-2 text-center border-2 ">{new Date(message.Timestamp).toLocaleString()}</td>
                            
                            <td className="py-2 border-2 px-2 font-semibold text-green-600">{message.Message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
</div>

    );
};

export default AllMessages;
