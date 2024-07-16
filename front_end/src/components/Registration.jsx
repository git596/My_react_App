import { useState } from "react";
import Axios from 'axios';
import React from "react";

import { Link , useNavigate } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineLock} from "react-icons/ai";
import { LiaBackwardSolid } from "react-icons/lia";

const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [usertype, setUserType] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [slocation, setSlocation] = useState('')
    const [businessname, setBusinessName] = useState('')

    const navigateTo = useNavigate();


    //to get the data that user entered
    const createUser = (e) => {
        e.preventDefault()
        //axios is required to create an API that connects to server
        Axios.post('http://localhost:3001/registration', {
            //create variable to send to the server through route
            Email: email,
            Password: password,
            Confirmpassword: confirmpassword,
            UserType: usertype,
            Phone: phone,
            Address: address,
            FirstName: firstname,
            LastName: lastname,
            Gender: gender,
            Slocation: slocation,
            BusinessName: businessname
        }).then(() =>{
            console.log('user has been created')
            navigateTo('/RegSuccess')

            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setUserType('')
            setPhone('')
            setAddress('')
            setFirstName('')
            setLastName('')
            setGender('')
            setSlocation('')
            setBusinessName('')
            

        })
    }

    return (
        <div className="flex flex-col gap-5 justify-center items-center h-[90vh]" style={{backgroundImage: "url('../src/assets/office_copy.png')", backgroundSize: "cover"}}>
            <div className="bg-gray-900 border w-auto h-[70vh] border-slate-700 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-60 relative">
{/*  */}
            <h1 className="text-4xl font-bold mb-6 text-white text-center">Register</h1>
            <form action=""> 

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-0">
                        <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                            <input type="email" id="email" name="email" autoComplete="off" className=" text-cyan-300 w-full h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                            placeholder="Your Email" onChange={(e) =>{ 
                                setEmail(e.target.value)
                                }}/>
                                {/* line below - newly commented */}
                            {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                            <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                        </div>
                        <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                            <input type="firstname" id="firstname" name="firstname" autoComplete="off" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                            placeholder="First Name" onChange={(e) =>{ 
                                setFirstName(e.target.value)
                                }}/>
                                {/* line below - newly commented */}
                            {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                            <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                        </div>
                        <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                            <input type="lastname" id="lastname" name="lastname" autoComplete="off" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                            placeholder="Last Name" onChange={(e) =>{ 
                                setLastName(e.target.value)
                                }}/>
                                {/* line below - newly commented */}
                            {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                            <BiUser className="absolute right-0 top-0 mt-2 mr-2 text-white"/>
                        </div>
                        {/* <div className="relative my-2 w-72">
                            <input type="address" id="address" name="address" autoComplete="off" className="text-yellow-300 w-72 h-8 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                            placeholder="Address" onChange={(e) =>{ 
                                setAddress(e.target.value)
                                }}/>
                            <BiUser className="absolute right-0 top-0 mt-2 mr-2 text-white"/>
                        </div>
                        <div className="relative my-2 w-72">
                            <input type="phone" id="phone" name="phone" autoComplete="off" className="text-yellow-300 w-72 h-8 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                            placeholder="Phone" onChange={(e) =>{ 
                                setPhone(e.target.value)
                                }}/>
                            <BiUser className="absolute right-0 top-0 mt-2 mr-2 text-white"/>
                        </div> */}
                        <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                            <input type="password" id="password" name="password" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2" 
                            placeholder="Password" onChange={(e) => {
                                setPassword(e.target.value)
                                }}/>
                                {/* line below - newly commented */}
                            {/* <label htmlFor="password" className="text-white-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label> */}
                            <AiOutlineLock className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                        </div>
                        <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                            <input type="password" id="confirmpassword" name="confirmpassword" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2" 
                            placeholder="Confirm Password" onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}/>
                            {/* line below - newly commented */}
                            {/* <label htmlFor="confirmpassword" className="text-white-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label> */}
                            <AiOutlineLock className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                        </div> 
                        <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                        <select id="usertype" name="usertype" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-1" placeholder="User Type" onChange={(e) => {
                            setUserType(e.target.value)
                                                        }}>
                            <option value="">Select User Type</option>
                            <option value="supplier">Supplier</option>
                            <option value="customer">Customer</option>
                            {/* <option value="owner">Owner</option> */}
                        </select>
                        {/* <AiOutlineLock className="absolute right-0 top-0 mt-2 mr-2 text-white"/> */}
                        </div>
                    </div>

                    <div className="flex flex-col gap-0">                                     
                        {usertype === 'supplier' && (
                            <div className="flex flex-col gap-0">
                                <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                    <input type="text" id="slocation" name="slocation" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"
                                        placeholder="Supplier Location" onChange={(e) => setSlocation(e.target.value)} />
                                    <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                </div>
                                <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                    <input type="text" id="businessname" name="businessname" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"
                                        placeholder="Business Name" onChange={(e) => setBusinessName(e.target.value)} />
                                    <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                </div>
                                    <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                        <input type="address" id="address" name="address" autoComplete="off" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                                        placeholder="Address" onChange={(e) =>{ 
                                            setAddress(e.target.value)
                                            }}/>
                                            {/* line below - newly commented */}
                                        {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                                        <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                    </div>
                                    <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                        <input type="phone" id="phone" name="phone" autoComplete="off" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                                        placeholder="Phone" onChange={(e) =>{ 
                                            setPhone(e.target.value)
                                            }}/>
                                            {/* line below - newly commented */}
                                        {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                                        <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                    </div>
                                </div>
                        )}
                        {usertype === 'customer' && (
                            <div className="flex flex-col gap-0">
                                    <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                        <input type="text" id="gender" name="gender" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"
                                            placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
                                        <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                    </div>
                                    <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                    <input type="address" id="address" name="address" autoComplete="off" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                                    placeholder="Address" onChange={(e) =>{ 
                                        setAddress(e.target.value)
                                        }}/>
                                        {/* line below - newly commented */}
                                    {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                                    <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                </div>
                                <div className="relative my-2 w-76 border-[1px] border-gray-400 rounded-md">
                                    <input type="phone" id="phone" name="phone" autoComplete="off" className="text-cyan-300 w-72 h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                                    placeholder="Phone" onChange={(e) =>{ 
                                        setPhone(e.target.value)
                                        }}/>
                                        {/* line below - newly commented */}
                                    {/* <label htmlFor="email" className="text-gray-500 absolute text-sm duration-300 transform -translate-y-6 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-not-placeholder-shown:hidden">Your Email</label> */}
                                    <BiUser className="absolute right-0 top-0 mt-3 mr-2 text-white"/>
                                </div>
                            </div>
                        )}
                    </div> 
                </div>  
                
                                                                  
                        <button type="submit" className="text-white w-full mb-4 text-lg mt-8 rounded-full bg-blue-400 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300"
                        onClick={createUser}>
                            Register
                        </button>
                        <div className="text-center">
                            <span className="mt-4 text-white">Already Have Account? <Link className="text-blue-400 w-full mb-4 text-[18px] mt-6 rounded-full bg-white-500 hover-bg-emerald-600 hover:text-white py-2 transition-colors duration-300" to="/Login">Login</Link></span>
                        </div>               
            </form>
            </div> 

            <div>
                <Link className="w-full" to={"/Home"}>
                    <button className="flex flex-row items-center bg-green-500 hover:bg-green-700 w-[12.0rem] px-5 py-2 rounded-xl text-md space-x-2 mt-3">
                    <LiaBackwardSolid size={"1.5rem"} />
                        <span className="text-gray-800 font-bold text-center">
                            Back to Home
                        </span>
                    </button>
                </Link>  
            </div> 

        </div> 
        
    );
};

export default Registration;