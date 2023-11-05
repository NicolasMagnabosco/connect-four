import React from "react";
import styles from "./Category.module.css";

export default function Category({
  heading,
  explanation,
}: {
  heading: string;
  explanation: string;
}) {
  return (
    <div className={styles.category}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.explanation}>{explanation}</p>
    </div>
  );
}
