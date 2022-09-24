import { useState, useCallback } from "react";

export default function useGame() {
  const [nextPlayerBlack, setNextPlayerBlack] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([
    {
      step: 0,
      move: null,
      board: Array(19).fill(Array(19).fill(null)),
    },
  ]);
  const [winningLine, setWinningLine] = useState(false);

  const handleSquareClick = (clickedRow, clickedColumn) => {
    if (history[currentStep].board[clickedRow][clickedColumn] || winningLine)
      return;

    const currentHistory = history.slice(0, currentStep + 1);

    const newBoard = currentHistory[currentHistory.length - 1].board.map(
      (row, currentRow) => {
        if (currentRow !== clickedRow) return row;

        return row.map((column, currentColumn) => {
          if (currentColumn !== clickedColumn) return column;

          return nextPlayerBlack ? "black" : "white";
        });
      }
    );

    setHistory([
      ...currentHistory,
      {
        step: currentStep + 1,
        board: newBoard,
        move: [clickedRow, clickedColumn],
      },
    ]);

    if (currentStep >= 8) {
      const winningLine = checkWinningLine(clickedRow, clickedColumn, newBoard);

      if (winningLine) {
        setWinningLine(winningLine);
        setCurrentStep((prevstate) => prevstate + 1);
        return;
      }
    }

    setNextPlayerBlack((prevState) => !prevState);
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleJumpToStep = useCallback(
    (step) => {
      setCurrentStep(step);
      if (step === history.length - 1) {
        const winningLine = checkWinningLine(
          history[step].move[0],
          history[step].move[1],
          history[step].board
        );

        if (winningLine) {
          setWinningLine(winningLine);
          setNextPlayerBlack(step % 2 !== 0);
          return;
        }
      }

      setWinningLine(false);
      setNextPlayerBlack(step % 2 === 0);
    },
    [history]
  );

  const handleRestartClick = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    history,
    currentStep,
    nextPlayerBlack,
    winningLine,
    handleSquareClick,
    handleJumpToStep,
    handleRestartClick,
  };
}

const checkWinningLine = (row, column, board) => {
  const direction = [
    [1, 0, -1, 0],
    [0, 1, 0, -1],
    [-1, -1, 1, 1],
    [-1, 1, 1, -1],
  ];
  let winningLine = false;

  let i = 0;

  while (!winningLine && i <= 3) {
    const line = countConsecutivePieces(
      row,
      column,
      direction[i][0],
      direction[i][1],
      board
    ).concat(
      countConsecutivePieces(
        row,
        column,
        direction[i][2],
        direction[i][3],
        board
      )
    );

    if (line.length > 5) {
      winningLine = line;
    } else {
      i++;
    }
  }

  return winningLine;
};

const countConsecutivePieces = (
  row,
  column,
  directionRow,
  directionColumn,
  board
) => {
  const player = board[row][column];
  let winningPieces = [];
  let tempRow = row;
  let tempColumn = column;

  while (
    tempRow >= 0 &&
    tempColumn >= 0 &&
    tempRow < 19 &&
    tempColumn < 19 &&
    board[tempRow][tempColumn] === player
  ) {
    winningPieces.push([tempRow, tempColumn]);
    tempRow += directionRow;
    tempColumn += directionColumn;
  }
  return winningPieces;
};
