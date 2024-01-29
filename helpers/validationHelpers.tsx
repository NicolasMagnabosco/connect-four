import { WinnerBox, BoxInfo, Board } from "@/types/types";
import { MINIMUM_ROW, Y_LENGTH, X_LENGTH } from "@/constants/constants";

export const checkColumn = (
  updatedBox: BoxInfo,
  board: Board
): Array<WinnerBox> | null => {
  const { x, y, color } = updatedBox as BoxInfo;
  let winnerBoxes = [];
  //if false, there aren't enough filled boxes to check(at least 4)
  if (board[MINIMUM_ROW][x]) {
    for (let i = y; i < y + 4; i++) {
      if (i >= 0 && i < Y_LENGTH) {
        if (board[i][x] === color) winnerBoxes.push({ x: x, y: i });
        else winnerBoxes = [];
      }
    }
    if (winnerBoxes.length < 4) return null;
    else return winnerBoxes;
  } else return null;
};

export const checkRow = (
  updatedBox: BoxInfo,
  board: Board
): Array<WinnerBox> | null => {
  const { y, color } = updatedBox as BoxInfo;
  let winnerBoxes = [];
  let x = 0;
  while (x < X_LENGTH && winnerBoxes.length < 4) {
    if (board[y][x] === color) winnerBoxes.push({ x: x, y: y });
    else winnerBoxes = [];
    x++;
  }
  if (winnerBoxes.length < 4) return null;
  else return winnerBoxes;
};

export const checkDiagRight = (
  updatedBox: BoxInfo,
  board: Board
): Array<WinnerBox> | null => {
  const { x, y, color } = updatedBox as BoxInfo;
  let currentX = x;
  let currentY = y;
  let winnerBoxes = [];
  while (currentX >= 0 && currentY < Y_LENGTH && winnerBoxes.length < 4) {
    if (board[currentY][currentX] === color)
      winnerBoxes.push({ x: currentX, y: currentY });
    else winnerBoxes = [];
    currentX--;
    currentY++;
  }
  if (winnerBoxes.length < 4) {
    currentX = x;
    currentY = y;
    winnerBoxes = [];
    while (currentY >= 0 && currentX < X_LENGTH && winnerBoxes.length < 4) {
      if (board[currentY][currentX] === color)
        winnerBoxes.push({ x: currentX, y: currentY });
      else winnerBoxes = [];
      currentX++;
      currentY--;
    }
    if (winnerBoxes.length < 4) return null;
    else return winnerBoxes;
  } else return winnerBoxes;
};

export const checkDiagLeft = (
  updatedBox: BoxInfo,
  board: Board
): Array<WinnerBox> | null => {
  const { x, y, color } = updatedBox as BoxInfo;
  let currentX = x;
  let currentY = y;
  let winnerBoxes = [];
  while (currentX >= 0 && currentY >= 0 && winnerBoxes.length < 4) {
    if (board[currentY][currentX] === color)
      winnerBoxes.push({ x: currentX, y: currentY });
    else winnerBoxes = [];
    currentX--;
    currentY--;
  }
  if (winnerBoxes.length < 4) {
    currentX = x;
    currentY = y;
    winnerBoxes = [];
    while (
      currentY < Y_LENGTH &&
      currentX < X_LENGTH &&
      winnerBoxes.length < 4
    ) {
      if (board[currentY][currentX] === color)
        winnerBoxes.push({ x: currentX, y: currentY });
      else winnerBoxes = [];
      currentX++;
      currentY++;
    }
    if (winnerBoxes.length < 4) return null;
    else return winnerBoxes;
  } else return winnerBoxes;
};
