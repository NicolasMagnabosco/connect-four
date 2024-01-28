export type BoxColor = null | "red" | "yellow";
export type Turn = "red" | "yellow";
export interface BoxInfo {
  x: number;
  y: number;
  color: BoxColor;
}
export type Board = Array<Array<BoxColor>>;

import {
  DIAG_LEFT_WIN,
  DIAG_RIGHT_WIN,
  ROW_WIN,
  COLUMN_WIN,
} from "../constants/constants";
export type WinType =
  | typeof DIAG_LEFT_WIN
  | typeof DIAG_RIGHT_WIN
  | typeof ROW_WIN
  | typeof COLUMN_WIN;

export interface WinnerBox {
  x: number;
  y: number;
}
export interface Win {
  isWin: boolean;
  winType: WinType | "";
  winnerColor: BoxColor | "";
  winnerBoxes: Array<WinnerBox>;
}

export interface ConnectFourCtxInt {
  board: Array<Array<BoxColor | null>>;
  updateBox: (x: number) => void;
  resetBoard: () => void;
  win: Win;
  turn: Turn;
  remainingTime: number;
  isTimeOver: boolean;
  resetTimer: () => void;
}

export interface ScoreCtxInt {
  redScore: number;
  yellowScore: number;
  increaseScore: (color: BoxColor) => void;
  resetScore: () => void;
}
