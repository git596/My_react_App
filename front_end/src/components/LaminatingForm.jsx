import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LaminatingForm = () => {
    const [document, setDocument] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [documentSize, setDocumentSize] = useState('');
    const [laminationType, setLaminationType] = useState('');
    const [thickness, setThickness] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setDocument(event.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!document) {
            setUploadStatus('Please select a document to upload.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setUploadStatus('Authentication token not found.');
            return;
        }

        const formData = new FormData();
        formData.append('document', document);
        formData.append('documentSize', documentSize);
        formData.append('laminationType', laminationType);
        formData.append('thickness', thickness);
        formData.append('quantity', quantity);
        formData.append('specialInstructions', specialInstructions);
        formData.append('startPage', startPage);
        formData.append('endPage', endPage);

        try {
            const response = await axios.post('http://localhost:3001/upload_laminating_document', formData, {
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
            setUploadStatus('Error uploading document.');
        }
    };

    return (
        <div className="flex-1 p-4 h-screen overflow-x-auto">
            <form onSubmit={handleFormSubmit} className="p-4 flex flex-col gap-2">
                <div className='flex flex-row gap-5'>
                    <div className='w-full'>
                        <div className="mb-4">
                            <label htmlFor="documentSize" className="block text-sm font-medium text-gray-700">Document Size</label>
                            <select id="documentSize" name="documentSize" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={documentSize} onChange={(e) => setDocumentSize(e.target.value)}>
                                <option value="">Select Document Size</option>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="Letter">Letter</option>
                                <option value="Legal">Legal</option>
                                <option value="Custom">Custom Size</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="laminationType" className="block text-sm font-medium text-gray-700">Lamination Type</label>
                            <select id="laminationType" name="laminationType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={laminationType} onChange={(e) => setLaminationType(e.target.value)}>
                                <option value="">Select Lamination Type</option>
                                <option value="glossy">Glossy</option>
                                <option value="matte">Matte</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className="mb-4">
                            <label htmlFor="thickness" className="block text-sm font-medium text-gray-700">Thickness</label>
                            <select id="thickness" name="thickness" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={thickness} onChange={(e) => setThickness(e.target.value)}>
                                <option value="">Select Thickness</option>
                                <option value="3mil">3mil</option>
                                <option value="5mil">5mil</option>
                                <option value="7mil">7mil</option>
                                <option value="10mil">10mil</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" id="quantity" name="quantity" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">Special Instructions</label>
                            <textarea id="specialInstructions" name="specialInstructions" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div className='w-full'>
                        <div className="mb-4">
                            <label htmlFor="startPage" className="block text-sm font-medium text-gray-700">Start Page</label>
                            <input type="number" id="startPage" name="startPage" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={startPage} onChange={(e) => setStartPage(e.target.value)} />
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className="mb-4">
                            <label htmlFor="endPage" className="block text-sm font-medium text-gray-700">End Page</label>
                            <input type="number" id="endPage" name="endPage" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={endPage} onChange={(e) => setEndPage(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="mb-4 border-2 border-gray-800 rounded-lg p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Submit Laminating Request
                    </button>
                    {uploadStatus && <p className="mt-4 text-green-500">{uploadStatus}</p>}
                </div>
            </form>
        </div>
    );
};

export default LaminatingForm;
