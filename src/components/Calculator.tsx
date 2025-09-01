import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Delete, RotateCcw } from 'lucide-react';

interface CalculatorProps {
  onCalculation: (expression: string, result: string) => void;
  onToggleHistory: () => void;
  showHistory: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ 
  onCalculation, 
  onToggleHistory,
  showHistory 
}) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const expression = `${previousValue} ${operation} ${inputValue}`;
      const result = calculate(previousValue, inputValue, operation);
      
      setDisplay(`${parseFloat(result.toFixed(7))}`);
      onCalculation(expression, `${parseFloat(result.toFixed(7))}`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  // Memory functions
  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryRecall = () => {
    setDisplay(`${memory}`);
    setWaitingForOperand(true);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDot();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        performOperation(key);
      } else if (key === 'Enter' || key === '=') {
        performCalculation();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, operation, previousValue, waitingForOperand]);

  const ButtonProps = {
    className: "h-16 rounded-xl font-semibold text-lg transition-all duration-150 active:scale-95 shadow-md"
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-white">
          <h2 className="text-xl font-bold">Calculator</h2>
          {memory !== 0 && (
            <div className="text-sm text-blue-300">Memory: {memory}</div>
          )}
        </div>
        <button
          onClick={onToggleHistory}
          className={`p-3 rounded-xl transition-all duration-200 ${
            showHistory 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <HistoryIcon size={20} />
        </button>
      </div>

      {/* Display */}
      <div className="bg-black/20 rounded-2xl p-6 mb-6 border border-white/10">
        <div className="text-right">
          <div className="text-white/60 text-sm h-6">
            {operation && previousValue !== null && 
              `${previousValue} ${operation}`
            }
          </div>
          <div className="text-white text-3xl font-light break-all">
            {display}
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Memory Row */}
        <button
          {...ButtonProps}
          onClick={memoryClear}
          className={`${ButtonProps.className} bg-orange-500 hover:bg-orange-600 text-white`}
        >
          MC
        </button>
        <button
          {...ButtonProps}
          onClick={memoryRecall}
          className={`${ButtonProps.className} bg-orange-500 hover:bg-orange-600 text-white`}
        >
          MR
        </button>
        <button
          {...ButtonProps}
          onClick={memoryAdd}
          className={`${ButtonProps.className} bg-orange-500 hover:bg-orange-600 text-white`}
        >
          M+
        </button>
        <button
          {...ButtonProps}
          onClick={memorySubtract}
          className={`${ButtonProps.className} bg-orange-500 hover:bg-orange-600 text-white`}
        >
          M-
        </button>

        {/* Clear Row */}
        <button
          {...ButtonProps}
          onClick={clear}
          className={`${ButtonProps.className} bg-red-500 hover:bg-red-600 text-white col-span-2`}
        >
          <div className="flex items-center justify-center gap-2">
            <RotateCcw size={18} />
            Clear
          </div>
        </button>
        <button
          {...ButtonProps}
          onClick={backspace}
          className={`${ButtonProps.className} bg-gray-600 hover:bg-gray-700 text-white`}
        >
          <Delete size={18} />
        </button>
        <button
          {...ButtonProps}
          onClick={() => performOperation('/')}
          className={`${ButtonProps.className} bg-blue-500 hover:bg-blue-600 text-white`}
        >
          ÷
        </button>

        {/* Number Rows */}
        <button
          {...ButtonProps}
          onClick={() => inputNumber('7')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          7
        </button>
        <button
          {...ButtonProps}
          onClick={() => inputNumber('8')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          8
        </button>
        <button
          {...ButtonProps}
          onClick={() => inputNumber('9')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          9
        </button>
        <button
          {...ButtonProps}
          onClick={() => performOperation('*')}
          className={`${ButtonProps.className} bg-blue-500 hover:bg-blue-600 text-white`}
        >
          ×
        </button>

        <button
          {...ButtonProps}
          onClick={() => inputNumber('4')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          4
        </button>
        <button
          {...ButtonProps}
          onClick={() => inputNumber('5')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          5
        </button>
        <button
          {...ButtonProps}
          onClick={() => inputNumber('6')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          6
        </button>
        <button
          {...ButtonProps}
          onClick={() => performOperation('-')}
          className={`${ButtonProps.className} bg-blue-500 hover:bg-blue-600 text-white`}
        >
          −
        </button>

        <button
          {...ButtonProps}
          onClick={() => inputNumber('1')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          1
        </button>
        <button
          {...ButtonProps}
          onClick={() => inputNumber('2')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          2
        </button>
        <button
          {...ButtonProps}
          onClick={() => inputNumber('3')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          3
        </button>
        <button
          {...ButtonProps}
          onClick={() => performOperation('+')}
          className={`${ButtonProps.className} bg-blue-500 hover:bg-blue-600 text-white`}
        >
          +
        </button>

        <button
          {...ButtonProps}
          onClick={() => inputNumber('0')}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white col-span-2`}
        >
          0
        </button>
        <button
          {...ButtonProps}
          onClick={inputDot}
          className={`${ButtonProps.className} bg-gray-700 hover:bg-gray-600 text-white`}
        >
          .
        </button>
        <button
          {...ButtonProps}
          onClick={performCalculation}
          className={`${ButtonProps.className} bg-green-500 hover:bg-green-600 text-white`}
        >
          =
        </button>
      </div>
    </div>
  );
};