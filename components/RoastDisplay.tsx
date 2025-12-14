import React, { useEffect, useState } from 'react';
import { Copy, Share2, RefreshCw, Zap } from 'lucide-react';

interface RoastDisplayProps {
  roast: string | null;
  onReset: () => void;
}

const RoastDisplay: React.FC<RoastDisplayProps> = ({ roast, onReset }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (roast) {
      setDisplayedText('');
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + roast.charAt(index));
        index++;
        if (index >= roast.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30); // Typing speed
      return () => clearInterval(interval);
    }
  }, [roast]);

  const handleCopy = () => {
    if (roast) {
      navigator.clipboard.writeText(roast);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!roast) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-fade-in-up">
      <div className="relative bg-gradient-to-br from-red-900/40 to-slate-900/80 border border-red-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        
        {/* Decorative Quote Icon */}
        <div className="absolute -top-4 -left-4 bg-slate-950 p-2 rounded-full border border-red-500/50 shadow-xl">
           <Zap className="w-8 h-8 text-orange-500 fill-orange-500" />
        </div>

        <div className="mb-6">
          <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300 leading-tight min-h-[4rem]">
            "{displayedText}"
            {isTyping && <span className="inline-block w-2 h-8 ml-1 bg-orange-500 animate-blink align-middle"></span>}
          </p>
        </div>

        <div className={`flex items-center justify-between pt-4 border-t border-red-500/20 transition-opacity duration-500 ${isTyping ? 'opacity-0' : 'opacity-100'}`}>
           <button 
            onClick={onReset}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
           >
             <RefreshCw className="w-4 h-4" /> Try Again
           </button>

           <div className="flex gap-3">
             <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
             >
               {copied ? (
                 <span className="text-green-400">Copied!</span>
               ) : (
                 <>
                   <Copy className="w-4 h-4" /> Copy
                 </>
               )}
             </button>
             {/* Note: Real share functionality would depend on platform, this is visual */}
             <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">
               <Share2 className="w-4 h-4" /> Share
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RoastDisplay;
