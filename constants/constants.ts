export const Y_LENGTH = 6;
export const X_LENGTH = 7;
export const TIMER_INITIAL = 15;
//the minimum row index that needs to be filled to have at least 4 filled boxes
export const MINIMUM_ROW = Y_LENGTH - 4;
//win types
export const ROW_WIN = "row";
export const COLUMN_WIN = "column";
export const DIAG_LEFT_WIN = "diag-left";
export const DIAG_RIGHT_WIN = "diag-right";

export const RULES = [
  {
    heading: "Objective",
    explanation:
      "Be the first player to connect 4 of the same colored boxes in a row.",
  },
  {
    heading: "Valid Ways",
    explanation:
      "You will win by connecting 4, either vertically, horizontally, or diagonally.",
  },
  {
    heading: "Full Explanation",
    explanation:
      "In this 2-Player game, the first player will use color red while the second will use color yellow and they will alternate turns. You can place your color in an empty box as long as the time of your turn isn't over. If the timer reaches 0, the player will miss the turn. The player cannot freely choose a box, since the columns will be filled from bottom to top, as if you were pouring water in a bottle, therefore you cannot fill an empty box that doesn't have a filled box below. To paint an empty box you can simply click on any empty box and the game will automatially paint the corresponding box from that column. Have fun!",
  },
];
