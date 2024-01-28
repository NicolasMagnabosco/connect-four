import { useState, useEffect } from "react";
import {
  checkColumn,
  checkDiagLeft,
  checkDiagRight,
  checkRow,
} from "@/utils/validationUtils";

import {
  BoxColor,
  BoxInfo,
  Win,
  WinType,
  WinnerBox,
  Turn,
  Board,
} from "../types/types";
import {
  COLUMN_WIN,
  DIAG_LEFT_WIN,
  DIAG_RIGHT_WIN,
  X_LENGTH,
  Y_LENGTH,
  ROW_WIN,
} from "@/constants/constants";
import useTimer from "./useTimer";

export default function useConnectFour() {
  //due to a mistake, the order of the board array is [Y,X], but the axis of each one remains normal
  // X= horizontal, Y= vertical, but the way to access a box is flipped from the traditional [X,Y]
  const [board, setBoard] = useState<Board>(
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

  //box updated in last turn
  const [updatedBox, setUpdatedBox] = useState<BoxInfo | null>(null);

  const { remainingTime, isTimeOver, resetTimer } = useTimer();

  useEffect(() => {
    const validateWin = () => {
      if (updatedBox) {
        let winType: WinType | null = null;
        let winnerBoxes: Array<WinnerBox> | null = null;
        winnerBoxes = checkColumn(updatedBox, board);
        if (winnerBoxes) winType = COLUMN_WIN;
        else {
          winnerBoxes = checkRow(updatedBox, board);
          if (winnerBoxes) winType = ROW_WIN;
          else {
            winnerBoxes = checkDiagRight(updatedBox, board);
            if (winnerBoxes) winType = DIAG_RIGHT_WIN;
            else {
              winnerBoxes = checkDiagLeft(updatedBox, board);
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

  //checks whether there is a blank box in current Y axis to be filled and updates the board
  const updateBox = (x: number) => {
    let y = Y_LENGTH - 1; // get the Y axis bottom index (0..[5])
    while (y >= 0 && board[y][x]) {
      y--; //if the box is painted, then checks the one above
    }
    if (y >= 0) {
      const newColor = turn;
      setUpdatedBox({ x: x, y: y, color: newColor });
      setBoard((b) => {
        let newBoard = JSON.parse(JSON.stringify(b));
        newBoard[y][x] = newColor;
        return newBoard;
      });
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
