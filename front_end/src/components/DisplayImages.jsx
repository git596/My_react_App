//this is a test component to ensure that the images(items) we upload are being displayed

import React, { useEffect, useState } from 'react';

const DisplayImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:3001/images');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <div>
        <div id="images" className="deals grid 2xl:grid-cols-5 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10">
            {images.map((image) => (
                <div key={image.Public_ID} className="card mt-5">
                    <img src={image.Image_URL} className="card-img-top" alt="..." />
                </div>
            ))}
        </div>
        </div>
    );
}

export default DisplayImages;
