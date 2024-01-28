import { ConnectFourCtx } from "@/components/contexts/ConectFourProvider";
import { ConnectFourCtxInt } from "@/types/types";
import { useContext } from "react";
import styles from "./Timer.module.css";

export default function Timer() {
  const { remainingTime, turn } = useContext(
    ConnectFourCtx
  ) as ConnectFourCtxInt;
  return (
    <div
      className={`${styles.container} ${
        turn === "red" ? styles["container--red"] : styles["container--yellow"]
      }`}
    >
      <div className={styles.arrow}></div>
      <div className={styles["arrow-border"]}></div>
      <p className={styles.player}>
        {turn === "red" ? "It's Player 1 's Turn" : "It's Player 2 's Turn"}
      </p>
      <p className={styles.time}>{remainingTime}</p>
    </div>
  );
}
