import { useEffect } from "react";

import { useAccount, useConnectors } from "@starknet-react/core";

import { Button } from "../ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/Dialog/Dialog";

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
          <DialogTitle>Connect a wallet</DialogTitle>
          <DialogDescription>
            Please, connect a wallet to start using ArkMarket
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-4 flex w-full flex-col gap-2">
          {connectors.map((connector) => {
            return (
              <li>
                <Button onClick={() => connect(connector)} className="w-full">
                  {connector.id}
                </Button>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
