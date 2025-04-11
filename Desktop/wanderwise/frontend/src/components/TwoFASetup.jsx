import React, { useState,useEffect } from 'react';
import { setup2FA } from '../lib/authApi';
import { useNavigate } from 'react-router-dom';


const TwoFASetup=({onSetupComplete})=> {
  const [response,setResponse]=useState({});
  const [message,setMessage]=useState("");
  const navigate = useNavigate();

  const fetchQRCode=async()=>{
    const {data}=await setup2FA();
    console.log(data);
    setResponse(data);
  }
  useEffect(()=>{
    fetchQRCode();
  },[]);

  const copyClipBoard = async()=>{
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret copied to clipboard");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-5">Turn on 2FA verification</h1>
          <p className='text-center text-gray-900 text-lg font-light pr-6 pl-6'>Scan the QR code below with your authenticator app</p>
          <div className='p-6'>
              <div className='flex justify-center'>
                {response.qrCode? ( 
                  <img src={response.qrCode} alt="2FA QR code" className='mb-4 border rounded-md'/>
                  ): ("")}
                 
              </div>
              <div className='mt-3 mb-3'>
              {/* Divider with text (centered between horizontal lines) */}
              <div className='flex items-center mb-4'>
                <div className='border-t border-gray-300 flex-grow'></div>
                <div className='text-gray-600 text-sm font-light px-2 whitespace-nowrap'>
                  Or enter the code manually
                </div>
                <div className='border-t border-gray-300 flex-grow'></div>
              </div>

              {/* Input + Button stacked vertically */}
              <div className='flex flex-col items-center'>
                {message && (
                  <p className='text-green-600 text-sm mb-2'>{message}</p>
                )}

                <input 
                  readOnly
                  value={response.secret} 
                  onClick={copyClipBoard}
                  className='w-full border rounded mb-4 text-xs text-gray-600 p-4'
                />

                <button 
                  onClick={onSetupComplete}
                  className='w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200 shadow-sm font-semibold'
                >
                  Continue to verification
                </button>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default TwoFASetup