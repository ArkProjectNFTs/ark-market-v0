import { useEffect, useMemo } from "react";

import { useAccount, useStarkName } from "@starknet-react/core";

export function useDisplayName() {
  const { address } = useAccount();

  const truncatedAddress = useMemo(() => {
    if (!address) return undefined;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  // TODO @YohanTz: fix useStarkName hook
  const { data: starkName, refetch } = useStarkName({
    address:
      address ??
      "0x064AE291C8482C273828957239017C3DdA0EC12ef27f76C9c9b043740CdD9137"
  });

  useEffect(() => {
    if (address !== undefined) {
      refetch();
    }
  }, [address, refetch]);

  return { starkName, truncatedAddress };
}
