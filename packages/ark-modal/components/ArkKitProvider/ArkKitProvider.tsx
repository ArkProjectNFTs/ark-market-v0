import { PropsWithChildren } from "react";

import { InjectedConnector, StarknetConfig } from "@starknet-react/core";

import { ModalProvider } from "./ModalContext";

const connectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } })
];

const ArkKitProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <StarknetConfig connectors={connectors} autoConnect>
        <ModalProvider>{children}</ModalProvider>
      </StarknetConfig>
    </>
  );
};

export { ArkKitProvider };
