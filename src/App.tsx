import React, { useState, useEffect } from 'react';
import { Calculator } from './components/Calculator';
import { History } from './components/History';

export interface CalculationEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

function App() {
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const addToHistory = (expression: string, result: string) => {
    const newEntry: CalculationEntry = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date(),
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50 calculations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Web Calculator Pro</h1>
          <p className="text-slate-300">Advanced calculator with memory and history.
            <br>EmmiDev Built This!</br>
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          <div className="flex-1 max-w-md mx-auto lg:mx-0">
            <Calculator 
              onCalculation={addToHistory}
              onToggleHistory={() => setShowHistory(!showHistory)}
              showHistory={showHistory}
            />
          </div>
          
          {showHistory && (
            <div className="flex-1 max-w-md mx-auto lg:mx-0">
              <History 
                history={history}
                onClear={clearHistory}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;