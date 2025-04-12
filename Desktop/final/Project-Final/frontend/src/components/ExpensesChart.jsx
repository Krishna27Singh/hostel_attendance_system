import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#065f46', '#047857', '#059669', '#10b981', '#34d399', '#6ee7b7'];

const ExpensesChart = ({ expenses }) => {
  const [chartType, setChartType] = useState('bar');
  console.log("expenses",expenses)
  const groupedData = expenses?.reduce((acc, curr) => {
    const key = curr.text || 'Unknown';
    const amt = Math.abs(curr.amount);
    if (amt === 0 || curr.amount > 0) return acc;
    acc[key] = (acc[key] || 0) + amt;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData)
    .map(([key, value]) => ({
      category: key,
      expense: value,
    }))
    .sort((a, b) => b.expense - a.expense);

  const locationData = expenses.reduce((acc, curr) => {
    const key = curr.location || 'Unknown';
    const amt = Math.abs(curr.amount);
    if (amt === 0 || curr.amount > 0) return acc;
    acc[key] = (acc[key] || 0) + amt;
    return acc;
  }, {});

  const pieData = Object.entries(locationData).map(([key, value]) => ({
    category: key,
    expense: value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white p-6 rounded-lg shadow-md mt-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Expenses by Description</h2>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Description-wise Chart */}
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'bar' ? (
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="category" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="expense"
                  isAnimationActive={true}
                  animationBegin={300}
                  animationDuration={1000}
                  radius={[8, 8, 8, 8]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke={COLORS[0]}
                  strokeWidth={3}
                  dot={{ r: 4, fill: COLORS[1] }}
                  activeDot={{ r: 6, fill: COLORS[2] }}
                  isAnimationActive={true}
                  animationBegin={300}
                  animationDuration={1000}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Location-wise Pie Chart */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold text-teal-800 mb-4 text-center">
            📍 Expenses by Location
          </h1>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="expense"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                isAnimationActive={true}
                animationBegin={300}
                animationDuration={1000}
                label={({ cx, cy, midAngle, outerRadius, percent, value, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 10;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  const formattedValue = value.toLocaleString();

                  return (
                    <text
                      x={x}
                      y={y}
                      fill={COLORS[index % COLORS.length]}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      <tspan fontWeight="bold">₹{formattedValue}</tspan>{' '}
                      ({(percent * 100).toFixed(1)}%)
                    </text>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpensesChart;