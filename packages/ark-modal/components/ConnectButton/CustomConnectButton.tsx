"use client";

import { useAccount } from "@starknet-react/core";

import { useDisplayBalance } from "../../hooks/useDisplayBalance";
import { useDisplayName } from "../../hooks/useDisplayName";
import { useIsMounted } from "../../hooks/useIsMounted";
import {
  useAccountModal,
  useConnectModal
} from "../ArkKitProvider/ModalContext";

interface CustomConnectButtonProps {
  children: (props: {
    /** The currently connected user starknet address */
    address?: string;
    /** Formatted balance of the currently connected user */
    displayBalance?: string;
    /** truncated address of the currently connected user */
    truncatedAddress?: string;
    /** Starknet id name of the currently connected user */
    starkName?: string;
    /** Opens the account modal */
    openAccountModal?: () => void;
    /** Opens the wallet connection modal */
    openConnectModal?: () => void;
    /** Whether the connect button is ready to be displayed or not */
    ready: boolean;
  }) => React.ReactNode;
}

// TODO @YohanTz: Make a ConnectButton component that is a ready to go version of this button
export function CustomConnectButton({ children }: CustomConnectButtonProps) {
  const { address } = useAccount();
  const mounted = useIsMounted();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { truncatedAddress, starkName } = useDisplayName();
  const { displayBalance } = useDisplayBalance();

  // TODO @YohanTz: ready = mounted && isConnecting === false && isReconnecting === false when implemented in starknet-react
  const ready = mounted;

  return children({
    address,
    displayBalance,
    truncatedAddress,
    starkName,
    openAccountModal,
    openConnectModal,
    ready
  });
}

CustomConnectButton.displayName = "";
