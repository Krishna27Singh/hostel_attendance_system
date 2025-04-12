import React,{useState} from "react";
import { Routes, Route } from "react-router-dom"; 
import { Toaster } from "./components/ui/sonner";
import Dashboard from './pages/Dashboard'
import Profile from "./pages/Profile";
import ExpenseTracker from "./pages/ExpenseTracker";
import SafePlaces from "./pages/SafePlaces";
import SocialConnect from "./pages/SocialConnect";
import Accessibility from "./pages/Accessibility";
import Settings from "./pages/Settings";
import Newsletter from "./pages/Newsletter"; 
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Signup from "./pages/Signup"; 
 
import RefreshHandler from "./components/RefreshHandler";
import { Navigate } from "react-router-dom";
import Sustainability from "./pages/Sustainability";
import Login from './pages/Login';
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/verify2FA";
import Expenses from "./pages/Expenses";
import ProtectedRoute from "./components/ProtectedRoute";
import { SessionProvider } from "./context/SessionContext";
// import RefreshHandler from "./components/RefreshHandler"

function App(){
   
  return(
    <>
    <Toaster position="top-right" />
  
    {/* <RefreshHandler setIsAuthenticated={setIsAuthenticated}/> */}
    <SessionProvider>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      
      
      <Route element={<ProtectedRoute/>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={ <Home/>}/>
      <Route path='/setup-2fa' element={<Setup2FA/>} />
      <Route path='/verify-2fa' element={<Verify2FA/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/expenseTracker" element={<ExpenseTracker />} />
      <Route path="/safe-places" element={<SafePlaces />} />
      <Route path="/social-connect" element={<SocialConnect />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/newsletter" element={<Newsletter />} /> 
      <Route path="/sustainability" element={<Sustainability/>}/>
    
      <Route path="/expenses" element={<Expenses/>} /> 
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </SessionProvider>
  </>
  );
};

export default App;
