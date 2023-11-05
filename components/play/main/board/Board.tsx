import styles from "./Board.module.css";
import Row from "./row/Row";
import { useContext } from "react";
import { ConnectFourCtx } from "../../../contexts/ConectFourProvider";
import { ConnectFourCtxInt } from "@/types/types";
export default function Board() {
  const { board } = useContext(ConnectFourCtx) as ConnectFourCtxInt;

  return (
    <div className={styles.board}>
      {board.map((row, index) => {
        return <Row key={index} row={row} y={index} />;
      })}
    </div>
  );
}
