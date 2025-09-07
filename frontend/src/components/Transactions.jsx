// Transactions.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';

const Transactions = ({ transactions, addTransaction, deleteTransaction }) => {
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    type: 'expense',
    category: 'Food',
    notes: '',
    recurring: false
  });

  const categories = ['Food', 'Rent', 'Bills', 'Transport', 'Entertainment', 'Shopping', 'Healthcare', 'Other'];

  const handleAddTransaction = () => {
    if (!newTransaction.amount) return;
    
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: newTransaction.type === 'expense' 
        ? -Math.abs(parseFloat(newTransaction.amount)) 
        : parseFloat(newTransaction.amount)
    };
    
    addTransaction(transaction);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      type: 'expense',
      category: 'Food',
      notes: '',
      recurring: false
    });
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Amount', 'Type', 'Category', 'Notes'],
      ...transactions.map(t => [t.date, t.amount, t.type, t.category, t.notes])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Add Transaction Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newTransaction.notes}
            onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newTransaction.recurring}
              onChange={(e) => setNewTransaction({...newTransaction, recurring: e.target.checked})}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Recurring</span>
          </label>
          <button
            onClick={handleAddTransaction}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Notes</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.slice().reverse().map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{transaction.date}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{transaction.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{transaction.notes}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;