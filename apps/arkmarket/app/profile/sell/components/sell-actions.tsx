"use client";

import { env } from "@/env.mjs";
import { useAccount, useContractRead } from "@starknet-react/core";

import ApproveToken from "./approve-token";
import ListToken from "./list-token";

interface SellActionsProps {
  contractAddress: string;
}

const SellActions: React.FC<SellActionsProps> = ({ contractAddress }) => {
  const { address } = useAccount();
  console.log(contractAddress);
  const { data: isApprovedForAll } = useContractRead({
    abi: [
      {
        type: "function",
        name: "is_approved_for_all",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      }
    ],
    address: contractAddress,
    functionName: "is_approved_for_all",
    args: [address, env.NEXT_PUBLIC_OPERATOR_ADDRESS]
  });

  console.log(isApprovedForAll);

  return <>{isApprovedForAll ? <ListToken /> : <ApproveToken />}</>;
};
export default SellActions;
