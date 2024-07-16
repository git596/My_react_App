//this is a test component to ensure that the images(items) can be uploaded correctly

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setUploadStatus('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus(response.data.message);
      setImage(null);
      fileInputRef.current.value = null; // Clear the file input
      navigate('/DisplayImages'); 
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef} // Attach ref to the file input
        className="mb-4"
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default UploadImage;
