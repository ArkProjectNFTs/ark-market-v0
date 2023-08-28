import { useAccount, useBalance, useStarkName } from "@starknet-react/core";

import { useIsMounted } from "../../hooks/useIsMounted";

interface ConnectButtonRendererProps {
  children: (props: {
    /** The currently connected user starknet address */
    address?: string;
    /** Formatted balance of the currently connected user */
    displayBalance?: string;
    /** Starknet id name or address of the currently connected user */
    displayName?: string;
    /** Opens the account modal */
    openAccountModal: () => void;
    /** Opens the wallet connection modal */
    openConnectModal: () => void;
    /** Whether the connect button is ready to be displayed or not */
    ready: boolean;
  }) => React.ReactNode;
}

// TODO @YohanTz: Make a ConnectButton component that is a ready to go version of this button
export default function ConnectButtonRenderer({
  children
}: ConnectButtonRendererProps) {
  const { address } = useAccount();
  const { data: starkName } = useStarkName({ address: address ?? "" });
  const { data: balanceData } = useBalance({ address: address });
  const mounted = useIsMounted();

  // TODO @YohanTz: ready = mounted && isConnecting === false && isReconnecting === false when implemented in starknet-react
  const ready = mounted;
  const displayName = starkName ?? address;
  // TODO @YohanTz: round balanceData.formatted ?
  const displayBalance = balanceData
    ? `${balanceData.formatted} ${balanceData.symbol}`
    : undefined;

  return children({
    address,
    displayBalance,
    displayName,
    openAccountModal: () => {},
    openConnectModal: () => {},
    ready
  });
}

ConnectButtonRenderer.displayName = "ConnectButton.Custom";
