import React from 'react';

interface CrewmateProps {
  color: string;
  isImposter?: boolean;
  hasCrown?: boolean;
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}

const Crewmate: React.FC<CrewmateProps> = ({ color, isImposter, hasCrown, className, style, flip }) => {
  const getColorFill = (c: string) => {
    switch(c) {
      case 'red': return '#C51111';
      case 'blue': return '#132ED1';
      case 'green': return '#117F2D';
      case 'purple': return '#6B31BC';
      case 'orange': return '#F07D0D';
      case 'cyan': return '#38FEDC';
      default: return c;
    }
  };

  const getShadowFill = (c: string) => {
    switch(c) {
      case 'red': return '#7A0838';
      case 'blue': return '#09158E';
      case 'green': return '#0A4D2E';
      case 'purple': return '#3C177F';
      case 'orange': return '#B33E15';
      case 'cyan': return '#24A8BE';
      default: return '#333';
    }
  };

  const fill = getColorFill(color);
  const shadow = getShadowFill(color);

  return (
    <div className={`relative ${className}`} style={style}>
      <svg
        viewBox="0 0 100 125"
        className="w-full h-full drop-shadow-2xl"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      >
        {/* Backpack */}
        <path d="M15,40 H30 V85 H15 A5,5 0 0 1 10,80 V45 A5,5 0 0 1 15,40" fill={fill} stroke="black" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Body Main */}
        <rect x="25" y="25" width="50" height="75" rx="20" fill={fill} stroke="black" strokeWidth="4" strokeLinejoin="round"/>
        
        {/* Legs split */}
        <line x1="50" y1="75" x2="50" y2="100" stroke="black" strokeWidth="4" strokeLinecap="round" />
        
        {/* Shadow area */}
        <path d="M30 80 Q 50 85 70 80 L 70 90 Q 50 100 30 90 Z" fill={shadow} opacity="0.5" />

        {/* Visor */}
        <ellipse cx="65" cy="45" rx="18" ry="12" fill="#91D4E0" stroke="black" strokeWidth="4" />
        <ellipse cx="70" cy="42" rx="8" ry="4" fill="white" opacity="0.7" />

        {/* Imposter Teeth (if imposter) */}
        {isImposter && (
             <path d="M 60 65 L 65 75 L 70 65" fill="white" stroke="black" strokeWidth="2" />
        )}
      </svg>
      
      {/* Crown Accessory */}
      {hasCrown && (
        <div className="absolute -top-[20%] left-[25%] w-[50%] h-[40%]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,80 L20,30 L40,60 L60,20 L80,60 L90,30 L100,80 Z" fill="#FFD700" stroke="black" strokeWidth="3" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Crewmate;