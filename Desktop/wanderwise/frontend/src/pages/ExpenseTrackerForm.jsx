import React, { useState } from 'react'
import { handleError } from '../lib/utils';

function ExpenseTrackerForm({addExpenses}) {
    const [expenseInfo,setExpenseInfo]=useState({text:'',amount:'',location:''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo((prev) => ({ ...prev, [name]: value }));
    };
    const handleExpense =(e)=>{
        e.preventDefault();
        console.log(expenseInfo);
        const {text,amount,location}=expenseInfo;
        if(!text || !amount){
            handleError('All fields are required');
            return
        }
        setTimeout(()=>{setExpenseInfo({text:'',amount:'',location:''})},1000)
        addExpenses(expenseInfo);
    }

    return (
        <div>
                <h1 className="text-2xl font-bold text-center mb-5">Add Expense</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleExpense}>
                    <div className="flex flex-col">
                        <label htmlFor="Expense" className="text-lg font-medium mb-1">Expense Description</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="text"
                            placeholder="Enter your Expense Description"
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={expenseInfo.text}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="amount" className="text-lg font-medium mb-1">Expense Amount (in USD)</label>
                        <input
                            onChange={handleChange}
                            type="number"
                            name="amount"
                            placeholder="Enter your Amount, Expense(-ve) Income (+ve)"
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={expenseInfo.amount}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-lg font-medium mb-1">Expense Location</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="location"
                            placeholder="Enter Expense Location"
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={expenseInfo.location}
                        />
                    </div>

                    <button type='submit' className="bg-teal-700 text-white text-lg font-semibold py-3 rounded-md mt-2 transition duration-300 hover:bg-teal-800">
                       Add Expense
                    </button>
                </form>
                
            </div>
         
        
    );
}

export default ExpenseTrackerForm