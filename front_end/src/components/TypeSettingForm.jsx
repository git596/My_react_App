import React, { useState, useRef } from 'react';
import UploadDocument from './UploadDocument';
import axios from 'axios';
import { useNavigate } from 'react-router';

const TypesettingForm = () => {

    const [document, setDocument] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const [objectType, setObjectType] = useState('');
    const [formattingStyle, setFormattingStyle] = useState('');
    const [fontType, setFontType] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [layout, setLayout] = useState('');
    const [margins, setMargins] = useState('');
    const [lineSpacing, setLineSpacing] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [additionalElements, setAdditionalElements] = useState([]);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setDocument(event.target.files[0]);
      };

    const handleAdditionalElementsChange = (e) => {
        const value = e.target.value;
        setAdditionalElements((prev) => 
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
        if (!document) {
            setUploadStatus('Please select a document to upload.');
            return;
        }

            const token = localStorage.getItem('token');    //todayyyy Retrieve token from localStorage
            console.log('Token from localStorage:', token);
            
            if (!token) {
                console.error('No token found in localStorage.');
                setUploadStatus('Authentication token not found.');
                return;
            }

            const formData = new FormData();
            formData.append('document', document);
            formData.append('objectType', objectType);
            formData.append('formattingStyle', formattingStyle);
            formData.append('fontType', fontType);
            formData.append('fontSize', fontSize);
            formData.append('layout', layout);
            formData.append('margins', margins);
            formData.append('lineSpacing', lineSpacing);
            formData.append('quantity', quantity);
            formData.append('additionalElements', JSON.stringify(additionalElements));
            formData.append('specialInstructions', specialInstructions);
            formData.append('startPage', startPage);
            formData.append('endPage', endPage);


            try {
                const response = await axios.post('http://localhost:3001/upload_document', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in headers
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setUploadStatus(response.data.message);
                setDocument(null);
                fileInputRef.current.value = null; // Clear the file input
                navigate('/UploadSuccess'); 
                console.log('Document uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading document:', error);
                setUploadStatus('Error uploading document.');
            }
        };


    return (

        <div className="flex-1 p-4 h-screen overflow-x-auto">
        <form onSubmit={handleFormSubmit} className="p-4 flex flex-col gap-2">

            <div className='flex flex-row gap-5'>
                <div className='w-full'>               
                            <div className="mb-4">
                                <label htmlFor="objectType" className="block text-sm font-medium text-gray-700">Document Type</label>
                                <select id="objectType" name="objectType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={objectType} onChange={(e) => setObjectType(e.target.value)}>
                                    <option value="">Select Document Type</option>
                                    <option value="Book">Book</option>
                                    <option value="Article">Article</option>
                                    <option value="Research Paper">Research Paper</option>
                                    <option value="Brochure">Brochure</option>
                                    <option value="Flyer">Flyer</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="formattingStyle" className="block text-sm font-medium text-gray-700">Formatting Style</label>
                                <select id="formattingStyle" name="formattingStyle" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={formattingStyle} onChange={(e) => setFormattingStyle(e.target.value)}>
                                    <option value="">Select Formatting Style</option>
                                    <option value="APA">APA</option>
                                    <option value="MLA">MLA</option>
                                    <option value="Chicago">Chicago</option>
                                    <option value="IEEE">IEEE</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fontType" className="block text-sm font-medium text-gray-700">Font Type</label>
                                <input type="text" id="fontType" name="fontType" placeholder="e.g., Times New Roman" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={fontType} onChange={(e) => setFontType(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Font Size</label>
                                <input type="text" id="fontSize" name="fontSize" placeholder="e.g., 12pt" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="layout" className="block text-sm font-medium text-gray-700">Layout</label>
                                <select id="layout" name="layout" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={layout} onChange={(e) => setLayout(e.target.value)}>
                                    <option value="">Select Layout</option>
                                    <option value="Single Column">Single Column</option>
                                    <option value="Double Column">Double Column</option>
                                </select>
                            </div>
                </div>

                <div className='w-full'>
                            <div className="mb-4">
                                <label htmlFor="margins" className="block text-sm font-medium text-gray-700">Page Margins</label>
                                <input type="text" id="margins" name="margins" placeholder="e.g., 1 inch" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={margins} onChange={(e) => setMargins(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lineSpacing" className="block text-sm font-medium text-gray-700">Line Spacing</label>
                                <select id="lineSpacing" name="lineSpacing" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={lineSpacing} onChange={(e) => setLineSpacing(e.target.value)}>
                                    <option value="">Select Line Spacing</option>
                                    <option value="Single">Single</option>
                                    <option value="1.5 Lines">1.5 Lines</option>
                                    <option value="Double">Double</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input type="number" id="quantity" name="quantity" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="additionalElements" className="block text-sm font-medium text-gray-700">Additional Elements</label>
                                <div className="mt-1 flex">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" value="Headers/Footers" onChange={handleAdditionalElementsChange} />
                                        <span className="ml-2">Headers/Footers</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="checkbox" value="Page Numbers" onChange={handleAdditionalElementsChange} />
                                        <span className="ml-2">Page Numbers</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="checkbox" value="Table of Contents" onChange={handleAdditionalElementsChange} />
                                        <span className="ml-2">Table of Contents</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="checkbox" value="Index" onChange={handleAdditionalElementsChange} />
                                        <span className="ml-2">Index</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="checkbox" value="Footnotes/Endnotes" onChange={handleAdditionalElementsChange} />
                                        <span className="ml-2">Footnotes/Endnotes</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">Special Instructions</label>
                                <textarea id="specialInstructions" name="specialInstructions" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)}></textarea>
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
                    Submit Typesetting Request
                </button>
                {uploadStatus && <p className="mt-4 text-green-500">{uploadStatus}</p>}
            </div>


        </form>
        </div>
    );
};

export default TypesettingForm;
