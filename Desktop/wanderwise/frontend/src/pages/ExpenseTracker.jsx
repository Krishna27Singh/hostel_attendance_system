import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../lib/utils';
import ExpensesTable from '../components/ExpensesTable';
import '../pages/ExpenseTracker.css';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import { ToastContainer } from 'react-toastify';
import ExpenseDetails from '../components/ExpenseDetails';
import Sidebar from '../components/Sidebar';
import ExpensesChart from '../components/ExpensesChart';
import { useNavigate } from 'react-router-dom';
import CurrencyConverter from '../components/CurrencyConverter';
import ExchangeRateChart from '../components/ExchangeRateChart';
import TopFiatCurrenciesChart from '../components/TopFiatCurrenciesChart';
import { motion } from 'framer-motion';
import PaymentMethodsBar from '../components/PaymentMethodBar';
import CardSwiper from '../components/CardSwiper';
import DoughnutChart from '../components/DoughnutChart';

import { PlusCircle, Filter, TrendingUp, TrendingDown, Wallet, ShoppingBag, Briefcase, Utensils } from 'lucide-react';


function ExpenseTracker() {
  const navigate = useNavigate();
  const [expenses,setExpenses]=useState([]);
  const [expenseAmt,setExpenseAmt] =useState(0);
  const [incomeAmt,setIncomeAmt] =useState(0);
  const [showForm, setShowForm] = useState(false);
  
  

  useEffect(()=>{
    const amounts = expenses.map((item)=>item.amount);
    console.log(amounts);
    const income = amounts.filter(item=>item>0)?.reduce((acc,item)=>(acc+=item),0)
    console.log("income: ",income);

    const exp = amounts.filter(item=>item<0)?.reduce((acc,item)=>(acc+=item),0)*-1;
    console.log("exp: ",exp);

    setIncomeAmt(income);
    setExpenseAmt(exp);
  },[expenses]);


  const fetchExpenses = async () => {
    

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/expenses`;
    
  
      const response = await fetch(url, {

        method: 'GET', // or 'POST', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // ✅ ensures session cookie is sent
      });
      console.log("response: ",response)
  
      if (response.status === 403) {
        navigate('/login');

        return;
      }
  
      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);
      
    } catch (err) {
      handleError(err);
    }
  }
  
  useEffect(()=>{
    fetchExpenses()
  },[])

  const addExpenses = async (data) => {
    
    try {
      
      //const url = "http://localhost:5000/expenses";
      const url = `${import.meta.env.VITE_BACKEND_URL}/expenses`;

  
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data)
      });
  
      if (response.status === 403) {
        navigate('/login');

        return;
      }
  
      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (err) {
      handleError(err);
    }
  }
  
  
  const handleDeleteExpense=async(expenseId)=>{
   

    try {
        //const url = `http://localhost:5000/expenses/${expenseId}`;
        const url = `${import.meta.env.VITE_BACKEND_URL}/expenses/${expenseId}`;

    
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'DELETE'
        });
    
        if (response.status === 403) {
          navigate('/login');

          return;
        }
    
        const result = await response.json();
        console.log(result.data);
        setExpenses(result.data);
        handleSuccess(result.message);
      } catch (err) {
        handleError(err);
      }
  }

  return (
    <div className="flex h-screen bg-gray-50 animate-fade-in">
      <Sidebar />

      <motion.main
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="flex-1 overflow-y-auto p-6"
>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Expense Tracker</h1>
          <div className="flex gap-2">
          <button
            className="flex items-center gap-1 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-teal-700"
            onClick={() => setShowForm(true)}
            >
  <PlusCircle className="w-5 h-5" /> Add Expense
</button>

            <button className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg">
              <Filter className="w-5 h-5" /> Filter
            </button>
          </div>
          </div>
        <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt}/>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
  {/* PaymentMethodsBar */}
  <div className="bg-green-50 p-4 rounded-2xl text-gray-800 shadow-lg w-full md:w-1/3 flex justify-center items-center h-[400px]">
    <PaymentMethodsBar />
  </div>

  {/* DoughnutChart */}
  <div className="bg-green-50 p-4 rounded-2xl text-gray-800 shadow-lg w-full md:w-1/3 flex justify-center items-center h-[400px]">
    <DoughnutChart />
  </div>

  {/* CardSwiper */}
  <div className="bg-green-50 p-4 rounded-2xl text-gray-800 shadow-lg w-full md:w-1/3 flex justify-center items-center h-[400px]">
    <CardSwiper />
  </div>
</div>


        <div className="bg-teal-100 py-6 px-4 rounded-lg shadow-md text-center my-6">
          <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-semibold text-teal-900 mb-5"
            >
              ✈️💼 Are you planning a business trip?
            </motion.h1>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-teal-900 italic mb-4"
            >
              💱📊 Get real-time currency updates and manage expenses on the go.
            </motion.h3>

      {/* Row 1: CurrencyConverter & ExchangeRateChart side by side */}
             {/* Row 1: Unified card layout for converter and chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Currency Converter */}
                  <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col items-center justify-center">
                  <h2 className="text-3xl font-extrabold tracking-tight text-emerald-700 mb-6 text-center font-[Poppins]">
                    💱 Convert Your Currency Instantly
                  </h2>
                        <div className="w-full max-w-md">
                          <CurrencyConverter />
                        </div>
                      </div>
                  {/* Exchange Rate Chart */}
                  <div className="bg-white p-4 rounded-lg shadow h-full">
                      <h2 className="text-2xl font-semibold text-teal-900 mb-4 text-center font-[Poppins]">
                        🚀 Real-Time USD to Crypto Exchange Rates for Top Coins
                            <h2>for Crypto users</h2>
                      </h2>
                      <div className="flex items-center justify-center">
                        <div className="w-full">
                          <ExchangeRateChart />
                        </div>
                      </div>
                    </div>

                </div>


              {/* Row 2: Top Fiat Currencies full width */}
              <div className="mb-6">
              <h2 className="text-3xl font-bold text-teal-900 mb-6 text-center font-[Poppins]">
                💹 Current Market Exchange Rates (Top 10 Fiat)
              </h2>
              <div className="bg-white p-4 rounded-xl shadow h-[400px]">
                <TopFiatCurrenciesChart />
              </div>
            </div>
              </div>

              {/* Row 3: Expenses Chart full width */}
              <div className="mb-6 bg-green-100 p-4 rounded-t-xl">
                <div className="bg-green-100 p-4 rounded-t-xl">
                  <h2 className="text-3xl font-bold text-teal-900 text-center font-[Poppins]">
                    💰 Track Your Personal Trip Expenses
                  </h2>
                </div>
                <div className="bg-white p-4 rounded-b-xl shadow h-[450px]">
                  <ExpensesChart expenses={expenses} />
                </div>
              </div>


        {/* <ExpenseTrackerForm addExpenses={addExpenses}/> */}
        <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>
        <ToastContainer />
        {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setShowForm(false)}
            >
                &times;
            </button>
            <ExpenseTrackerForm addExpenses={(data) => {
                addExpenses(data);
                setShowForm(false); // Close modal after adding
            }} />
    </div>
  </div>
)}

</motion.main>
    </div>
  )
}

export default ExpenseTracker
