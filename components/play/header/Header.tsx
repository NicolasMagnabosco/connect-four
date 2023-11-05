import { useContext, useState } from "react";
import Link from "next/link";

import styles from "./Header.module.css";
import { ConnectFourCtx } from "@/components/contexts/ConectFourProvider";
import { ConnectFourCtxInt, ScoreCtxInt } from "@/types/types";
import { ScoreCtx } from "@/components/contexts/ScoreProvider";

export default function Header() {
  const { resetBoard } = useContext(ConnectFourCtx) as ConnectFourCtxInt;
  const { resetScore } = useContext(ScoreCtx) as ScoreCtxInt;

  const handleReset = () => {
    resetBoard();
    resetScore();
  };
  return (
    <header className={styles.header}>
      <Link className={styles.btn} href="/">
        Menu
      </Link>
      <button onClick={handleReset} className={styles.btn}>
        Reset
      </button>
    </header>
  );
}
