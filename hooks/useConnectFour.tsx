import { useState, useEffect } from "react";
import {
  BoxColor,
  BoxInfo,
  Win,
  WinType,
  WinnerBox,
  Turn,
} from "../types/types";
import {
  COLUMN_WIN,
  DIAG_LEFT_WIN,
  DIAG_RIGHT_WIN,
  X_LENGTH,
  Y_LENGTH,
  MINIMUM_ROW,
  ROW_WIN,
} from "@/constants/constants";
import useTimer from "./useTimer";

export default function useConnectFour() {
  const [board, setBoard] = useState<Array<Array<BoxColor>>>(
    Array.from({ length: Y_LENGTH }, () =>
      Array.from({ length: X_LENGTH }, () => null)
    )
  );

  const [turn, setTurn] = useState<Turn>("red");
  const [win, setWin] = useState<Win>({
    isWin: false,
    winType: "",
    winnerColor: "",
    winnerBoxes: [],
  });
  const [updatedBox, setUpdatedBox] = useState<BoxInfo | null>(null);

  const { remainingTime, isTimeOver, resetTimer } = useTimer();

  const checkColumn = (): Array<WinnerBox> | null => {
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

  const checkRow = (): Array<WinnerBox> | null => {
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

  const checkDiagRight = (): Array<WinnerBox> | null => {
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

  const checkDiagLeft = (): Array<WinnerBox> | null => {
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

  useEffect(() => {
    if (updatedBox)
      setBoard((b) => {
        let newBoard = JSON.parse(JSON.stringify(board));
        newBoard[updatedBox.y][updatedBox.x] = updatedBox.color;
        return newBoard;
      });
  }, [updatedBox]);

  useEffect(() => {
    const validateWin = () => {
      if (updatedBox) {
        let winType: WinType | null = null;
        let winnerBoxes: Array<WinnerBox> | null = null;
        winnerBoxes = checkColumn();
        if (winnerBoxes) winType = COLUMN_WIN;
        else {
          winnerBoxes = checkRow();
          if (winnerBoxes) winType = ROW_WIN;
          else {
            winnerBoxes = checkDiagRight();
            if (winnerBoxes) winType = DIAG_RIGHT_WIN;
            else {
              winnerBoxes = checkDiagLeft();
              if (winnerBoxes) winType = DIAG_LEFT_WIN;
            }
          }
        }
        if (winnerBoxes && winType)
          setWin({
            isWin: true,
            winType: winType,
            winnerColor: updatedBox.color,
            winnerBoxes: winnerBoxes,
          });
      }
    };

    //if a there is an updated box, i validate and change turn, otherwise, the board was reset
    if (updatedBox) {
      validateWin();
      setTurn((t) => {
        const newTurn = t === "red" ? "yellow" : "red";
        return newTurn;
      });
    } else setTurn("red");
    resetTimer();
  }, [board]);

  useEffect(() => {
    if (isTimeOver) {
      setTurn((t) => {
        const newTurn = t === "red" ? "yellow" : "red";
        return newTurn;
      });
      resetTimer();
    }
  }, [isTimeOver]);

  const updateBox = (x: number) => {
    let y = Y_LENGTH - 1;
    while (y >= 0 && board[y][x]) {
      y--;
    }
    if (y >= 0) {
      const newColor = turn;
      setUpdatedBox({ x: x, y: y, color: newColor });
    }
  };

  const resetBoard = () => {
    setWin({
      isWin: false,
      winType: "",
      winnerColor: "",
      winnerBoxes: [],
    });
    setTurn("red");
    setUpdatedBox(null);
    setBoard((b) => b.map((r) => r.map(() => null)));
  };

  return {
    board,
    turn,
    updateBox,
    resetBoard,
    win,
    remainingTime,
    isTimeOver,
    resetTimer,
  };
}
