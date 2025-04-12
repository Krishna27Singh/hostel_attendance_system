import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../lib/utils'; 
import LoginForm from '../components/LoginForm';
import {useSession} from "../context/SessionContext";
function Login() {
    
    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: '',
    });

    const backendUrl= import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();
    const {login} = useSession();

    const handleLoginSuccess = (userData)=>{
        console.log("the logged in userdata: ",userData);
        login(userData);
        // if(!userData.isMfaActive){
        //     navigate("/setup-2fa");
        // }else{
        //     navigate("/verify-2fa");
        // }
        if(userData){
            navigate("/");
        }
        else{
            navigate("/login");
        }
    };

    return (
        <LoginForm onLoginSuccess={handleLoginSuccess}/>
    );
}

export default Login;
