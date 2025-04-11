import React from "react";
import { FaMobileAlt, FaCreditCard, FaWallet, FaUniversity } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

const paymentData = [
  { name: "UPI", icon: <FaMobileAlt className="text-xl text-green-700" />, percentage: 28 },
  { name: "Debit Card", icon: <FaCreditCard className="text-xl text-green-700" />, percentage: 25 },
  { name: "Credit Card", icon: <MdPayment className="text-xl text-green-700" />, percentage: 17 },
  { name: "Wallets", icon: <FaWallet className="text-xl text-green-700" />, percentage: 16 },
  { name: "BNPL", icon: <FaUniversity className="text-xl text-green-700" />, percentage: 14 },
];

const PaymentMethodsBar = () => {
  return (
    <div className="bg-green-50 p-6 rounded-2xl w-full text-gray-800 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center text-green-800">
        📊 Most Used Payment Methods (2025)
        </h2>

      {paymentData.map((method, index) => (
        <div key={index} className="mb-5">
          <div className="flex items-center justify-between mb-1 px-1">
            <div className="flex items-center gap-2">
              {method.icon}
              <span className="text-sm font-medium">{method.name}</span>
            </div>
            <span className="text-xs text-green-700 font-semibold">{method.percentage}%</span>
          </div>

          <div className="relative group w-full bg-green-200 rounded-full h-2">
          <div
                className="h-2 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 transition-all duration-500"
                style={{ width: `${Math.min(method.percentage * 2.6, 100)}%` }}
                ></div>


            {/* Tooltip */}
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-green-700 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 pointer-events-none">
              {method.percentage}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodsBar;
