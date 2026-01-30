import React, { useEffect, useState, useRef } from 'react';
import Crewmate from './Crewmate';
import { soundManager } from '../utils/SoundManager';

interface Entity {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  isImposter: boolean;
  scale: number;
  hasCrown?: boolean;
  isPlayer?: boolean;
}

const COLORS = ['red', 'blue', 'green', 'purple', 'orange', 'cyan', 'white', 'yellow', 'pink'];

const GameLobby: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const keysPressed = useRef<Set<string>>(new Set());
  const playerRef = useRef<Entity | null>(null);

  // Initialize entities
  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create Player
    const player: Entity = {
        id: 999,
        x: width / 2,
        y: height / 2,
        vx: 0,
        vy: 0,
        color: 'cyan',
        isImposter: false,
        scale: 1,
        hasCrown: true,
        isPlayer: true
    };
    playerRef.current = player;

    // Create NPCs
    const npcs = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * (width - 100),
      y: Math.random() * (height - 100),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      color: COLORS[i % COLORS.length],
      isImposter: i === 0, 
      scale: 0.8 + Math.random() * 0.2,
      hasCrown: false
    }));

    setEntities([player, ...npcs]);
    soundManager.playLoginSuccess();
  }, []);

  // Input Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        keysPressed.current.add(e.key.toLowerCase());
    };
    const handleKeyUp = (e: KeyboardEvent) => {
        keysPressed.current.delete(e.key.toLowerCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastStepTime = 0;

    const update = (timestamp: number) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const speed = 6;

      // Update Player Velocity based on Input
      let pVx = 0;
      let pVy = 0;
      if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) pVy -= speed;
      if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) pVy += speed;
      if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) pVx -= speed;
      if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) pVx += speed;

      // Play step sound if moving
      if ((pVx !== 0 || pVy !== 0) && timestamp - lastStepTime > 300) {
        soundManager.playKeystroke(); // Using keystroke as a step sound placeholder
        lastStepTime = timestamp;
      }

      setEntities(prev => prev.map(entity => {
        let { x, y, vx, vy, isPlayer } = entity;

        if (isPlayer) {
            vx = pVx;
            vy = pVy;
        } else {
             // NPC Random Movement logic
             if (Math.random() < 0.02) {
                vx = (Math.random() - 0.5) * 4;
                vy = (Math.random() - 0.5) * 4;
            }
        }

        x += vx;
        y += vy;

        // Boundary Checks
        if (x <= 0) { x = 0; vx = isPlayer ? 0 : Math.abs(vx); }
        if (x >= clientWidth - 80) { x = clientWidth - 80; vx = isPlayer ? 0 : -Math.abs(vx); }
        
        if (y <= 0) { y = 0; vy = isPlayer ? 0 : Math.abs(vy); }
        if (y >= clientHeight - 100) { y = clientHeight - 100; vy = isPlayer ? 0 : -Math.abs(vy); }

        return { ...entity, x, y, vx, vy };
      }));

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const sortedEntities = [...entities].sort((a, b) => a.y - b.y);

  return (
    <div ref={containerRef} className="w-full h-screen relative overflow-hidden skeld-floor shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] cursor-crosshair">
       
       {/* HUD / UI Overlay */}
       <div className="absolute top-0 left-0 w-full p-4 flex justify-between z-50 pointer-events-none">
            <div className="bg-green-700/80 border-2 border-black px-4 py-2 rounded shadow-lg text-white font-gaming text-stroke-sm">
                Tasks Completed
                <div className="w-48 h-4 bg-gray-800 border-2 border-white mt-1 rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-green-400"></div>
                </div>
            </div>
            
            <div className="flex gap-2 pointer-events-auto">
                 <button onClick={() => soundManager.playClick()} className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full border-2 border-slate-400 flex items-center justify-center transition-colors">
                    <span className="text-white font-bold text-xl">S</span>
                 </button>
                 <button onClick={() => soundManager.playClick()} className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full border-2 border-slate-400 flex items-center justify-center transition-colors">
                    <span className="text-white font-bold text-xl">⚙</span>
                 </button>
            </div>
       </div>

       {/* Instruction Overlay for controls */}
       <div className="absolute top-20 left-4 z-40 opacity-70 pointer-events-none">
            <div className="text-white font-mono text-xs bg-black/50 p-2 rounded border border-white/20">
                <p>CONTROLS:</p>
                <p>WASD / ARROWS to Move</p>
            </div>
       </div>

      {/* Background Objects (Cafeteria Table) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-gray-400 rounded-full border-[6px] border-black relative flex items-center justify-center shadow-xl">
               <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-300 rounded-full border-4 border-gray-500 flex items-center justify-center">
                   {/* Emergency Button */}
                   <div 
                        onClick={() => soundManager.playClick()}
                        className="w-20 h-20 bg-red-600 rounded-full border-4 border-red-800 cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,0,0,0.5)] z-10 group"
                    >
                        <div className="w-full h-full rounded-full border-t-[10px] border-red-400/50"></div>
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200/30 rounded-full border-4 border-blue-300/50 transform rotate-45 pointer-events-none group-hover:rotate-12 transition-transform origin-bottom-left"></div>
                   </div>
               </div>
          </div>
      </div>

      {/* Render Entities */}
      {sortedEntities.map(entity => (
        <div
            key={entity.id}
            className={`absolute transition-transform duration-75 ease-linear will-change-transform ${entity.isPlayer ? 'z-50' : ''}`}
            style={{
                transform: `translate(${entity.x}px, ${entity.y}px)`,
                zIndex: Math.floor(entity.y), 
                width: `${80 * entity.scale}px`,
                height: `${100 * entity.scale}px`
            }}
        >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                 <span className={`font-bold text-lg ${entity.isImposter ? 'text-red-500' : 'text-white'} text-stroke-sm`}>
                    {entity.isPlayer ? 'YOU' : (entity.isImposter ? 'Impostor' : `Player ${entity.id + 1}`)}
                 </span>
            </div>
            
            <Crewmate 
                color={entity.color} 
                isImposter={entity.isImposter} 
                hasCrown={entity.hasCrown}
                flip={entity.vx < 0}
            />
        </div>
      ))}

      {/* Action Buttons */}
      <div className="absolute bottom-10 right-10 z-50 flex flex-col items-center gap-4">
           <button 
                className="w-24 h-24 bg-transparent border-4 border-white rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
            >
                <span className="font-gaming text-white text-lg">USE</span>
           </button>
           <button 
                className="w-28 h-28 bg-red-500/20 border-4 border-red-500 rounded-full flex items-center justify-center hover:bg-red-500/40 active:bg-red-500/60 transition-colors animate-pulse"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => { soundManager.playClick(); alert('Dead body reported!'); }}
           >
                <span className="font-gaming text-white text-lg">REPORT</span>
           </button>
      </div>

    </div>
  );
};

export default GameLobby;