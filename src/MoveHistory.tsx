import React from 'react';
import { Move } from './App';

interface MoveHistoryProps {
  moves: Move[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => (
  <div className="move-history">
    <h2>Move History</h2>
    <ol>
      {moves.map((move, idx) => (
        <li key={idx}>
          <span>{move.piece}: {move.from} → {move.to}</span>
          {move.captured && <span className="capture"> (captured {move.captured})</span>}
        </li>
      ))}
    </ol>
  </div>
);

export default MoveHistory;