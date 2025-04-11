import React from 'react'

function ExpenseDetails({incomeAmt,expenseAmt}) {


  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-teal-500 text-white p-5 rounded-lg shadow-md animate-fade-in-up">
            <p className="text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">${incomeAmt-expenseAmt}</h2>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md animate-fade-in-up">
            <p className="text-sm">Income</p>
            <h2 className="text-2xl font-bold text-green-600">${incomeAmt}</h2>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md animate-fade-in-up">
            <p className="text-sm">Expenses</p>
            <h2 className="text-2xl font-bold text-red-600">${expenseAmt}</h2>
          </div>
        </div>

    // <div>
    //     <div>
    //         Your Balance is {incomeAmt-expenseAmt}
    //     </div>
    //     <div className='amounts-container'>
    //         Income
    //         <span className='income-amount'>{incomeAmt}</span>
    //         Expense
    //         <span className='expense-amount'>{expenseAmt}</span>


    //     </div>
    // </div>
  )
}

export default ExpenseDetails