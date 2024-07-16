/* import React, { useEffect, useState } from 'react';

const ItemSet = () => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`http://localhost:3001/images?search=${searchTerm}`);
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredImages = images.filter(image => 
        image.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.ItemBrand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='h-screen overflow-x-auto bg-white p-5 mx-10'>
            <input 
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search items... (by name or brand)"
                className="mb-5 p-2 border-2 rounded-xl w-2/5 border-blue-400"
            />
            <div id="images" className="flex justify-center deals grid 2xl:grid-cols-5 gap-x-3 gap-y-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-5">
                {filteredImages.map((image) => (
                    <div key={image.Public_ID} className="deal h-[320px] bg-gray-200 border border-blue-300 rounded-xl flex flex-col justify-center items-center">
                        <div className='flex h-[65%] w-[80%] mb-0 mt-2 mx-0 justify-center'>
                            <img src={image.Image_URL} className="" alt="..." />
                        </div>
                        
                        <div className='w-full h-[30%] flex flex-col gap-2 justify-start items-start pt-5 p-2 pb-2'>
                            <label className='h-[20%] '><h1 className='text-indigo-900 font-semibold text-sm'>{image.ItemName}</h1></label>
                            <label className='h-[20%] '><h1 className='text-indigo-900 font-bold text-sm'>{image.ItemBrand}</h1></label>
                            <label className='h-[20%] mt-2'><h1 className='text-red-500 font-bold'>{image.ItemPrice}</h1></label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemSet; */

