import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { signup,loginUser } from '../lib/authApi';

function LoginForm({onLoginSuccess}) {
    const [isRegister,setIsRegister]=useState(false);
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [error, setError]=useState("");
    const [message, setMessage]=useState("");

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await loginUser(username,password);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            setError("");
            onLoginSuccess(data);
        }catch(error){
            console.log("The err is: ",error.message);
            setUsername("");
            setPassword("");
            setMessage("");
            setError("Invalid login credentials");
        }
    };

    const handleRegister=async(e)=>{
        console.log("Registering user:", username, email, password);
        e.preventDefault();
        try{
            const {data} = await signup(username,password,email);
            setIsRegister(false);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            setError("");
            setConfirmPassword("");
        }catch(error){
            console.log("The err is: ",error.message);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setMessage("");
            setError("Something went wrong during registration");
        }
    };

    const handleRegisterToggle=()=>{
        setIsRegister(!isRegister);
        setError("");
        setMessage("");
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-5">{isRegister?"Create Account" :"Login"}</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={isRegister? handleRegister:handleLogin}>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-lg font-medium mb-1">Username</label>
                        <input
                            onChange={(e)=>setUsername(e.target.value)}
                            type='text'
                            label="Username"
                            placeholder="Enter your Username..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={username}
                            required
                        />
                    </div>

                    {isRegister?(<div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium mb-1">Email</label>
                        <input
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={email}
                        />
                    </div>):("")}
                    

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg font-medium mb-1">Password</label>
                        <input
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={password}
                        />
                    </div>
                    {isRegister?(<div className="flex flex-col">
                        <label htmlFor="Confirm password" className="text-lg font-medium mb-1">Confirm Password</label>
                        <input
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            type="password"
                            name="Confirm password"
                            placeholder="Enter password again"
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={confirmPassword}
                        />
                    </div>):("")}
                    
                    {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}
                    {message && <p className='text-green-600 text-sm mb-3'>{message}</p>}
                    <button type='submit' className="bg-teal-700 text-white text-lg font-semibold py-3 rounded-md mt-2 transition duration-300 hover:bg-teal-800">
                       
                        {isRegister?"Signup":" Login"}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    {isRegister?"Already have a account?":" Don't have an account?"}
                   
                    <Link to="" onClick={handleRegisterToggle} className="text-teal-700 font-bold ml-1 hover:underline">
                    {isRegister?"Login":"Signup"}
                        
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
  )
}

export default LoginForm