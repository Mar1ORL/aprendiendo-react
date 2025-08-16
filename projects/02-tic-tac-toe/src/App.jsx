import { useState } from 'react';
import './App.css'
import { use } from 'react';

// Turnos 
const TURNS = {
  x: 'x',
  o: 'o',
};

// Combinaciones ganadoras
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Componente para representar cada cuadrado del tablero (arrow function)
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);               // null === no hay ganador, false === empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];  // retorna 'x' u 'o'      
      }
    }
    return null;                // no hay ganador
  }

  const updateBoard = (index) => {
    if (board[index] || winner ) return;
    const newBoard = [...board];
    newBoard[index] = turn;                                 // hacemos una copia del tablero
    setBoard(newBoard);                                     // actualizamos el tablero con el nuevo valor

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;   // cambiamos el turno (si es x pasa a o y viceversa)
    setTurn(newTurn);  
    
    const newWinner = checkWinner(newBoard); 
    if (newWinner) {
      setWinner(newWinner);
    } else if (newBoard.every(square => square !== null)) {
      setWinner(false); // Empate
    }
  }

  return (
    <main className="board">
      <h1> Juego de Gato </h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>

        <Square isSelected={turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>
    </main>
  )
}

export default App 
