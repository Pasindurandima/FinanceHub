// Reports.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Calendar } from 'lucide-react';

const Reports = ({ 
  totalIncome, 
  totalExpenses, 
  netBalance, 
  budgetUsed, 
  monthlyBudget, 
  expensesByCategory, 
  dailySpending 
}) => {
  const exportData = () => {
    const csvContent = [
      ['Category', 'Amount', 'Type'],
      ...expensesByCategory.map(cat => [cat.name, cat.value, 'Expense'])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Financial Reports Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
        
        {/* Monthly Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4">Monthly Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Income:</span>
                <span className="font-medium text-green-600">${totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Expenses:</span>
                <span className="font-medium text-red-600">${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Savings:</span>
                <span className={`font-medium ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${netBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span>Savings Rate:</span>
                <span className="font-medium text-blue-600">
                  {totalIncome > 0 ? ((netBalance / totalIncome) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4">Budget Performance</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Budget Goal:</span>
                <span className="font-medium">${monthlyBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Spent:</span>
                <span className="font-medium">${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className={`font-medium ${(monthlyBudget - totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${(monthlyBudget - totalExpenses).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span>Budget Usage:</span>
                <span className={`font-medium ${budgetUsed > 100 ? 'text-red-600' : budgetUsed > 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {budgetUsed.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown Chart */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-4">Category Breakdown</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={expensesByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Options */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={exportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Download size={16} />
            <span>Export PDF</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Calendar size={16} />
            <span>Monthly Report</span>
          </button>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">💡 Smart Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">🎯 Budget Alert</h4>
            <p className="text-sm text-blue-700">
              {budgetUsed > 90 ? 'You\'re close to exceeding your monthly budget. Consider reducing discretionary spending.' :
               budgetUsed > 70 ? 'You\'re on track but approaching 70% of your budget.' :
               'Great job! You\'re well within your budget limits.'}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">💰 Top Expense</h4>
            <p className="text-sm text-green-700">
              Your highest spending category is <strong>{expensesByCategory[0]?.name || 'None'}</strong> 
              at ${expensesByCategory[0]?.value || 0}. Consider if this aligns with your priorities.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">📈 Savings Goal</h4>
            <p className="text-sm text-purple-700">
              {netBalance > 0 ? 
                `Excellent! You saved $${netBalance} this month. Keep up the great work!` :
                'Consider setting up automatic transfers to build your emergency fund.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Spending Trends */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">📊 Spending Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Weekly Average</h4>
            <p className="text-2xl font-bold text-gray-800">${(totalExpenses / 4).toFixed(0)}</p>
            <p className="text-sm text-gray-600">Average weekly spending</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Daily Average</h4>
            <p className="text-2xl font-bold text-gray-800">${(totalExpenses / 30).toFixed(0)}</p>
            <p className="text-sm text-gray-600">Average daily spending</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Most Active Day</h4>
            <p className="text-2xl font-bold text-gray-800">
              {dailySpending.length > 0 
                ? dailySpending.reduce((max, day) => day.amount > max.amount ? day : max, dailySpending[0]).day 
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Day with highest spending</p>
          </div>
        </div>
      </div>

      {/* Detailed Category Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Category Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">% of Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expensesByCategory.map((category, index) => {
                const percentage = totalExpenses > 0 ? (category.value / totalExpenses) * 100 : 0;
                return (
                  <tr key={category.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{category.name}</td>
                    <td className="px-4 py-3 text-sm">${category.value.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{percentage.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        percentage > 30 ? 'bg-red-100 text-red-800' :
                        percentage > 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {percentage > 30 ? 'High' : percentage > 20 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;