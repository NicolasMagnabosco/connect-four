import { useEffect, useState } from "react";
import { TIMER_INITIAL } from "@/constants/constants";

export default function useTimer() {
  const [timer, setTimer] = useState<number>(TIMER_INITIAL);
  const [isTimeOver, setIsTimerOver] = useState<boolean>(false);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else setIsTimerOver(true);
  }, [timer]);

  const resetTimer = () => {
    setTimer(TIMER_INITIAL);
    setIsTimerOver(false);
  };

  return { remainingTime: timer, isTimeOver, resetTimer };
}
