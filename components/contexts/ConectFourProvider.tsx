import { createContext, ReactNode } from "react";
import useConnectFour from "../../hooks/useConnectFour";
import { ConnectFourCtxInt } from "../../types/types";

export const ConnectFourCtx = createContext<ConnectFourCtxInt | null>(null);

export default function ConnectFourProvider({
  children,
}: {
  children: ReactNode;
}) {
  const methods = useConnectFour();

  return (
    <ConnectFourCtx.Provider value={methods}>
      {children}
    </ConnectFourCtx.Provider>
  );
}
