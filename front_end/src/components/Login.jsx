import React, { useEffect, useState } from "react";
import Axios from 'axios';


import { Link , useNavigate } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineLock} from "react-icons/ai";
import { LiaBackwardSolid } from "react-icons/lia";

const Login = () => {

    const [loginemail, setLoginEmail] = useState('')
    const [loginpassword, setLoginPassword] = useState('')

    const navigateTo = useNavigate();

    //To show the message to the user when credentials are "wrong" and when credentials are correct
    const [loginStatus, setLoginStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message')

    
    //to get the data that user entered
    const loginUser = (e) => {

        //Let's prevent submitting
        e.preventDefault();

        //axios is required to create an API that connects to server
        Axios.post('http://localhost:3001/login', {
            //create variable to send to the server through route
            Email: loginemail,
            Password: loginpassword
        }).then((response) =>{
            // console.log()
            if(response.data.message === 'wrong credentials'){ //if credentials are wrong
                navigateTo('/Login')
                setLoginStatus(<span className="text-red-500 flex justify-center">Wrong Credentials ! Please try again</span>)
                // console.log(response.data.message)
            }else{
                localStorage.setItem('token', response.data.token);                 //newww
                //get usertypes from the server(response)
                const userType = response.data.user.UserType;                       //newww    Get the user's type from the server side (/login endpoint)
                const userName = response.data.user.FirstName;               //neww    Get the user's first name from the server side (/login endpoint)
                const email = response.data.user.Email;                           //newww    Get the user's email from the server side
                localStorage.setItem('userName', userName);             //newww        Store the user's first name in local storage
                localStorage.setItem('userType', userType);             //newww        Store the user's type in local storage
                localStorage.setItem('email', email);                   //newww        Store the user's email in local storage
                //redirect to the appropriate page based on usertype
                if(userType === 'owner'){
                    navigateTo('/Admin');
                }else if(userType === 'customer'){
                    navigateTo('/LoginSuccess');
                }else if(userType === 'supplier'){
                    navigateTo('/Services');
                }
                
            }
        })
    }

    // useEffect(() => {
    //    if(loginStatus !== '') {
    //         //show message to the user
    //        setStatusHolder('showMessage')
    //        setTimeout(() => {
    //            setStatusHolder('message') //hide the message after 4 secnds
    //        }, 4000);
    //    }
    // }, [loginStatus])


    //to clear the form after submitting
    const clearForm = () => {
        setLoginEmail('')
        setLoginPassword('')
    }

    return (
        <div className="flex flex-col justify-center gap-5 items-center h-[90vh] " style={{backgroundImage: "url('../src/assets/office_copy.png')", backgroundSize: "cover"}}>
            {/* <h1>hehehe</h1> */}
            <div className="bg-gray-900 h-[50vh] border border-slate-700 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-60 relative">
            <h1 className="text-4xl font-bold mb-6 text-white text-center">Login</h1>
            <form action="" clearForm={clearForm}> 
            
            <span className={statusHolder}>{loginStatus}</span>

                <div className="relative my-4 w-79 border-[1px] border-gray-400 rounded-md">
                    <input type="email" id="email" name="email" autoComplete="off" className="text-md text-cyan-300 w-full h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2"  
                    placeholder="Your Email" onChange={(e) =>{
                         setLoginEmail(e.target.value) }} />
                    {/* <label htmlFor="email" className="text-white-500 absolute text-sm text-white duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label> */}
                    <BiUser className="absolute right-0 mt-3 mr-2 top-0 text-white"/>
                </div>
                <div className="relative my-4 w-79 border-[1px] border-gray-400 rounded-md">
                    <input type="password" id="password" name="password" className="text-md text-cyan-300 w-full h-10 bg-gray-600 rounded-md border-1 border-blue-100 px-2" 
                    placeholder="Your Password" onChange={(e) =>{
                         setLoginPassword(e.target.value) }} />
                    {/* <label htmlFor="password" className="text-white-500 absolute text-sm text-white duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus-:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label> */}
                    <AiOutlineLock className="absolute right-0 mt-3 mr-2 top-0 text-white"/>
                </div>

                {/* <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="rememberMe" id="rememberMe" />
                        <label htmlFor="rememberMe" className="text-white">Remember me</label>                                             
                    </div>
                    <Link to='' className="text-blue-400 mb-0 mt-0 rounded-full bg-white-500 hover-bg-emerald-600 hover:text-white py-2 transition-colors duration-300">Forgot Password?</Link>                    
                </div> */}
                <div className="mt-5">                       
                <button type="submit" className="text-white w-full mb-4 text-lg mt-1 rounded-full bg-blue-400 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300"
                onClick={loginUser}>Login</button>
                        <div className="text-center">
                            <span className="mt-4 text-white">Don't have account? <Link className="text-blue-400 w-full mb-4 text-[18px] mt-6 rounded-full bg-white-500 hover-bg-emerald-600 hover:text-white py-2 transition-colors duration-300" to="/Registration">Create Account</Link></span>
                        </div>
                </div>
            </form>
            </div>  

            <div>
                <Link className="w-full" to={"/Home"}>
                    <button className="flex flex-row items-center bg-green-500 hover:bg-green-700 w-[12.0rem] px-5 py-2 rounded-xl text-md space-x-2">
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

export default Login;



{/* <div>
            <div className="bg-slate-800 border border-slate-700 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative">

            <h1 className="text-4xl font-bold mb-6 text-white-500 text-center">Login</h1>
            <form action=""> 
                <div className="relative my-4">
                    <input type="email" id="email" className="block w-72 py-2.3 px-0 text=sm text-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"  placeholder=""/>
                    <label htmlFor="email" className="text-white-500 absolute text-sm duration-300 transform -translate-y-6 top-6 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                    <BiUser className="absolute right-0 top-0"/>
                </div>
                <div className="relative my-4">
                    <input type="password" id="password" className="block w-72 py-2.3 px-0 text=sm text-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label htmlFor="password" className="text-white-500 absolute text-sm duration-300 transform -translate-y-6 top-6 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
                    <AiOutlineLock className="absolute right-0 top-0"/>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="rememberMe" id="rememberMe" />
                        <label htmlFor="rememberMe" className="text-white-500">Remember me</label>                      
                    </div>
                    <Link to='' className="text-white-500 text-cyan-500">Forgot Password?</Link>
                </div>
                <div>                       
                        <button type="submit" className="text-white-500 w-full mb-4 text-[18px] mt-6 rounded-full bg-white-500 text-emerald-800 hover-bg-emerald-600 hover:text-white py-2 transition-colors duration-300">Login</button>
                        <div>
                            <span className="mt-4">Don't have account? <Link className="text-cyan-500" to="Register">Create Account</Link></span>
                        </div>
                </div>
            </form>
            </div>            
        </div> */}