import { useEffect } from "react";

import { useAccount, useConnectors } from "@starknet-react/core";

import { useDisplayBalance } from "../../hooks/useDisplayBalance";
import { useDisplayName } from "../../hooks/useDisplayName";
import { Button } from "../ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../ui/Dialog/Dialog";
import { Avatar } from "./Avatar";

interface AccountModalProps {
  onClose: () => void;
  open: boolean;
}
export function AccountModal({ onClose, open }: AccountModalProps) {
  const { address } = useAccount();
  const { disconnect } = useConnectors();

  const { truncatedAddress, starkName } = useDisplayName();
  const { displayBalance } = useDisplayBalance();

  const displayName = starkName ?? truncatedAddress;

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
        <DialogHeader className="mb-4">
          <DialogTitle>Connected</DialogTitle>
        </DialogHeader>
        <Avatar size={96} address={address} />
        <div className="flex flex-col">
          <div>
            <p className="text-lg">{displayName}</p>
          </div>
          <p className="text-sm text-muted-foreground">{displayBalance}</p>
        </div>
        <Button onClick={disconnect} className="w-full">
          Disconnect
        </Button>
      </DialogContent>
    </Dialog>
  );
}
