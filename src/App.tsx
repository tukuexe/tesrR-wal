import React, { useState } from 'react';
import Chessboard from './Chessboard';
import MoveHistory from './MoveHistory';

export type Move = {
  from: string;
  to: string;
  piece: string;
  captured?: string;
};

const App: React.FC = () => {
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

  return (
    <div className="app-container">
      <header>
        <h1>Chess Duel (Offline)</h1>
        <MoveHistory moves={moveHistory} />
      </header>
      <main>
        <Chessboard moveHistory={moveHistory} setMoveHistory={setMoveHistory} />
      </main>
      <footer>
        <p>
          Play offline on browser or install as PWA. Download and run locally for terminal access!
        </p>
      </footer>
    </div>
  );
};

export default App;