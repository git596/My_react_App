//this is a Test file that was created and tested for correct uploading of documents


import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadDocument = () => {
  const [document, setDocument] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [customerName, setCustomerName] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!document) {
      setUploadStatus('Please select a document to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', document);
    formData.append('customerName', customerName);

    try {
      const response = await axios.post('http://localhost:3001/upload_document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus(response.data.message);
      setDocument(null);
      fileInputRef.current.value = null; // Clear the file input
      navigate('/Admin'); 
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadStatus('Error uploading document.');
    }
  };

  return (
            <div className="flex flex-col items-center p-6 bg-blue-200 rounded-lg shadow-md">
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="mb-4 border-2 border-gray-800 rounded-lg p-2"
                />
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mb-4 border-2 border-gray-500 rounded-lg p-2"
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Upload
                </button>
                {uploadStatus && <p className="mt-4 text-green-500">{uploadStatus}</p>}
            </div>
  );
};

export default UploadDocument;
