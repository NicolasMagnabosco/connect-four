import { useContext, useEffect } from "react";
import styles from "./Main.module.css";
import Score from "./score/Score";
import Timer from "./timer/Timer";
import Board from "./board/Board";
import WinnerMessage from "./winnerMessage/WinnerMessage";
import { ConnectFourCtx } from "@/components/contexts/ConectFourProvider";
import { ConnectFourCtxInt, ScoreCtxInt } from "@/types/types";
import { ScoreCtx } from "@/components/contexts/ScoreProvider";
export default function Main() {
  const {
    resetBoard,
    win: { isWin, winnerColor },
  } = useContext(ConnectFourCtx) as ConnectFourCtxInt;

  const { increaseScore } = useContext(ScoreCtx) as ScoreCtxInt;

  useEffect(() => {
    if (isWin && winnerColor) {
      increaseScore(winnerColor);
    }
  }, [isWin]);
  return (
    <main className={styles.main}>
      <Score color="red" />
      <section aria-labelledby="board" className={styles["board-container"]}>
        <Board />
        {isWin ? <WinnerMessage resetBoard={resetBoard} /> : <Timer />}
      </section>
      <Score color="yellow" />
    </main>
  );
}
