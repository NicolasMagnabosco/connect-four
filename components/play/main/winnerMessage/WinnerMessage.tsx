import { ConnectFourCtx } from "@/components/contexts/ConectFourProvider";
import { ConnectFourCtxInt } from "@/types/types";
import { useContext } from "react";
import styles from "./WinnerMessage.module.css";

export default function WinnerMessage({
  resetBoard,
}: {
  resetBoard: () => void;
}) {
  const {
    win: { winnerColor, winType },
  } = useContext(ConnectFourCtx) as ConnectFourCtxInt;
  return (
    <div
      className={`${styles.container} ${
        winnerColor === "red"
          ? styles["container--red"]
          : styles["container--yellow"]
      }`}
    >
      <p className={styles.message}>
        {winnerColor === "red" ? "Player 1" : "Player 2"} <span>WINS!</span>
      </p>
      <button onClick={resetBoard} className={`btn ${styles.continue}`}>
        Continue
      </button>
    </div>
  );
}
