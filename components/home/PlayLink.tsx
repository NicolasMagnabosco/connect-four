import React from "react";
import Link from "next/link";
import styles from "../home/Link.module.css";

export default function PlayLink() {
  return (
    <Link className={`btn ${styles.play}`} href={"/play"}>
      PLAY
    </Link>
  );
}
