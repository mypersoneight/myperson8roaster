import React, { useState } from 'react';
import { generateRoast } from './services/geminiService';
import { RoastRequest } from './types';
import { LOADING_MESSAGES } from './constants';
import RoastForm from './components/RoastForm';
import RoastDisplay from './components/RoastDisplay';
import { Terminal, Flame } from 'lucide-react';

const App: React.FC = () => {
  const [roast, setRoast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);

  const handleRoastRequest = async (request: RoastRequest) => {
    setIsLoading(true);
    setRoast(null);
    setError(null);

    const msgInterval = setInterval(() => {
      setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 1500);

    try {
      const result = await generateRoast(request);
      setRoast(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      clearInterval(msgInterval);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRoast(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center justify-start min-h-screen">
        
        {/* Header */}
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-400">System Online v3.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 drop-shadow-sm flex items-center justify-center gap-4">
            MY <span className="text-orange-500">PERSON8</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Choose your persona, set the intensity, and prepare for damage.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="w-full flex flex-col items-center gap-8">
          
          {/* Conditional Rendering: Show Form or Loader or Result */}
          {!roast && !isLoading && (
            <RoastForm onSubmit={handleRoastRequest} isLoading={isLoading} />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
               <div className="relative w-24 h-24 mb-8">
                 <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                 <Flame className="absolute inset-0 m-auto text-orange-500 w-10 h-10 animate-pulse" />
               </div>
               <p className="text-xl font-bold text-slate-300 animate-pulse">{loadingMsg}</p>
            </div>
          )}

          {error && (
             <div className="w-full max-w-2xl bg-red-900/20 border border-red-500/50 text-red-200 p-6 rounded-xl flex items-center gap-4 animate-shake">
                <Terminal className="w-6 h-6 flex-shrink-0" />
                <p>{error}</p>
                <button 
                  onClick={handleReset} 
                  className="ml-auto px-4 py-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-sm transition-colors"
                >
                  Dismiss
                </button>
             </div>
          )}

          <RoastDisplay roast={roast} onReset={handleReset} />
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-20 pb-6 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} myperson8. Don't take it personally.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;