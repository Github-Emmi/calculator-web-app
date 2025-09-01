import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { CalculationEntry } from '../App';

interface HistoryProps {
  history: CalculationEntry[];
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onClear }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-white">
          <Clock size={20} />
          <h2 className="text-xl font-bold">History</h2>
        </div>
        <button
          onClick={onClear}
          className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all duration-200"
          disabled={history.length === 0}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            <Clock size={48} className="mx-auto mb-4 opacity-50" />
            <p>No calculations yet</p>
            <p className="text-sm mt-1">Start calculating to see history</p>
          </div>
        ) : (
          history.map((entry) => (
            <div
              key={entry.id}
              className="bg-black/20 rounded-xl p-4 border border-white/10 hover:bg-black/30 transition-all duration-200"
            >
              <div className="text-white/80 text-sm mb-1">
                {formatTime(entry.timestamp)}
              </div>
              <div className="text-white/90 text-sm mb-1">
                {entry.expression}
              </div>
              <div className="text-white font-semibold text-lg">
                = {entry.result}
              </div>
            </div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-white/60 text-sm text-center">
            {history.length} calculation{history.length !== 1 ? 's' : ''} saved
          </div>
        </div>
      )}
    </div>
  );
};