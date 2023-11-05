import React from "react";
import Head from "next/head";
import styles from "./Home.module.css";
import Logo from "@/components/global/logo/Logo";
import PlayLink from "@/components/home/PlayLink";
import RulesLink from "@/components/home/RulesLink";
export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Connect Four Game</title>
        <meta
          name="description"
          content="Connect Four board game built in React"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className={styles.header}>
        <Logo />
        <h1 className={styles.heading}>CONNECT FOUR!</h1>
      </header>
      <section aria-label="options" className={styles.options}>
        <PlayLink />
        <RulesLink />
      </section>
    </div>
  );
}
