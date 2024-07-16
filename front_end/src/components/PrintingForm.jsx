import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const PrintingForm = () => {
    const [document, setDocument] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const [printParts, setPrintParts] = useState([{ startPage: 1, endPage: 1, printType: '', colorOption: '', numCopies: '', pageSize: '', bindingOptions: '' }]);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setDocument(event.target.files[0]);
    };

    const handlePrintPartChange = (index, field, value) => {
        const newPrintParts = [...printParts];
        newPrintParts[index][field] = value;
        setPrintParts(newPrintParts);
    };

    const addPrintPart = () => {
        setPrintParts([...printParts, { startPage: 1, endPage: 1, printType: '', colorOption: '', numCopies: '', pageSize: '', bindingOptions: '' }]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!document) {
            setUploadStatus('Please select a document to upload.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage.');
            setUploadStatus('Authentication token not found.');
            return;
        }

        const formData = new FormData();
        formData.append('document', document);
        formData.append('additionalInstructions', additionalInstructions);
        formData.append('printParts', JSON.stringify(printParts));

        try {
            const response = await axios.post('http://localhost:3001/upload_printing_document', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUploadStatus(response.data.message);
            setDocument(null);
            fileInputRef.current.value = null;
            navigate('/UploadSuccess'); 
        } catch (error) {
            console.error('Error uploading document:', error);
            setUploadStatus('Error uploading document.');
        }
    };

    return (
        <div className="flex-1 h-full p-4 h-screen overflow-x-auto">
            <form onSubmit={handleFormSubmit} className="p-4 flex flex-col gap-2">
                <div className="mb-4">
                    <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700">Additional Instructions</label>
                    <textarea id="additionalInstructions" name="additionalInstructions" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={additionalInstructions} onChange={(e) => setAdditionalInstructions(e.target.value)}></textarea>
                </div>
                
                {printParts.map((part, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Page Range</label>
                            <div className="flex gap-2">
                                <input type="number" placeholder="Start Page" className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.startPage} onChange={(e) => handlePrintPartChange(index, 'startPage', e.target.value)} />
                                <input type="number" placeholder="End Page" className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.endPage} onChange={(e) => handlePrintPartChange(index, 'endPage', e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Print Type</label>
                            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.printType} onChange={(e) => handlePrintPartChange(index, 'printType', e.target.value)}>
                                <option value="">Select Print Type</option>
                                <option value="Single Page">Single Page</option>
                                <option value="Double Page">Double Page</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Color Option</label>
                            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.colorOption} onChange={(e) => handlePrintPartChange(index, 'colorOption', e.target.value)}>
                                <option value="">Select Color Option</option>
                                <option value="Color">Color</option>
                                <option value="Black & White">Black & White</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Number of Copies</label>
                            <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.numCopies} onChange={(e) => handlePrintPartChange(index, 'numCopies', e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Page Size</label>
                            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.pageSize} onChange={(e) => handlePrintPartChange(index, 'pageSize', e.target.value)}>
                                <option value="">Select Page Size</option>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="Letter">Letter</option>
                                <option value="Legal">Legal</option>
                                <option value="Custom Size">Custom Size</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Binding Options</label>
                            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={part.bindingOptions} onChange={(e) => handlePrintPartChange(index, 'bindingOptions', e.target.value)}>
                                <option value="">Select Binding Option</option>
                                <option value="None">None</option>
                                <option value="Stapled">Stapled</option>
                                <option value="Spiral Binding">Spiral Binding</option>
                                <option value="Comb Binding">Comb Binding</option>
                                <option value="Hard Binding">Hard Binding</option>
                            </select>
                        </div>
                    </div>
                ))}
                
                <button type="button" onClick={addPrintPart} className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">Add Another Print Part</button>

                <div className="flex flex-col gap-4">
                    <div>
                        <input type="file" onChange={handleFileChange} ref={fileInputRef} className="mb-4 border-2 border-gray-800 rounded-lg p-2" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit Printing Request</button>
                    {uploadStatus && <p className="mt-4 text-green-500">{uploadStatus}</p>}
                </div>
            </form>
        </div>
    );
};

export default PrintingForm;
