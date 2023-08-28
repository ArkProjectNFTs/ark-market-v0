import { useMemo } from "react";

import { useAccount, useStarkName } from "@starknet-react/core";

export function useDisplayName() {
  const { address } = useAccount();

  const shortenedAddress = useMemo(() => {
    if (!address) return undefined;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const { data: starkName } = useStarkName({ address: shortenedAddress ?? "" });
  const displayName = starkName ?? shortenedAddress;

  return { displayName };
}
