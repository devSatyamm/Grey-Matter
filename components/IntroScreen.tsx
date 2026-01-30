import React, { useEffect, useState } from 'react';
import { soundManager } from '../utils/SoundManager';
import { ArrowRight } from 'lucide-react';
import Crewmate from './Crewmate';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Start ambient noise on mount
    soundManager.playAmbience();
  }, []);

  const handleEnter = () => {
    soundManager.playClick();
    setIsZooming(true);
    // Wait for zoom animation
    setTimeout(() => {
        onComplete();
    }, 1500);
  };

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-[1500ms] ease-in-out ${isZooming ? 'scale-[5] opacity-0' : 'scale-100 opacity-100'}`}>
        
        {/* Moving Space Background */}
        <div className="absolute inset-0 bg-black overflow-hidden">
             {/* Deep space fog / nebula */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>

             {/* Stars Layer 1 (Slow/Distant) */}
             <div className="absolute inset-0 w-[200%] h-full flex animate-[space-drift_60s_linear_infinite]">
                <div className="w-full h-full relative">
                    {[...Array(50)].map((_, i) => (
                        <div key={`s1-${i}`} className="absolute bg-white rounded-full opacity-60" style={{
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '1px', height: '1px'
                        }} />
                    ))}
                </div>
                <div className="w-full h-full relative">
                    {[...Array(50)].map((_, i) => (
                        <div key={`s1-d-${i}`} className="absolute bg-white rounded-full opacity-60" style={{
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '1px', height: '1px'
                        }} />
                    ))}
                </div>
             </div>

             {/* Stars Layer 2 (Medium/Closer) */}
             <div className="absolute inset-0 w-[200%] h-full flex animate-[space-drift_30s_linear_infinite]">
                 <div className="w-full h-full relative">
                    {[...Array(30)].map((_, i) => (
                        <div key={`s2-${i}`} className="absolute bg-cyan-100 rounded-full opacity-80" style={{
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '2px', height: '2px'
                        }} />
                    ))}
                 </div>
                 <div className="w-full h-full relative">
                    {[...Array(30)].map((_, i) => (
                        <div key={`s2-d-${i}`} className="absolute bg-cyan-100 rounded-full opacity-80" style={{
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '2px', height: '2px'
                        }} />
                    ))}
                 </div>
             </div>
        </div>

        {/* Floating Crewmates in Space */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ejected Red Imposter */}
            <div className="absolute top-[15%] left-[10%] w-24 h-24 animate-[spin-slow_20s_linear_infinite] opacity-90 z-0">
                <Crewmate color="red" isImposter={true} />
            </div>
            
            {/* Drifting Blue Crewmate */}
            <div className="absolute bottom-[20%] right-[10%] w-20 h-20 animate-float opacity-80 z-0" style={{ animationDuration: '12s' }}>
                <Crewmate color="blue" hasCrown={true} style={{ transform: 'rotate(120deg)' }} />
            </div>

            {/* Drifting Green Crewmate */}
             <div className="absolute top-[60%] left-[20%] w-12 h-12 opacity-60 z-0 animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }}>
                <Crewmate color="green" style={{ transform: 'rotate(-60deg)' }} />
            </div>
            
             {/* Tiny Purple Crewmate far away */}
             <div className="absolute top-[30%] right-[30%] w-8 h-8 opacity-40 z-0" style={{ transform: 'rotate(45deg)' }}>
                <Crewmate color="purple" />
            </div>
        </div>

        {/* The Skeld Spaceship */}
        <div className="absolute top-1/2 left-1/2 w-[600px] md:w-[900px] -translate-x-1/2 -translate-y-1/2 animate-float cursor-pointer group z-10" onClick={handleEnter}>
             {/* Engine Trail Particles */}
             <div className="absolute top-[55%] left-10 w-80 h-32 bg-gradient-to-l from-blue-500/0 via-cyan-400/30 to-transparent blur-3xl transform -translate-x-1/2 -skew-x-12 animate-pulse"></div>

             {/* Detailed SVG Ship */}
             <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
                 <defs>
                    <linearGradient id="hullGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="20%" stopColor="#cbd5e1" />
                        <stop offset="50%" stopColor="#e2e8f0" />
                        <stop offset="80%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                         <stop offset="0%" stopColor="#475569" />
                         <stop offset="50%" stopColor="#64748b" />
                         <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <radialGradient id="engineGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                        <stop offset="70%" stopColor="#0891b2" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                 </defs>

                 {/* Rear Engines (Left) */}
                 <path d="M60,190 L130,170 L130,270 L60,250 C40,250 30,220 60,190 Z" fill="url(#metalGradient)" stroke="#1e293b" strokeWidth="2" />
                 <ellipse cx="60" cy="220" rx="15" ry="35" fill="url(#engineGlow)" className="animate-pulse" />
                 
                 {/* Secondary Engine (Bottom) */}
                 <path d="M180,310 L220,310 L220,340 L180,330 Z" fill="url(#metalGradient)" stroke="#1e293b" strokeWidth="2" />

                 {/* Main Hull Body */}
                 <path d="M130,150 L660,150 C730,150 770,190 770,230 C770,270 730,310 660,310 L130,310 C100,310 90,270 90,230 C90,190 100,150 130,150 Z" fill="url(#hullGradient)" stroke="#334155" strokeWidth="4" />
                 
                 {/* Top Structure (Upper Fin) */}
                 <path d="M220,150 L260,90 L520,90 L560,150 Z" fill="#64748b" stroke="#334155" strokeWidth="3" />
                 {/* Bottom Structure (Lower Fin) */}
                 <path d="M220,310 L260,370 L520,370 L560,310 Z" fill="#64748b" stroke="#334155" strokeWidth="3" />

                 {/* Panel Details / Plating Lines */}
                 <line x1="280" y1="150" x2="280" y2="310" stroke="#64748b" strokeWidth="2" />
                 <line x1="480" y1="150" x2="480" y2="310" stroke="#64748b" strokeWidth="2" />
                 <line x1="620" y1="150" x2="620" y2="310" stroke="#64748b" strokeWidth="2" />
                 
                 {/* Horizontal Detail Stripe */}
                 <path d="M130,230 L660,230" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" opacity="0.5" />

                 {/* Cockpit Window */}
                 <path d="M650,200 L690,200 C700,200 710,210 710,230 C710,250 700,260 690,260 L650,260 C630,260 620,250 620,230 C620,210 630,200 650,200 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="3" filter="url(#glow)">
                     <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                 </path>
                 <ellipse cx="690" cy="220" rx="12" ry="6" fill="white" opacity="0.6" />
                 <ellipse cx="640" cy="240" rx="5" ry="3" fill="white" opacity="0.4" />

                 {/* Weapons/Turret bump top */}
                 <path d="M370,150 L390,130 L430,130 L450,150" fill="#475569" stroke="#1e293b" strokeWidth="2" />
                 <circle cx="410" cy="130" r="5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />

                 {/* Running Lights */}
                 <circle cx="160" cy="230" r="6" fill="#ef4444" className="animate-ping" style={{ animationDuration: '2s' }} />
                 <circle cx="160" cy="230" r="3" fill="#ffaaaa" />
                 
                 <circle cx="750" cy="230" r="3" fill="#ffffff" className="animate-pulse" />
                 
                 {/* Mechanical greebles */}
                 <rect x="300" y="200" width="40" height="20" rx="2" fill="#64748b" opacity="0.5" />
                 <rect x="520" y="240" width="40" height="20" rx="2" fill="#64748b" opacity="0.5" />

             </svg>

             {/* Click Prompt */}
             <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity group-hover:opacity-100 opacity-90">
                 <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-900/40 backdrop-blur-sm animate-bounce shadow-[0_0_20px_#22d3ee]">
                    <ArrowRight className="w-8 h-8 text-cyan-400" />
                 </div>
                 <span className="text-cyan-400 font-gaming text-xl tracking-widest text-shadow-neon uppercase bg-black/50 px-4 py-1 rounded">Initiate Docking</span>
             </div>
        </div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

    </div>
  );
};

export default IntroScreen;