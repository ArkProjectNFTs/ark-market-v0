import { useEffect } from "react";

import { useAccount, useConnectors } from "@starknet-react/core";

import { useDisplayBalance } from "../../hooks/useDisplayBalance";
import { useDisplayName } from "../../hooks/useDisplayName";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../Dialog/Dialog";

interface AccountModalProps {
  onClose: () => void;
  open: boolean;
}
export function AccountModal({ onClose, open }: AccountModalProps) {
  const { address } = useAccount();
  const { disconnect } = useConnectors();

  const { displayName } = useDisplayName();
  const { displayBalance } = useDisplayBalance();

  // TODO @YohanTz: rely only on onDisconnect and onConnect in ModalContext.tsx
  useEffect(() => {
    if (address === undefined) {
      onClose();
    }
  }, [address, onClose]);

  return (
    <Dialog
      // TODO @YohanTz: only rely on open
      // open={open}
      open={open && address !== undefined}
      modal
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-8">{displayName}</DialogTitle>
          <p>{displayBalance}</p>
          <div className="justify-between">
            <button>Copy address</button>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
