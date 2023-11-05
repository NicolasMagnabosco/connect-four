import React from "react";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.container}>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
    </div>
  );
}
