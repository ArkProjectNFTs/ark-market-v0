import { useMemo } from "react";

import { useAccount, useStarkName } from "@starknet-react/core";

export function useDisplayName() {
  const { address } = useAccount();

  const truncatedAddress = useMemo(() => {
    if (!address) return undefined;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const { data: starkName } = useStarkName({ address: address ?? "" });
  console.log(starkName);

  return { starkName, truncatedAddress };
}
