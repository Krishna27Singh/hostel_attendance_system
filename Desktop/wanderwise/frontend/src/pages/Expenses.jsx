import React from 'react';
import { PlusCircle, Filter, TrendingUp, TrendingDown, Wallet, ShoppingBag, Briefcase, Utensils } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { PieChart } from 'react-minimal-pie-chart';

const Expenses = () => {
  const expensesData = [
    { title: "Flight Bookings", value: 40, color: "#0097A7" },
    { title: "Hotel Bookings", value: 30, color: "#34C759" },
    { title: "Food & Dining", value: 20, color: "#FFC107" },
    { title: "Transportation", value: 5, color: "#FF69B4" },
    { title: "Miscellaneous", value: 5, color: "#8B9467" },
  ];

  const totalExpenses = expensesData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex h-screen bg-gray-50 animate-fade-in">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Expense Tracker</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-teal-700">
              <PlusCircle className="w-5 h-5" /> Add Expense
            </button>
            <button className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg">
              <Filter className="w-5 h-5" /> Filter
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-teal-500 text-white p-5 rounded-lg shadow-md animate-fade-in-up">
            <p className="text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">$24,562.00</h2>
            <p className="text-xs mt-1">↑ +2.4% from last month</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md animate-fade-in-up">
            <p className="text-sm">Income</p>
            <h2 className="text-2xl font-bold text-green-600">$8,942.00</h2>
            <p className="text-xs text-green-600 mt-1">+12.5%</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md animate-fade-in-up">
            <p className="text-sm">Expenses</p>
            <h2 className="text-2xl font-bold text-red-600">$5,321.00</h2>
            <p className="text-xs text-red-600 mt-1">+8.2%</p>
          </div>
        </div>

        {/* Expense Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow-md mb-6 animate-fade-in-up">
          <h2 className="text-lg font-semibold mb-2">Expense Distribution</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center">
              <PieChart
                data={expensesData}
                radius={20}
                lineWidth={10}
                animate={true}
                label={false}
                style={{ height: '300px', width: '300px' }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <ul className="space-y-2 text-gray-600">
                {expensesData.map((expense) => (
                  <li key={expense.title} className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: expense.color }}></span>
                    <span>{expense.title} - {Math.round((expense.value / totalExpenses) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-5 rounded-lg shadow-md animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <a href="#" className="text-teal-600 text-sm font-medium">View All</a>
          </div>

          <div className="space-y-4">
            {/* Transaction Item */}
            {[
              { name: 'Flight Booking', place: 'Airline.com', amount: '-$300.00', date: 'Today', icon: <Briefcase className="text-blue-500" /> },
              { name: 'Hotel Booking', place: 'Booking.com', amount: '-$250.00', date: 'Yesterday', icon: <ShoppingBag className="text-green-500" /> },
              { name: 'Food', place: "Foodie's Place", amount: '-$50.00', date: '2 days ago', icon: <Utensils className="text-red-500" /> }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.place}</p>
                  </div>
                </div>
                <div className={`font-medium ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.amount}
                </div>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expenses;