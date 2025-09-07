// BudgetGoals.jsx
import React from 'react';

const BudgetGoals = ({ budgetGoals, setBudgetGoals, monthlyBudget, setMonthlyBudget }) => {
  const handleBudgetChange = (category, value) => {
    setBudgetGoals({
      ...budgetGoals,
      [category]: parseFloat(value) || 0
    });
  };

  const handleMonthlyBudgetChange = (value) => {
    setMonthlyBudget(parseFloat(value) || 0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Budget Goals</h3>
        
        {/* Total Monthly Budget */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Monthly Budget
          </label>
          <input
            type="number"
            value={monthlyBudget}
            onChange={(e) => handleMonthlyBudgetChange(e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter monthly budget"
          />
        </div>

        {/* Category Budgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(budgetGoals).map(([category, amount]) => (
            <div key={category} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {category}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleBudgetChange(category, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`${category} budget`}
              />
            </div>
          ))}
        </div>

        {/* Budget Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Budget Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Allocated:</span>
              <p className="font-medium">${Object.values(budgetGoals).reduce((sum, amount) => sum + amount, 0).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Monthly Budget:</span>
              <p className="font-medium">${monthlyBudget.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Remaining:</span>
              <p className={`font-medium ${(monthlyBudget - Object.values(budgetGoals).reduce((sum, amount) => sum + amount, 0)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(monthlyBudget - Object.values(budgetGoals).reduce((sum, amount) => sum + amount, 0)).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Allocation %:</span>
              <p className="font-medium">
                {monthlyBudget > 0 ? ((Object.values(budgetGoals).reduce((sum, amount) => sum + amount, 0) / monthlyBudget) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => {
              const totalAllocated = Object.values(budgetGoals).reduce((sum, amount) => sum + amount, 0);
              const numCategories = Object.keys(budgetGoals).length;
              const evenDistribution = Math.floor(monthlyBudget / numCategories);
              const newBudgets = {};
              Object.keys(budgetGoals).forEach(category => {
                newBudgets[category] = evenDistribution;
              });
              setBudgetGoals(newBudgets);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Even Distribution
          </button>
          <button
            onClick={() => {
              const resetBudgets = {};
              Object.keys(budgetGoals).forEach(category => {
                resetBudgets[category] = 0;
              });
              setBudgetGoals(resetBudgets);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
          >
            Reset All
          </button>
          <button
            onClick={() => {
              const defaultBudgets = {
                Food: 400,
                Rent: 800,
                Bills: 200,
                Transport: 150,
                Entertainment: 100,
                Shopping: 200,
                Healthcare: 100
              };
              setBudgetGoals(defaultBudgets);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Load Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetGoals;