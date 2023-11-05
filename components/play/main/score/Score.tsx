import { useContext } from "react";
import { BoxColor, ScoreCtxInt } from "@/types/types";
import styles from "./Score.module.css";
import { ScoreCtx } from "@/components/contexts/ScoreProvider";
export default function Score({ color }: { color: BoxColor }) {
  const { redScore, yellowScore } = useContext(ScoreCtx) as ScoreCtxInt;
  return (
    <div className={styles.container}>
      <div
        className={`${styles.ball} ${
          color === "red" ? styles["ball--red"] : styles["ball--yellow"]
        }`}
      ></div>
      <p className={styles.player}>
        {color === "red" ? "Player 1" : "Player 2"}
      </p>
      <p className={styles.score}>{color === "red" ? redScore : yellowScore}</p>
    </div>
  );
}
