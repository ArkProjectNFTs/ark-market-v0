import { useEffect } from "react";

import { useAccount, useConnectors } from "@starknet-react/core";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../Dialog/Dialog";

interface ConnectModalProps {
  onClose: () => void;
  open: boolean;
}
export function ConnectModal({ onClose, open }: ConnectModalProps) {
  const { address } = useAccount();
  const { connect, connectors } = useConnectors();

  // TODO @YohanTz: rely only on onDisconnect and onConnect in ModalContext.tsx
  useEffect(() => {
    if (address !== undefined) {
      onClose();
    }
  }, [address, onClose]);

  return (
    // TODO @YohanTz: only rely on open
    <Dialog open={open} modal onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-8">Connect a wallet</DialogTitle>
          <DialogDescription>
            Please, connect a wallet to start using ArkMarket
          </DialogDescription>
          <ul>
            {connectors.map((connector) => {
              return (
                <li>
                  <button onClick={() => connect(connector)}>
                    {connector.id}
                  </button>
                </li>
              );
            })}
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