import React, { useEffect, useState } from 'react';
import { BsDash } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ItemSet = () => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Prepare query parameters
                const query = new URLSearchParams({
                    search: searchTerm,
                    brands: selectedBrands.join(','),
                    types: selectedTypes.join(','),
                    minPrice,
                    maxPrice
                });

                const response = await fetch(`http://localhost:3001/images?${query}`);
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [searchTerm, selectedBrands, selectedTypes, minPrice, maxPrice]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBrandChange = (event) => {
        const value = event.target.value;
        setSelectedBrands(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleTypeChange = (event) => {
        const value = event.target.value;
        setSelectedTypes(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleViewClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };


    return (
        <div className='h-screen overflow-x-auto bg-white pb-5 '>
                <div className='flex flex-row justify-between items-center gap-5 h-[20%] bg-gray-700 p-5 rounded-b-md'> 

                        

                        {/* Filters */}
                        <div className="mb-5 flex flex-row gap-16">
                                {/* Brand Filters */}
                                <div>
                                    <h3 className='font-semibold text-white'>Filter by Brand</h3>
                                    <div className='grid grid-rows-3 grid-flow-col gap-4 gap-y-1 h-15'>
                                        
                                        {['Kingston', 'Samsung', 'Transcend', 'Sony', 'Forbes', 'MSI', 'UGREEN'].map(brand => (
                                            <div key={brand} className='text-white'>
                                                <input
                                                    type="checkbox"
                                                    value={brand}
                                                    onChange={handleBrandChange}
                                                    checked={selectedBrands.includes(brand)}
                                                />
                                                <label className='text-sm ml-1'>{brand}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            {/* Type Filters */}
                            <div>
                                <h3 className='font-semibold text-white'>Filter by Type</h3>
                                <div className='grid grid-rows-3 grid-flow-col gap-4 gap-y-1 h-15'>
                                {['Headset', 'Mouse', 'Charger', 'PenDrive'].map(type => (
                                    <div key={type} className='text-white'>
                                        <input
                                            type="checkbox"
                                            value={type}
                                            onChange={handleTypeChange}
                                            checked={selectedTypes.includes(type)}
                                            className=''
                                        />
                                        <label className='text-sm ml-1'>{type}</label>
                                    </div>
                                ))}
                                </div>
                            </div>

                            {/* Price Filters */}
                            <div>
                                <h3 className='font-semibold text-white mb-1'>Filter by Price</h3>
                                <div className='grid grid-rows-1 grid-flow-col gap-x-0 gap-y-1 h-15'>
                                    <div>
                                        {/* <label>Min Price:</label> */}
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={handleMinPriceChange}
                                            placeholder='Min (LKR)'
                                            className="p-1 w-28 text-sm mb-5 border-2 rounded-xl border-blue-400"
                                        />
                                    </div>
                                    <BsDash className='mt-1 text-white text-2xl px-0'/>
                                    <div>
                                        {/* <label>Max Price:</label> */}
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={handleMaxPriceChange}
                                            placeholder='Max (LKR)'
                                            className="p-1 w-28 text-sm mb-5 border-2 rounded-xl border-blue-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            


                        </div>

                        {/* Search Bar */}
                        <div className='flex flex-row bg-white w-[320px] h-[40px] border-2 rounded-xl border-indigo-400 items-center'>
                                    <input 
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Search items..."
                                        className="p-2 w-[300px] h-full rounded-xl focus:outline-none"
                                    />
                                    <IoMdSearch className='text-blue-800 text-2xl w-10 h-7 mr-1 bg-blue-200 rounded-md'/>
                        </div>
                </div>

            {/* Items Display */}
            <div id="images" className="flex justify-center deals mx-10 grid 2xl:grid-cols-5 gap-x-3 gap-y-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-5">
                {images.map((image) => (
                    <div key={image.Public_ID} className="deal h-[320px] bg-gray-200 border border-blue-300 rounded-xl flex flex-col justify-center items-center">
                        <div className='flex h-[65%] w-[80%] mb-0 mt-2 mx-0 justify-center'>
                            <img src={image.Image_URL} className="" alt="..." />
                        </div>
                        
                        <div className='w-full h-[30%] flex flex-col gap-2 justify-start items-start pt-5 p-2 pb-2'>
                            <label className='h-[20%] '><h1 className='text-indigo-900 font-semibold text-sm'>{image.ItemName}</h1></label>
                            <label className='h-[20%] '><h1 className='text-indigo-900 font-bold text-sm'>{image.ItemBrand}</h1></label>
                            <div className='flex flex-row gap-10'>
                                    <label className='h-[20%] mt-2'>
                                        <h1 className='text-red-500 font-bold'>{image.ItemPrice}</h1>
                                    </label>
                                    <button
                                        onClick={() => handleViewClick(image.Item_ID)}
                                        className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
                                    >
                                        View
                                    </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemSet;
















 /* In above code I added search bar also, Also I changed the backend request 'app.get("/images")' accordingly
 following one is the old code, there the search bar is not included, */

// import React, { useEffect, useState } from 'react';

// const ItemSet = () => {
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await fetch('http://localhost:3001/images');
//                 const data = await response.json();
//                 setImages(data);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };
//         fetchImages();
//     }, []);

//     return (
//         //for the following line you can use "overflow-x-auto"(vertical slider) instead of "h-auto", 
//         <div className='h-screen overflow-x-auto bg-white p-5 mx-10 '> 
//         <div id="images" className="flex justify-center deals grid 2xl:grid-cols-5 gap-x-3 gap-y-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-5">
//             {images.map((image) => (
//                 <div key={image.Public_ID} className="deal h-[320px] bg-gray-200 border border-blue-300 rounded-xl flex flex-col justify-center items-center">
//                     <div className='flex h-[65%] w-[80%] mb-0 mt-2 mx-0 justify-center'>
//                         <img src={image.Image_URL} className="" alt="..." />
//                     </div>
                    
//                     <div className='w-full h-[30%] flex flex-col gap-2 justify-start items-start pt-5 p-2 pb-2'>
//                     <label className='h-[20%] '><h1 className='text-indigo-900 font-semibold text-sm'>{image.ItemName}</h1></label>
//                     <label className='h-[20%] '><h1 className='text-indigo-900 font-bold text-sm'>{image.ItemBrand}</h1></label>
//                     <label className='h-[20%] mt-2'><h1 className='text-red-500 font-bold'>{image.ItemPrice}</h1></label>
//                     </div>
//                     {/* <div className='absolute h-[20%] top-0 right-0 p-4'><h1>hehe</h1></div> */}
//                 </div>
//             ))}
            
//         </div>
//         </div>
//     );
// }

// export default ItemSet;
