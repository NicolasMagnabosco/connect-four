import { Turn } from "@/types/types";
import { useState } from "react";

export default function useScore() {
  const [redScore, setRedScore] = useState<number>(0);
  const [yellowScore, setYellowScore] = useState<number>(0);

  const increaseScore = (color: Turn) => {
    if (color === "red") setRedScore(redScore + 1);
    else setYellowScore((score) => score + 1);
  };

  const resetScore = () => {
    setRedScore(0);
    setYellowScore(0);
  };

  return { redScore, yellowScore, increaseScore, resetScore };
}
