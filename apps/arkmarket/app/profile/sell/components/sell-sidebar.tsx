"use client";

import { env } from "@/env.mjs";
import { useContractRead } from "@starknet-react/core";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import ApproveToken from "./approve-token";
import ListToken from "./list-token";

interface SellSidebarProps {
  contractAddress: string;
  tokenId: string;
  address: string;
  orderData: {
    price: string;
    endDate: number;
  };
}

const SellSidebar: React.FC<SellSidebarProps> = ({
  contractAddress,
  tokenId,
  address,
  orderData
}) => {
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
    args: [address, env.NEXT_PUBLIC_OPERATOR_ADDRESS],
    watch: true
  });

  if (!contractAddress || !tokenId || !address)
    return (
      <div>
        <h1 className="text-2xl font-bold">Sell</h1>
        <p className="text-gray-500">Select a token to sell</p>
      </div>
    );

  const date = dayjs.unix(orderData.endDate).toDate().toISOString();
  const formattedDate = dayjs(date).format("DD/MM/YYYY");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>
          <div className="flex flex-col items-start">
            <div>
              {orderData.price && (
                <div>Listing price: {orderData.price} eth</div>
              )}
            </div>
            <div>
              {orderData.endDate && (
                <div>Listing end date: {formattedDate}</div>
              )}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <>
          {isApprovedForAll ? (
            <ListToken
              orderData={orderData}
              contractAddress={contractAddress}
              tokenId={tokenId}
            />
          ) : (
            <ApproveToken contractAddress={contractAddress} />
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default SellSidebar;
