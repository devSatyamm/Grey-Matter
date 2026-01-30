import React, { useState } from 'react';
import { AmongUsIcon, EmailIcon, WalkieTalkieIcon, IdCardIcon } from './Icons';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/SoundManager';

interface LoginPanelProps {
  onLogin: () => void;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setIsLoading(true);
    setTimeout(() => {
        soundManager.playLoginSuccess();
        onLogin();
    }, 1500);
  };

  const handleInputFocus = () => {
    soundManager.playHover();
  };
  
  const handleTyping = () => {
    soundManager.playKeystroke();
  };

  return (
    <div className="relative w-full max-w-2xl transform scale-90 md:scale-100 transition-transform">
        {/* Panel Frame */}
        <form onSubmit={handleLogin} className="relative bg-slate-900/95 border-2 border-slate-600 rounded-sm shadow-2xl p-6 md:p-8 backdrop-blur-sm z-30">
            {/* Corner Screws */}
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center"><div className="w-2 h-[1px] bg-slate-900 rotate-45"></div></div>
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center"><div className="w-2 h-[1px] bg-slate-900 rotate-45"></div></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center"><div className="w-2 h-[1px] bg-slate-900 rotate-45"></div></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center"><div className="w-2 h-[1px] bg-slate-900 rotate-45"></div></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
                <div>
                    <h2 className="text-white font-gaming text-2xl md:text-3xl tracking-wide uppercase">Identity Verify</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-wider">THE SKELD // TERM_04</span>
                    </div>
                </div>
                <div className="border border-orange-500/50 bg-orange-900/20 px-2 py-1">
                    <span className="text-orange-500 font-mono text-xs font-bold">ASSET #932</span>
                </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                
                {/* Username */}
                <div className="space-y-1">
                    <label className="text-slate-400 font-gaming text-xs uppercase tracking-wider">Username</label>
                    <div className="flex items-center bg-white rounded-sm h-12 border-l-4 border-slate-400 shadow-[0_0_10px_rgba(255,255,255,0.1)] group focus-within:border-cyan-500 transition-colors">
                        <div className="px-3 text-slate-600">
                            <AmongUsIcon className="w-5 h-5" />
                        </div>
                        <div className="h-6 w-[1px] bg-slate-300"></div>
                        <input 
                            type="text" 
                            defaultValue="CREWMATE_01"
                            onFocus={handleInputFocus}
                            onKeyDown={handleTyping}
                            className="w-full bg-transparent text-slate-900 p-2 font-mono text-sm focus:outline-none uppercase tracking-widest font-bold"
                        />
                        <div className="w-2 h-full bg-slate-200 animate-pulse opacity-0 group-focus-within:opacity-100"></div>
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-slate-400 font-gaming text-xs uppercase tracking-wider">Email Address</label>
                    <div className="flex items-center bg-white rounded-sm h-12 border-l-4 border-slate-400 shadow-[0_0_10px_rgba(255,255,255,0.1)] group focus-within:border-cyan-500 transition-colors">
                        <div className="px-3 text-slate-600">
                            <EmailIcon className="w-5 h-5" />
                        </div>
                        <div className="h-6 w-[1px] bg-slate-300"></div>
                        <input 
                            type="email" 
                            defaultValue="user@mira.hq"
                            onFocus={handleInputFocus}
                            onKeyDown={handleTyping}
                            className="w-full bg-transparent text-slate-900 p-2 font-mono text-sm focus:outline-none lowercase tracking-wide font-bold"
                        />
                    </div>
                </div>

                {/* Comms ID */}
                <div className="space-y-1">
                    <label className="text-slate-400 font-gaming text-xs uppercase tracking-wider">Comms ID / Phone</label>
                    <div className="flex items-center bg-white rounded-sm h-12 border-l-4 border-slate-400 shadow-[0_0_10px_rgba(255,255,255,0.1)] group focus-within:border-cyan-500 transition-colors">
                        <div className="px-3 text-slate-600">
                            <WalkieTalkieIcon className="w-5 h-5" />
                        </div>
                        <div className="h-6 w-[1px] bg-slate-300"></div>
                        <input 
                            type="text" 
                            defaultValue="CH-192-883"
                            onFocus={handleInputFocus}
                            onKeyDown={handleTyping}
                            className="w-full bg-transparent text-slate-900 p-2 font-mono text-sm focus:outline-none uppercase tracking-widest font-bold"
                        />
                    </div>
                </div>

                {/* Reg No */}
                <div className="space-y-1">
                    <label className="text-slate-400 font-gaming text-xs uppercase tracking-wider">Registration No.</label>
                    <div className="flex items-center bg-white rounded-sm h-12 border-l-4 border-slate-400 shadow-[0_0_10px_rgba(255,255,255,0.1)] group focus-within:border-cyan-500 transition-colors">
                        <div className="px-3 text-slate-600">
                            <IdCardIcon className="w-5 h-5" />
                        </div>
                        <div className="h-6 w-[1px] bg-slate-300"></div>
                        <input 
                            type="text" 
                            defaultValue="ID-734-X2"
                            onFocus={handleInputFocus}
                            onKeyDown={handleTyping}
                            className="w-full bg-transparent text-slate-900 p-2 font-mono text-sm focus:outline-none uppercase tracking-widest font-bold"
                        />
                    </div>
                </div>
            </div>

            {/* Task Area */}
            <div className="bg-slate-800/50 border border-slate-700 p-4 mb-6 rounded-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-500 font-gaming text-xs uppercase tracking-wider">Pending Tasks:</span>
                    <span className="text-yellow-500 font-mono text-xs">3 REMAINING</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full mb-3 overflow-hidden">
                    <div className="w-[60%] h-full bg-yellow-400 rounded-full"></div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-green-500 text-xs font-mono opacity-80">
                        <Check className="w-3 h-3" />
                        <span className="line-through">Calibrate Distributor</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        <span>Fix Wiring (Electrical)</span>
                    </div>
                </div>
            </div>

            {/* Button */}
            <button 
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-t border-cyan-400 shadow-lg relative overflow-hidden group transition-all"
            >
                {/* Button Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMikiLz48L3N2Zz4=')] opacity-20"></div>
                
                <div className="flex items-center justify-center gap-3 relative z-10">
                    <span className="text-white font-gaming text-xl uppercase tracking-[0.2em] drop-shadow-md">
                        {isLoading ? 'Processing...' : 'Initiate Login'}
                    </span>
                    {!isLoading && <ArrowRight className="text-cyan-200 w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                </div>
            </button>

            {/* Footer Meta */}
            <div className="flex justify-between mt-4 text-[10px] font-mono text-slate-500 uppercase">
                <span>SYS.05.99.2</span>
                <span>SECURE_LINK: ESTABLISHED</span>
            </div>
        </form>
    </div>
  );
};

export default LoginPanel;