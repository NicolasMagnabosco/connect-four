import {
  useState,
  useEffect,
  useContext,
  FocusEvent,
  KeyboardEvent,
} from "react";
import { BoxColor, ConnectFourCtxInt, ScoreCtxInt } from "@/types/types";
import styles from "./Box.module.css";
import { ConnectFourCtx } from "@/components/contexts/ConectFourProvider";
import { ScoreCtx } from "@/components/contexts/ScoreProvider";
export default function Box({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: BoxColor;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false); //to handle tab nav styling
  const [isWinnerBox, setIsWinnerBox] = useState<boolean>(false);

  const {
    updateBox,
    win: { winnerBoxes, isWin },
  } = useContext(ConnectFourCtx) as ConnectFourCtxInt;

  useEffect(() => {
    if (isWin) {
      for (let i = 0; i < 4; i++) {
        if (winnerBoxes[i].x === x && winnerBoxes[i].y === y)
          setIsWinnerBox(true);
      }
    } else if (isWinnerBox) setIsWinnerBox(false);
  }, [winnerBoxes]);

  const handleClick = () => {
    if (!isWin) {
      updateBox(x);
    }
  };

  const handleTab = (ev: KeyboardEvent<HTMLButtonElement>) => {
    if (ev.key === "Tab") setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <button
      onKeyUp={handleTab}
      onBlur={handleBlur}
      onClick={handleClick}
      className={`${styles.box} ${isWinnerBox ? styles.winner : ""} ${
        isFocused ? styles.focused : ""
      }`}
    >
      <div
        className={`${styles["inner-box"]}  ${
          color === "red" ? styles.red : color === "yellow" && styles.yellow
        } `}
      ></div>
    </button>
  );
}
