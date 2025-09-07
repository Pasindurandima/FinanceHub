// Sidebar.jsx
import React from 'react';
import { TrendingUp, DollarSign, Target, Brain, Calendar, User, LogOut, X } from 'lucide-react';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  user, 
  showMobileMenu, 
  setShowMobileMenu 
}) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'budget', label: 'Budget Goals', icon: Target },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'reports', label: 'Reports', icon: Calendar }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    // You can add authentication logout logic here
  };

  return (
    <div className={`bg-gradient-to-b from-indigo-900 to-purple-900 text-white w-64 min-h-screen p-6 fixed left-0 top-0 z-50 transform transition-transform duration-300 ${
      showMobileMenu ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">💰 FinanceHub</h1>
        <button 
          onClick={() => setShowMobileMenu(false)}
          className="lg:hidden text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id 
                ? 'bg-white/20 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* User Profile & Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
          <p className="text-xs text-gray-300">{user.email}</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;