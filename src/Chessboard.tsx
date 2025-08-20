import React, { useState } from 'react';
import { piecesInitial, getPieceUnicode, isValidMove } from './chessUtils';
import { Move } from './App';

interface ChessboardProps {
  moveHistory: Move[];
  setMoveHistory: (moves: Move[]) => void;
}

const files = ['a','b','c','d','e','f','g','h'];
const ranks = [8,7,6,5,4,3,2,1];

const Chessboard: React.FC<ChessboardProps> = ({ moveHistory, setMoveHistory }) => {
  const [pieces, setPieces] = useState(piecesInitial());
  const [selected, setSelected] = useState<string | null>(null);
  const [playerTurn, setPlayerTurn] = useState<'w'|'b'>('w');

  function handleSquareClick(square: string) {
    if (selected) {
      // Try to move piece from selected to square
      const piece = pieces[selected];
      if (
        piece &&
        piece[0] === playerTurn &&
        isValidMove(pieces, selected, square, playerTurn)
      ) {
        // Handle capture
        const captured = pieces[square];
        const updatedPieces = { ...pieces, [square]: piece };
        delete updatedPieces[selected];

        setPieces(updatedPieces);
        setMoveHistory([
          ...moveHistory,
          { from: selected, to: square, piece, captured },
        ]);
        setSelected(null);
        setPlayerTurn(playerTurn === 'w' ? 'b' : 'w');
      } else {
        setSelected(null);
      }
    } else if (pieces[square] && pieces[square][0] === playerTurn) {
      setSelected(square);
    }
  }

  return (
    <div className="chessboard">
      <div className="board-labels top-labels">
        {files.map((f) => (
          <div key={f} className="file-label">{f.toUpperCase()}</div>
        ))}
      </div>
      {ranks.map((rank, i) => (
        <div className="board-row" key={rank}>
          <div className="rank-label">{rank}</div>
          {files.map((file, j) => {
            const square = file + rank;
            const piece = pieces[square];
            const isSelected = selected === square;
            return (
              <div
                key={square}
                className={`board-square ${((i+j)%2===0) ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSquareClick(square)}
              >
                {piece && (
                  <span className={`chess-piece ${piece[0]==='w'?'white':'black'}`}>
                    {getPieceUnicode(piece)}
                  </span>
                )}
                <span className="square-label">{square}</span>
              </div>
            );
          })}
        </div>
      ))}
      <div className="board-labels bottom-labels">
        {files.map((f) => (
          <div key={f} className="file-label">{f.toUpperCase()}</div>
        ))}
      </div>
    </div>
  );
};

export default Chessboard;