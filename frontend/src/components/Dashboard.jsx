// Dashboard.jsx
import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const Dashboard = ({ 
  totalIncome, 
  totalExpenses, 
  netBalance, 
  budgetUsed, 
  expensesByCategory, 
  dailySpending, 
  budgetGoals 
}) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#87d068', '#ffb347'];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Income</p>
              <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-green-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
            </div>
            <TrendingDown className="text-red-200" size={32} />
          </div>
        </div>
        
        <div className={`bg-gradient-to-r ${netBalance >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-xl p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Net Balance</p>
              <p className="text-2xl font-bold">${netBalance.toLocaleString()}</p>
            </div>
            <DollarSign className="text-blue-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Budget Used</p>
              <p className="text-2xl font-bold">{budgetUsed.toFixed(1)}%</p>
            </div>
            <Target className="text-purple-200" size={32} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Spending Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
        <div className="space-y-4">
          {Object.entries(budgetGoals).map(([category, budget]) => {
            const spent = expensesByCategory.find(c => c.name === category)?.value || 0;
            const percentage = (spent / budget) * 100;
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category}</span>
                  <span className={percentage > 100 ? 'text-red-600' : 'text-gray-600'}>
                    ${spent.toFixed(0)} / ${budget}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;