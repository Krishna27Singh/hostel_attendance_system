import React,{useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function RefreshHandler({setIsAuthenticated}) {
    const location =useLocation();
    const navigate=useNavigate(); 
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname==='/'||
                location.pathname==='/login'||
                location.pathname==='/signup'||
                location.pathname==='dashboard'||
                location.pathname==='newsletter'||
                location.pathname==='social-connect'||
                location.pathname==='expenses'||
                location.pathname==='accessibility'||
                location.pathname==='safe-places'||
                location.pathname==='settings'
            ){
                navigate('/home',{replace:false});
            }
        }
    },[location,navigate,setIsAuthenticated])

  return (
    null
  )
}

export default RefreshHandler