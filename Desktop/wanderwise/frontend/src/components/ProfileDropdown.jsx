import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer flex items-center space-x-2"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle size={30} className="text-gray-700" />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
          <ul className="py-2">
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                View Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
