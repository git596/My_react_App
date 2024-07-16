import React from 'react'
import {BsSuitHeart} from 'react-icons/bs'
import {IoBedOutline,IoLocationOutline} from 'react-icons/io5'
import {GiBathtub,GiHomeGarage} from 'react-icons/gi'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import printing from '../assets/printing.jpg'
import photocopy from '../assets/photocopy.jpg'
import binding from '../assets/binding.jpg'
import typesetting from '../assets/typesetting.jpg'
import laminating from '../assets/laminating.jpg'
import onlinepayment from '../assets/onlinepayment.jpg'
import { Link } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";


const NewestDeals = () => {


  return (
    <div className='bg-gray-700'>
    <div className='text-center flex justify-center items-center App h-screen w-11/12 md:w-4/5 m-auto'>
        
        {/* <p className='px-4 py-1 ml-auto mr-auto my-5 text-xs bg-yellow-400 w-16 rounded-lg px-2 py-1 text-gray-700'>NEW</p> */}
        {/* <h1 className='text-4xl font-bold text-gray-700'>Services</h1> */}
        <div className="deals grid 2xl:grid-cols-5 gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10">
            
            {/* <div className="deal h-[350px] bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[60%]'>
                <img src={printing} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                <div className='flex space-x-5 items-center'>
                    <div className='flex items-center space-x-1'>
                        <IoBedOutline/>
                        <p className='text-sm text-gray-400'>5 bed</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                       <GiBathtub/>
                       <p className='text-sm text-gray-400'>3 bat</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                     <GiHomeGarage/>
                        <p className='text-sm text-gray-400'>1 gar</p>
                    </div>
                </div>
                <h1 className='text-2xl font-semibold'>$110,000</h1>
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>Photocopying</p>
                </div>
                </div>

            </div> */}
            <div className="shadow-xl shadow-blue-500/50 deal h-[350px] bg-gray-100 drop-shadow-2xl rounded-xl">
                <div className='relative h-[60%]'>
                <img src={printing} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className=' h-2/5 space-y-4'>
                {/* <div className='flex space-x-5 items-center'>
                    <div className='flex items-center space-x-1'>
                        <IoBedOutline/>
                        <p className='text-sm text-gray-400'>5 bed</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                       <GiBathtub/>
                       <p className='text-sm text-gray-400'>3 bat</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                     <GiHomeGarage/>
                        <p className='text-sm text-gray-400'>1 gar</p>
                    </div>
                </div> */}
                <Link to="/Printing" className='text-2xl font-semibold'>
                <h1 className='pt-12 text-3xl font-sarif font-bold text-indigo-700'>Printing</h1>
                </Link>
                {/* <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>Printing</p>
                </div> */}
                </div>

            </div>
            {/* <div className="deal h-[350px] bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[60%]'>
                <img src={binding} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='p-4 space-y-4'>
                <div className='flex space-x-5 items-center'>
                    <div className='flex items-center space-x-1'>
                        <IoBedOutline/>
                        <p className='text-sm text-gray-400'>5 bed</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                       <GiBathtub/>
                       <p className='text-sm text-gray-400'>3 bat</p>
                    </div>
                  
                </div>
                <h1 className='text-2xl font-semibold'>$42,000</h1>
                <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>Binding</p>
                </div>
                </div>

            </div> */}
            <div className="shadow-xl shadow-blue-500/50 deal h-[350px] bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[60%]'>
                <img src={typesetting} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='h-2/5 space-y-4'>
                {/* <div className='flex space-x-5 items-center'>
                    <div className='flex items-center space-x-1'>
                        <IoBedOutline/>
                        <p className='text-sm text-gray-400'>5 bed</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                       <GiBathtub/>
                       <p className='text-sm text-gray-400'>3 bat</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                     <GiHomeGarage/>
                        <p className='text-sm text-gray-400'>1 gar</p>
                    </div>
                </div> */}
                <Link to="/TypeSetting" className='text-2xl font-semibold'>
                <h1 className='pt-12 text-3xl font-sarif font-bold text-indigo-700'>Typesetting</h1>
                </Link>
                {/* <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>typesetting</p>
                </div> */}
                </div>

            </div>
            <div className="shadow-xl shadow-blue-500/50 deal h-[350px] bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[60%]'>
                <img src={laminating} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='h-2/5 space-y-4'>
                {/* <div className='flex space-x-5 items-center'>
                    <div className='flex items-center space-x-1'>
                        <IoBedOutline/>
                        <p className='text-sm text-gray-400'>5 bed</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                       <GiBathtub/>
                       <p className='text-sm text-gray-400'>3 bat</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                     <GiHomeGarage/>
                        <p className='text-sm text-gray-400'>1 gar</p>
                    </div>
                </div> */}
                <Link to="/Laminating" className='text-2xl font-semibold'>
                <h1 className='pt-12 text-3xl font-sarif font-bold text-indigo-700'>Laminating</h1>
                </Link>
                {/* <div className='flex items-center space-x-2'>
                <IoLocationOutline/>
                <p className='text-sm text-gray-600'>laminating</p>
                </div> */}
                </div>

            </div>
            {/* <div className="shadow-xl shadow-blue-500/50 deal h-[350px] bg-white drop-shadow-2xl rounded-xl">
                <div className='relative h-[60%]'>
                <img src={onlinepayment} alt="" className='w-full h-full object-cover rounded-t-xl'/>
                <div className='absolute top-0 right-0 p-4'>
                    <BsSuitHeart size={"1.5rem"} className="text-white"/>
                </div>
                </div>
                <div className='h-2/5 space-y-4'>
                <h1 className='pt-12 text-3xl font-sarif font-bold text-indigo-700'>Bill Payment</h1>
                
                </div>

            </div> */}
            
        </div>
        
    </div>
    <div className='text-center flex justify-end w-full'>
        <button className='text-white bg-green-400 text-xl font-bold rounded-xl hover:bg-green-600 mb-10 mr-10 w-[15%]'>
            <Link to='/WorkProgressTable' className='flex gap-3 justify-center items-center text-black text-md p-2 font-bold'>
                <p>Work Progress 
                </p>
                <span>
                    <FaArrowRightFromBracket className='text-2xl'/>
                </span>
            </Link>
        </button>
        </div> 
    </div>
  )
}

export default NewestDeals;