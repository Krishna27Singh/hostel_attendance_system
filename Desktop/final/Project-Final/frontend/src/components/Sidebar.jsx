
import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import UserProfile from "./UserProfile";
import { 
  Home, 
  LayoutDashboard,
  DollarSign, 
  Users, 
  Accessibility, 
  Shield, 
  
  Leaf,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-slide-in">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">WanderWise</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <NavLink to="/" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/expenseTracker" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <DollarSign size={20} />
          <span>Expenses</span>
        </NavLink>
        
        <NavLink to="/newsletter" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Newsletter</span>
        </NavLink>

        <NavLink to="/sustainability" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
           <Leaf size={20} />
           <span>Sustainability</span>
       </NavLink>

        
        <NavLink to="/social-connect" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Users size={20} />
          <span>Social Connect</span>
        </NavLink>
        
        <NavLink to="/accessibility" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Accessibility size={20} />
          <span>Accessibility</span>
        </NavLink>
        
        <NavLink to="/safe-places" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Shield size={20} />
          <span>Safe Places</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-gray-200">
         <UserProfile />
         </div>
    </aside>
  );
};

export default Sidebar;

