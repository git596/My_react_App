//this is a test component, made prior to supervisor meeting


import React from 'react'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles

import mouse1 from '../assets/mouse_1.png'
import mouse2 from '../assets/mouse_2.png'
import mouse3 from '../assets/mouse_3.png'

import {IoLocationOutline} from 'react-icons/io5'

const MouseCarousel = () => {
  return (
    
    <div className='text-center App w-11/12 md:w-[83vw] my-16 m-auto'>
    <div className='m-auto rounded-3xl border-4 border-gray-500 h-[60vh] '>
            <div className='w-11/12 md:w-1/2 xl:w-1/3 m-auto text-center py-0'>
                <h1 className='text-3xl font-semibold text-gray pb-10'>Featured Items</h1>
            </div>

            
        <div className="deals w-full  grid lg:grid-flow-col grid-row-2   gap-2 justify-center">

              <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000} width={1190} showStatus={true} showArrows={true} showIndicators={true} centerMode={true} centerSlidePercentage={22}>

                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse1} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse2} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                <div className="deal relative  col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse3} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse2} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse1} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                
                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse3} alt="" className='h-full rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse2} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                <div className="deal relative col-span-1 row-span-1 h-[300px] w-[250px] bg-gray-300  rounded-xl">
                    <img src={mouse1} alt="" className='rounded-xl object-cover'/>
                    <div className='w-full absolute bottom-0 p-4 text-white bg-gradient-to-t from-black rounded-b-xl space-y-2'>
                        {/* <h1 className='text-3xl font-bold'>PLACE</h1> */}
                        <p className='flex items-center space-x-2 text-sm'><IoLocationOutline/>450 LKR</p>
                    </div>
                </div>
                

                </Carousel>

        </div>

            <div className='w-full flex justify-center pt-14'>
                <button className='bg-yellow-200 px-5 py-2 rounded-md text-xl flex items-center space-x-2'><span className='text-gray-600'>Explore More</span> <span className='text-gray-600'><AiOutlineDoubleRight/></span></button>
            </div>
    </div>
    </div>
    



  )
}

export default MouseCarousel;