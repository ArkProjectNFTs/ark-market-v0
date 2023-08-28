import { PropsWithChildren } from "react";

import { ModalProvider } from "./ModalContext";

export function ArkKitProvider({ children }: PropsWithChildren) {
  return <ModalProvider>{children}</ModalProvider>;
}
