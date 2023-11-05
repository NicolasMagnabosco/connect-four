import React from "react";
import Link from "next/link";
import styles from "../home/Link.module.css";

export default function RulesLink() {
  return (
    <Link className={`btn ${styles.rules}`} href={"/rules"}>
      RULES
    </Link>
  );
}
