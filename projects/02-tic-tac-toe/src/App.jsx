import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner, chechEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';




function App() {
  // Inicializamos el tablero (si existe en localStorage lo usamos, si no, creamos un tablero vacío)
  const [board, setBoard] = useState(() => {
    const getBoardFromStorage = window.localStorage.getItem('board');
    return getBoardFromStorage ? JSON.parse(getBoardFromStorage) : Array(9).fill(null);
  });

  // lo mismo para el turno, si existe en localStorage lo usamos, si no, iniciamos con TURNS.x
  const [turn, setTurn] = useState(() => {
    const getTurnFromStorage = window.localStorage.getItem('turn');
    return getTurnFromStorage ?? TURNS.x;
  });

  
  const [winner, setWinner] = useState(null);               // null === no hay ganador, false === empate

  

  const updateBoard = (index) => {
    if (board[index] || winner ) return;
    const newBoard = [...board];
    newBoard[index] = turn;                                 // hacemos una copia del tablero
    setBoard(newBoard);                                     // actualizamos el tablero con el nuevo valor

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;   // cambiamos el turno (si es x pasa a o y viceversa)
    setTurn(newTurn);  

    // guardar aqui la partida en localStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);
    
    const newWinner = checkWinner(newBoard); 
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (chechEndGame(newBoard)) {
      setWinner(false); // Empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  return (
    <main className="board">
      <h1> Juego de Gato </h1>
      <button onClick={resetGame}> Reiniciar el juego </button>
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

      <WinnerModal resetGame={resetGame} winner={winner} /> 
    </main>
  )
}

export default App 
