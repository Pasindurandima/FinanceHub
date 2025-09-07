// AIAssistant.jsx
import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const AIAssistant = ({ 
  totalIncome, 
  totalExpenses, 
  netBalance, 
  budgetUsed, 
  expensesByCategory 
}) => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setIsAiThinking(true);
    
    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      let response = '';
      
      if (aiQuery.toLowerCase().includes('save money')) {
        response = `Based on your spending pattern, here are personalized savings tips:
        
1. **Food Budget Optimization**: You've spent $${expensesByCategory.find(c => c.name === 'Food')?.value || 0} on food. Try meal planning to save 15-20%.

2. **Transport Savings**: Consider carpooling or public transport to reduce your transport costs.

3. **Subscription Audit**: Review recurring payments and cancel unused subscriptions.

4. **The 50/30/20 Rule**: Allocate 50% for needs, 30% for wants, 20% for savings.

**Potential Monthly Savings: $200-300**`;
      } else if (aiQuery.toLowerCase().includes('budget') || aiQuery.toLowerCase().includes('spend')) {
        response = `**Budget Analysis for ${new Date().toLocaleDateString('en-US', { month: 'long' })}:**

💰 **Current Status:**
- Income: $${totalIncome.toLocaleString()}
- Expenses: $${totalExpenses.toLocaleString()}
- Net Balance: $${netBalance.toLocaleString()}
- Budget Usage: ${budgetUsed.toFixed(1)}%

📊 **Recommendations:**
${budgetUsed > 90 ? '⚠️ You\'re close to exceeding your budget! Consider reducing discretionary spending.' : '✅ You\'re on track with your budget.'}

🎯 **Top Spending Categories:**
${expensesByCategory.slice(0, 3).map((cat, i) => `${i + 1}. ${cat.name}: $${cat.value}`).join('\n')}`;
      } else if (aiQuery.toLowerCase().includes('afford')) {
        const remainingBudget = (totalIncome - totalExpenses);
        response = `**Affordability Check:**

💳 **Available Budget:** $${remainingBudget.toLocaleString()}

${remainingBudget > 500 ? '✅ You have good financial flexibility this month!' : remainingBudget > 200 ? '⚠️ You have moderate spending room left.' : '🚨 Limited budget remaining - be cautious with purchases.'}

**Suggestions:**
- Emergency fund: Keep $100-200 as buffer
- For major purchases: Consider spreading cost over 2-3 months
- Check upcoming recurring expenses`;
      } else {
        response = `I'm your AI budget assistant! I can help you with:

🎯 **Ask me about:**
- "How can I save $200 this month?"
- "Can I afford a $300 purchase?"
- "What's my spending pattern?"
- "How to optimize my budget?"

📊 **Current Overview:**
- Monthly Income: $${totalIncome.toLocaleString()}
- Total Expenses: $${totalExpenses.toLocaleString()}
- Budget Used: ${budgetUsed.toFixed(1)}%
- Top Category: ${expensesByCategory[0]?.name || 'None'} ($${expensesByCategory[0]?.value || 0})`;
      }
      
      setAiResponse(response);
      setIsAiThinking(false);
    }, 2000);
  };

  const quickActions = [
    {
      title: '💰 Savings Tips',
      description: 'Get personalized advice on saving money',
      query: 'How can I save $200 this month?'
    },
    {
      title: '📊 Spending Analysis',
      description: 'Analyze your spending habits',
      query: 'What\'s my spending pattern this month?'
    },
    {
      title: '🎯 Budget Check',
      description: 'Check your budget status',
      query: 'How am I doing with my budget this month?'
    },
    {
      title: '💳 Affordability',
      description: 'Check if you can afford something',
      query: 'Can I afford a $500 purchase?'
    }
  ];

  const handleQuickAction = (query) => {
    setAiQuery(query);
    handleAiQuery();
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">🤖 AI Budget Assistant</h3>
        <p className="text-purple-100">
          Ask me anything about your finances, budget optimization, or spending habits!
        </p>
      </div>
      
      {/* AI Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Ask me: 'How can I save $200 this month?' or 'Can I afford a new laptop?'"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleAiQuery}
            disabled={isAiThinking}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Brain size={16} />
            <span>{isAiThinking ? 'Thinking...' : 'Ask AI'}</span>
          </button>
        </div>
        
        {/* AI Response */}
        {aiResponse && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {aiResponse}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.query)}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
            >
              <h4 className="font-medium text-gray-900">{action.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Tips */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">💡 AI Tips</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>• Ask specific questions like "Can I afford a $300 phone?" for better responses</p>
          <p>• Use keywords like "save", "budget", "afford", or "spending" for targeted advice</p>
          <p>• The AI analyzes your actual financial data to give personalized recommendations</p>
          <p>• Try asking about different time periods: "How did I spend last month?"</p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;