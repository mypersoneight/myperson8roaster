import React, { useState } from 'react';
import { RoastPersona, RoastCategory, RoastLevel, RoastRequest } from '../types';
import { Flame, User, Target, ThermometerSun } from 'lucide-react';

interface RoastFormProps {
  onSubmit: (request: RoastRequest) => void;
  isLoading: boolean;
}

const RoastForm: React.FC<RoastFormProps> = ({ onSubmit, isLoading }) => {
  const [criticism, setCriticism] = useState('');
  const [persona, setPersona] = useState<RoastPersona>(RoastPersona.COMEDIAN);
  const [category, setCategory] = useState<RoastCategory>(RoastCategory.GENERAL);
  const [level, setLevel] = useState<RoastLevel>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (criticism.trim() && !isLoading) {
      onSubmit({ criticism, persona, category, level });
    }
  };

  const getLevelLabel = (lvl: number) => {
    switch(lvl) {
      case 1: return "Mild 🧸";
      case 2: return "Spicy 🌶️";
      case 3: return "Hot 🔥";
      case 4: return "Savage ☣️";
      case 5: return "Nuclear ☢️";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Category Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
            <Target className="w-4 h-4" /> Target Area
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(RoastCategory).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  category === cat
                    ? 'bg-slate-100 text-slate-900 shadow-lg scale-105'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Persona Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
            <User className="w-4 h-4" /> Roast Persona
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.values(RoastPersona).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPersona(p)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  persona === p
                    ? 'bg-orange-500/20 border-orange-500 text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.3)]'
                    : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Level Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
              <ThermometerSun className="w-4 h-4" /> Roast Level
            </label>
            <span className={`text-sm font-bold ${
              level === 1 ? 'text-green-400' :
              level === 2 ? 'text-yellow-400' :
              level === 3 ? 'text-orange-400' :
              level === 4 ? 'text-red-500' : 'text-purple-500'
            }`}>
              {getLevelLabel(level)}
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="5" 
            step="1"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value) as RoastLevel)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-slate-600 px-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-3">
          <label htmlFor="criticism" className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            Give me context (or insult yourself)
          </label>
          <div className="relative group">
            <textarea
              id="criticism"
              value={criticism}
              onChange={(e) => setCriticism(e.target.value)}
              placeholder="e.g., I spend too much time coding..."
              className="w-full h-24 bg-slate-800/50 text-slate-100 placeholder-slate-500 rounded-xl p-4 border border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none resize-none transition-all duration-300"
              disabled={isLoading}
            />
            <div className="absolute bottom-4 right-4 text-slate-600 text-xs">
              {criticism.length}/280
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!criticism.trim() || isLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            !criticism.trim() || isLoading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/40 transform hover:-translate-y-1'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2 animate-pulse">
              <Flame className="w-5 h-5 animate-bounce" /> Cooking...
            </span>
          ) : (
            <>
              <Flame className="w-5 h-5" /> Generate Roast
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RoastForm;
