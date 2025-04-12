import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

function ExpensesTable({ expenses, handleDeleteExpense }) {

  const formatRelativeDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <a href="#" className="text-teal-600 text-sm font-medium">View All</a>
      </div>

      {
        expenses?.filter(expense => expense && expense.text && expense.amount).map((expense, index) => (
          <div key={index} className="flex justify-between items-center py-4 border-b">
            {/* Left Section: Icon + Texts */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-xl">
                🧾
              </div>
              <div>
                <div className="font-medium text-sm">{expense.text}</div>
                <div className="text-xs text-gray-500">{expense.location || 'Unknown'}</div>
              </div>
            </div>

            {/* Right Section: Amount + Time */}
            <div className="text-right">
              <div
                className={`text-sm font-semibold ${expense.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {expense.amount < 0 ? `-$${Math.abs(expense.amount).toFixed(2)}` : `$${expense.amount.toFixed(2)}`}
              </div>
              <div className="text-xs text-gray-400">
                {expense.createdAt ? formatRelativeDate(expense.createdAt) : ''}
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={() => handleDeleteExpense(expense._id)}
              className="ml-4 text-gray-400 hover:text-red-500 text-sm"
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default ExpensesTable;
