import React from "react";
import styles from "./Rules.module.css";
import Category from "@/components/rules/category/Category";
import { RULES } from "@/constants/constants";
import Link from "next/link";

export default function Rules() {
  return (
    <section aria-labelledby="rules" className={styles.rules}>
      <h1 className={styles.heading} id="rules">
        RULES
      </h1>
      <div className={styles.container}>
        {RULES.map((rule) => {
          return (
            <Category
              key={crypto.randomUUID()}
              heading={rule.heading}
              explanation={rule.explanation}
            />
          );
        })}
      </div>
      <Link className={`btn ${styles.link}`} href={"/"}>
        Go Back
      </Link>
    </section>
  );
}
