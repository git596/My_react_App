import React from 'react'
import { Link } from 'react-router-dom'

import {BsSuitHeart} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import printing from '../assets/printing.jpg'
import photocopy from '../assets/photocopy.jpg'
import binding from '../assets/binding.jpg'
import typesetting from '../assets/typesetting.jpg'
import laminating from '../assets/laminating.jpg'
import onlinepayment from '../assets/onlinepayment.jpg'
import { Carousel } from 'react-responsive-carousel'
import './Carousel.css'

const HNewestDeals = () => {
  return (
    <div className='text-center App w-11/12 md:w-[83vw] my-16 m-auto'>
    <div className=' m-auto rounded-3xl border-4 border-gray-500 h-[60vh]'>
        {/* <p className='px-4 py-1 ml-auto mr-auto my-5 text-xs bg-yellow-400 w-16 rounded-lg px-2 py-1 text-gray-700'>NEW</p> */}
        <h1 className='text-3xl font-semibold text-gray'>Featured Services</h1>
        <div className="deals flex flex-row gap-5 py-10">

            <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000} width={1190} showStatus={true} showArrows={true} showIndicators={true} centerMode={true} centerSlidePercentage={22}
            className='my_carousel'>
            
            <div className="deal bg-gray-300  rounded-xl">
                <div className='relative h-[85%]'>
                <img src={printing} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>Photocopying</p>
                </div>
                </div>

            </div>
            <div className="deal  bg-gray-300  rounded-xl">
                <div className='relative h-[85%]'>
                <img src={photocopy} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>Printing</p>
                </div>
                </div>

            </div>
            <div className="deal  bg-gray-300  rounded-xl">
                <div className='relative h-[85%]'>
                <img src={binding} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>Binding</p>
                </div>
                </div>

            </div>
            <div className="deal  bg-gray-300  rounded-xl">
                <div className='relative h-[85%]'>
                <img src={typesetting} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>typesetting</p>
                </div>
                </div>

            </div>
            {/* <div className="deal  bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[85%]'>
                <img src={laminating} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>laminating</p>
                </div>
                </div>

            </div>
            <div className="deal  bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[85%]'>
                <img src={onlinepayment} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>online payment</p>
                </div>
                </div>

            </div> */}
            </Carousel>
            
        </div>
        {/* <div className='w-full flex justify-center py-5'>
            <Link to={"/Services"}>
                <button className='bg-blue-200 px-5 py-2 rounded-md text-xl flex items-center space-x-2'><span className='text-gray-600'>Explore More</span> <span className='text-gray-600'><AiOutlineDoubleRight/></span></button>
            </Link>
        </div> */}
    </div>
    </div>
  )
}

export default HNewestDeals;