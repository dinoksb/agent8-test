import { useEffect, useRef } from "react";
import "./App.css";
import Phaser from "phaser";
import { MainScene } from "./game/scenes/MainScene";

function App() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [MainScene]
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-4">2D RPG Game</h1>
      <div className="border-4 border-gray-700 rounded-lg overflow-hidden">
        <div id="game-container"></div>
      </div>
      <div className="mt-4 text-white">
        <p>Use arrow keys to move the character</p>
      </div>
    </div>
  );
}

export default App;
