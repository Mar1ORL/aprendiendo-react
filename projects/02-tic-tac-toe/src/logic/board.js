import { WINNER_COMBOS } from "../constants.js";

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // retorna 'x' u 'o'
    }
  }
  return null; // no hay ganador
};

export const chechEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
