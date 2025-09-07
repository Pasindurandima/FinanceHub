// App.jsx - Main Application Component
import React, { useState, useMemo } from 'react';
import { Menu, Bell } from 'lucide-react';

// Import Components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import BudgetGoals from './components/BudgetGoals';
import AIAssistant from './components/AIAssistant';
import Reports from './components/Reports';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  
  // App State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Transaction State
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-08-01', amount: 3500, type: 'income', category: 'Salary', notes: 'Monthly salary', recurring: false },
    { id: 2, date: '2024-08-01', amount: -800, type: 'expense', category: 'Rent', notes: 'Monthly rent', recurring: true },
    { id: 3, date: '2024-08-02', amount: -45, type: 'expense', category: 'Food', notes: 'Grocery shopping', recurring: false },
    { id: 4, date: '2024-08-02', amount: -120, type: 'expense', category: 'Bills', notes: 'Electricity bill', recurring: false },
    { id: 5, date: '2024-08-03', amount: -30, type: 'expense', category: 'Transport', notes: 'Gas', recurring: false },
  ]);
  
  const [budgetGoals, setBudgetGoals] = useState({
    Food: 400,
    Rent: 800,
    Bills: 200,
    Transport: 150,
    Entertainment: 100,
    Shopping: 200,
    Healthcare: 100
  });
  
  const [monthlyBudget, setMonthlyBudget] = useState(3000);

  // Calculations
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });
  
  const totalIncome = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
  const netBalance = totalIncome - totalExpenses;
  const budgetUsed = (totalExpenses / monthlyBudget) * 100;
  
  // Chart Data
  const expensesByCategory = useMemo(() => {
    const categoryTotals = {};
    monthlyTransactions.filter(t => t.type === 'expense').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [monthlyTransactions]);
  
  const dailySpending = useMemo(() => {
    const dailyTotals = {};
    monthlyTransactions.filter(t => t.type === 'expense').forEach(t => {
      const day = t.date.split('-')[2];
      dailyTotals[day] = (dailyTotals[day] || 0) + Math.abs(t.amount);
    });
    return Object.entries(dailyTotals).map(([day, amount]) => ({ day: parseInt(day), amount })).sort((a, b) => a.day - b.day);
  }, [monthlyTransactions]);

  // Authentication Functions
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  // Transaction Functions
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
          </button>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </header>
  );

  // Render Content Based on Active Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
            budgetUsed={budgetUsed}
            expensesByCategory={expensesByCategory}
            dailySpending={dailySpending}
            budgetGoals={budgetGoals}
          />
        );
      case 'transactions':
        return (
          <Transactions
            transactions={transactions}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
          />
        );
      case 'budget':
        return (
          <BudgetGoals
            budgetGoals={budgetGoals}
            setBudgetGoals={setBudgetGoals}
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}
          />
        );
      case 'ai-assistant':
        return (
          <AIAssistant
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
            budgetUsed={budgetUsed}
            expensesByCategory={expensesByCategory}
          />
        );
      case 'reports':
        return (
          <Reports
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
            budgetUsed={budgetUsed}
            monthlyBudget={monthlyBudget}
            expensesByCategory={expensesByCategory}
            dailySpending={dailySpending}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  // Authentication Screens
  if (!isLoggedIn) {
    if (authMode === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthMode('register')}
      />
    );
  }

  // Main Application
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <Header />

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Budget Alert Notification */}
      {budgetUsed > 90 && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center space-x-2">
            <Bell size={16} />
            <span className="font-medium">Budget Alert!</span>
          </div>
          <p className="text-sm mt-1">You've used {budgetUsed.toFixed(1)}% of your monthly budget.</p>
        </div>
      )}
    </div>
  );
};

export default App;