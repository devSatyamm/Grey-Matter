import React, { useState } from 'react';
import SpaceBackground from './components/SpaceBackground';
import SpaceshipInterior from './components/SpaceshipInterior';
import GameLobby from './components/GameLobby';
import IntroScreen from './components/IntroScreen';

type GameState = 'intro' | 'login' | 'game';

function App() {
  const [gameState, setGameState] = useState<GameState>('intro');

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {gameState === 'intro' && (
        <IntroScreen onComplete={() => setGameState('login')} />
      )}

      {gameState === 'login' && (
        <>
            {/* Top Section: Space */}
            <div className="animate-fade-in">
                 <SpaceBackground />
            </div>

            {/* Bottom Section: Spaceship Interior & Form */}
            <SpaceshipInterior onLogin={() => setGameState('game')} />
        </>
      )}

      {gameState === 'game' && (
        <div className="animate-fade-in-slow">
            <GameLobby />
        </div>
      )}
      
      <style>{`
        .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-slow {
            animation: fadeIn 2s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;