import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../lib/utils';
//import { resourceLimits } from 'worker_threads';
import LoginForm from '../components/LoginForm';

function Signup() {
    // const [signupInfo, setSignupInfo] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     phone_no:''
    // });

    // const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setSignupInfo((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleSignup = async (e) => {
    //     e.preventDefault();
    //     const { name, email, password ,phone_no} = signupInfo;

    //     if (!name || !email || !password||!phone_no) {
    //         return handleError('Name, email, and password are required');
    //     }
        
    //     try {
    //         const url = "http://localhost:5000/auth/signup";
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(signupInfo),
    //         });

    //      const result = await response.json();
            
    //         console.log("Response:", result);
    //         const {success, message, error} = result;

    //         if (response.status === 409) {
    //             return handleError("User already exists. Please login.");
    //         }

    //         if (response.ok && result.success) {
    //             handleSuccess(result.message);
    //             setTimeout(() => navigate('/login'), 1000);
    //         } else if(error){
    //             const details = error?.details[0].message;
    //             handleError(details);
    //         }
    //         else if(!success){
    //             handleError(message);
    //         }
    //         else {
    //             handleError(result.message || "Signup failed, please try again.");
    //         }
    //     } catch (err) {
    //         console.error("Signup Error:", err);
    //         handleError("Something went wrong! Please try again.");
    //     }
    // };

    return (
        <LoginForm/>
    );
}

export default Signup;
