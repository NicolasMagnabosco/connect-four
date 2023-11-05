import styles from "./Row.module.css";
import Box from "./box/Box";
import { BoxColor, Win, WinnerBox } from "@/types/types";
export default function Row({ row, y }: { row: Array<BoxColor>; y: number }) {
  return (
    <div style={{ display: "flex" }} className={styles.row}>
      {row.map((value, index) => {
        return <Box key={index} x={index} y={y} color={value} />;
      })}
    </div>
  );
}
