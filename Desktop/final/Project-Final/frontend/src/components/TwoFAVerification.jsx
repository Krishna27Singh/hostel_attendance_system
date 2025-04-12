import React ,{useState}from 'react'
import { verify2FA, reset2FA } from '../lib/authApi';
import { ToastContainer, toast } from 'react-toastify';

function TwoFAVerification({onVerifySuccess,onResetSuccess}) {

  const [otp,setOtp]=useState("");
  const [error,setError]=useState("");
  const [message, setMessage] = useState("");


  const handleTokenVerification=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await verify2FA(otp);
      setMessage("TOTP verified successfully ✅");
      onVerifySuccess(data);
    }catch(error){
      setOtp("")
      console.log("The err is : ", error.message);
      setError("Invalid OTP");
      setMessage(""); 
    }
  };

  const handleReset = async()=>{
    try{
      const {data}=await reset2FA();
      setMessage("");
      onResetSuccess(data);
    }catch(error){
      console.log("The err is : ", error.message);
      setError(error.message);
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      
        <form className="flex flex-col gap-4 w-full" onSubmit={handleTokenVerification}>
          <h2 className='text-3xl text-center font-extralight'>Validate TOTP</h2>
            <div className="flex flex-col">
              <p className='text-center text-gray-600 text-lg font-light'>Please enter 6-digit Time based OTP to verify 2FA authentication</p>
                <label htmlFor="TOTP" className="text-lg font-medium mb-1">TOTP</label>
                <input
                    onChange={(e)=>setOtp(e.target.value)}
                    type='text'
                    label="TOTP"
                    placeholder="Enter your TOTP"
                    className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                    value={otp}
                    required
                />
            </div>
            
            {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}
            {message && <p className='text-green-600 text-sm mb-3'>{message}</p>}
            <button type='submit' className="bg-teal-700 text-white text-lg font-semibold py-3 rounded-md mt-2 transition duration-300 hover:bg-teal-800 mb-3">
               
               verify TOTP
            </button>
            <button type='button' className="bg-slate-700 text-white text-lg font-semibold py-3 rounded-md mt-2 transition duration-300 hover:bg-teal-800"
            onClick={handleReset}
            >
               
             Reset 2FA
            </button>
        </form>
       
    </div>
    <ToastContainer />
</div>
  )
}

export default TwoFAVerification;