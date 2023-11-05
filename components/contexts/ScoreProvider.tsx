import useScore from "@/hooks/useScore";
import { ScoreCtxInt } from "@/types/types";
import React, { ReactNode, createContext } from "react";

export const ScoreCtx = createContext<ScoreCtxInt | null>(null);

export default function ScoreProvider({ children }: { children: ReactNode }) {
  const methods = useScore();
  return <ScoreCtx.Provider value={methods}>{children}</ScoreCtx.Provider>;
}
