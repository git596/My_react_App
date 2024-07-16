import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";

const WorkProgressTable = () => {
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/documents');
                setDocuments(response.data);
                console.log(localStorage.getItem('userType'));
                console.log(localStorage.getItem('userName'));
            } catch (error) {
                console.error('There was an error fetching the document details!', error);
            }
        };
        fetchDocuments();
    }, []);

    const handleToggle = async (index, documentId) => {
        const userType = localStorage.getItem('userType');
        if (userType !== 'owner') {
            console.log('Only owners can toggle the state of work.');
            return;
        }

        const newDocuments = [...documents];
        const newState = newDocuments[index].State === 'in progress' ? 'done' : 'in progress';

        try {
            await axios.put(`http://localhost:3001/api/documents/${documentId}/state`, { newState });
            newDocuments[index].State = newState;
            setDocuments(newDocuments);
        } catch (error) {
            console.error('There was an error updating the state!', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDocuments = documents.filter(doc =>
        `${doc.FirstName} ${doc.LastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-white h-screen'>
            {/* <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by customer name..."
                    className="mb-4 p-2 ml-24 mt-5 w-1/2 border rounded-md"
                /> */}
                <div className='mb-4 p-2 ml-24 mt-5 flex flex-row bg-white w-[320px] h-[40px] border-2 rounded-xl border-indigo-400 items-center'>
                                    <input 
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Search your name here..."
                                        className="p-2 w-[300px] h-full rounded-xl focus:outline-none"
                                    />
                                    <IoMdSearch className='text-blue-800 text-2xl w-10 h-7 mr-1 bg-blue-200 rounded-md'/>
                        </div>
        <div className="container mx-auto px-4 flex justify-center">
            {/* <h1 className="text-2xl font-bold mb-4">Document Progress</h1> */}
            
            <table className="border-collapse border border-slate-500 w-full mt-10">
                <thead>
                    <tr>
                        <th className="py-2 text-center border border-slate-600">Customer Name</th>
                        <th className="py-2 text-center w-2/5 border border-slate-600">Document Name</th>
                        <th className="py-2 text-center border border-slate-600">Service Type</th>
                        <th className="py-2 text-center border border-slate-600">State of Work</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.map((doc, index) => (
                        <tr key={index}>
                            <td className="pl-2 py-2 text-start border border-slate-600">{`${doc.FirstName} ${doc.LastName}`}</td>
                            <td className="pl-2 py-2 text-start border border-slate-600">{doc.Document_Name}</td>
                            <td className="pl-2 py-2 text-start border border-slate-600">{doc.Service_Type}</td>
                            <td className="pl-2 py-2 text-center border border-slate-600">
                                <button
                                    className={`px-4 py-2 rounded w-2/3 ${
                                        doc.State === 'done' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                                    }`}
                                    onClick={() => handleToggle(index, doc.Document_ID)}
                                >
                                    {doc.State}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default WorkProgressTable;
