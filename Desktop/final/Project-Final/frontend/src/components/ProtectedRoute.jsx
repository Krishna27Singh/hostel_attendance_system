import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { Navigate } from 'react-router-dom';


function ProtectedRoute() {
  const {isLoggedIn,loading} = useSession();
  console.log("The Logged in user is : ",isLoggedIn)
  if(loading){
    return <div>Loading...</div>
  }
  return isLoggedIn? <Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoute