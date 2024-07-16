import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3001/messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(response.data);
                // console.log(response.data);
                await axios.post('http://localhost:3001/messages/mark-seen', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto p-4 h-screen">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {messages.length === 0 ? (
                    <p>No new messages</p>
                ) : (
                    <ul>
                        {messages.map(message => (
                            <li key={message.Message_ID} className="border-b border-gray-200 py-2">
                                <p><strong>User ID:</strong> {message.User_ID}</p>
                                <p><strong>Message:</strong> {message.Message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button
                onClick={() => navigateTo('/AllMessages')}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                See Past Messages
            </button>
        </div>
    );
};

export default Messages;
