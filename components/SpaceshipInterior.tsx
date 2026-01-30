import React from 'react';
import LoginPanel from './LoginPanel';
import Crewmate from './Crewmate';

interface SpaceshipInteriorProps {
  onLogin: () => void;
}

const SpaceshipInterior: React.FC<SpaceshipInteriorProps> = ({ onLogin }) => {
  return (
    <div className="absolute bottom-0 w-full h-[60%] bg-[#2a1a1a] shadow-[0_-20px_40px_rgba(0,0,0,0.8)] z-10 flex flex-col overflow-hidden">
        
        {/* Top Border Gradient */}
        <div className="w-full h-24 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 z-0"></div>

        {/* Interior Structure - Door/Scanner on Left */}
        <div className="absolute left-[5%] bottom-[15%] w-[25vw] max-w-[300px] h-[40vh] z-10 hidden md:block">
             {/* Door Frame */}
             <div className="w-full h-full border-[12px] border-[#4a3b3b] rounded-t-full bg-slate-900/50 relative overflow-hidden shadow-inner">
                 {/* Scanner Light Grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,0,255,0.05)_25%,rgba(100,0,255,0.05)_50%,transparent_50%,transparent_75%,rgba(100,0,255,0.05)_75%,rgba(100,0,255,0.05)_100%)] bg-[length:20px_20px]"></div>
                 
                 {/* Inner Glow */}
                 <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>

                 {/* Lockdown Text */}
                 <div className="absolute top-8 w-full text-center">
                     <span className="text-red-500 font-gaming text-xs tracking-widest animate-pulse border border-red-500/50 px-2 py-0.5 rounded bg-black/50">LOCKDOWN</span>
                 </div>

                 {/* Peeking Crewmate */}
                 <div className="absolute -right-4 bottom-0">
                     <Crewmate color="red" className="w-24 h-24" isImposter={true} />
                 </div>
                 
                 {/* Coffee Cup on small ledge */}
                 <div className="absolute bottom-10 left-4 w-8 h-6 bg-[#3a2b2b] rounded-sm flex items-center justify-center">
                     <div className="w-4 h-5 bg-white/80 rounded-sm relative">
                        <div className="absolute top-1 -right-2 w-2 h-3 border-2 border-white/80 rounded-r-md"></div>
                     </div>
                 </div>
             </div>
             
             {/* Red Siren Light Top of Door */}
             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-red-900 rounded-t-full flex items-center justify-center z-20">
                 <div className="w-12 h-6 bg-red-500 rounded-t-full animate-pulse shadow-[0_0_20px_#ef4444]"></div>
             </div>
        </div>

        {/* Right Side - Subtle Wall details */}
        <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-black/40 to-transparent z-0">
             <div className="w-[1px] h-full bg-white/5 absolute left-0"></div>
             <div className="absolute top-1/4 right-0 w-full h-[1px] bg-white/5"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center relative w-full px-4 z-30">
            {/* Red Crewmate peeking from behind panel on small screens */}
            <div className="md:hidden absolute left-0 bottom-20">
                 <Crewmate color="red" className="w-20 h-20" />
            </div>

            {/* Login Panel */}
            <div className="w-full flex justify-center mt-[-5%] md:mt-0">
                <LoginPanel onLogin={onLogin} />
            </div>
        </div>

        {/* Bottom Status Footer */}
        <div className="w-full h-8 bg-slate-900 border-t border-slate-700 flex items-center justify-between px-4 md:px-8 z-40">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 font-mono text-[10px] md:text-xs uppercase tracking-wider">Reactors: Stable</span>
                </div>
                <div className="flex items-center gap-2 hidden md:flex">
                    <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                    <span className="text-slate-400 font-mono text-[10px] md:text-xs uppercase tracking-wider">O2: Filtering</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-red-900 font-mono text-[10px] md:text-xs uppercase tracking-widest animate-pulse hidden md:block">
                    WARNING: SUSPICIOUS ACTIVITY DETECTED IN VENTILATION SYSTEMS // SECTOR 7G // CHECK
                </span>
            </div>

            <div className="flex items-center">
                 <span className="text-slate-600 font-mono text-[10px] uppercase">MIRA_HQ // TERMINAL_ACCESS</span>
            </div>
        </div>

    </div>
  );
};

export default SpaceshipInterior;