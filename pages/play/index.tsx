import Head from "next/head";
import styles from "./Play.module.css";
import ConnectFourProvider from "@/components/contexts/ConectFourProvider";
import ScoreProvider from "@/components/contexts/ScoreProvider";
import Header from "@/components/play/header/Header";
import Main from "@/components/play/main/Main";

export default function Play() {
  return (
    <ConnectFourProvider>
      <ScoreProvider>
        <section aria-labelledby="game" className={styles.home}>
          <Head>
            <title>Connect Four Game</title>
            <meta
              name="description"
              content="Connect Four board game built in React"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Header />
          <Main />
        </section>
      </ScoreProvider>
    </ConnectFourProvider>
  );
}
