import React from 'react';
import Crewmate from './Crewmate';

const SpaceBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-[50%] bg-black overflow-hidden z-0">
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-80 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Floating Elements - Subtle */}
      <Crewmate 
        color="purple" 
        className="absolute top-[10%] left-[5%] w-16 h-16 animate-float z-0 opacity-40 blur-[1px]" 
        style={{ transform: 'rotate(45deg)' }}
      />
      
      {/* Header Section */}
      <div className="absolute top-[15%] w-full flex flex-col items-center z-20">
        {/* Main Title - Cyan Neon Glow */}
        <h1 className="font-gaming text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 to-cyan-500 tracking-widest drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" style={{ textShadow: '0 0 20px rgba(6,182,212,0.8)' }}>
          AMONG US
        </h1>
        
        {/* Secure Login Box */}
        <div className="mt-4 border-2 border-yellow-600/60 bg-black/50 px-8 py-1 relative">
            <span className="text-yellow-500 font-gaming text-xl md:text-2xl tracking-[0.5em] uppercase">
                Secure Login
            </span>
            {/* Box corners decorations */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-500"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-yellow-500"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-yellow-500"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-500"></div>
        </div>
      </div>

       {/* Connection Line decoration */}
       <div className="absolute bottom-10 right-[20%] w-[1px] h-20 bg-gradient-to-t from-white/20 to-transparent rotate-12"></div>
       <div className="absolute bottom-12 right-[19.8%] w-1 h-1 bg-white rounded-full animate-ping"></div>

    </div>
  );
};

export default SpaceBackground;