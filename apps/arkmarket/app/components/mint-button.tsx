"use client";

import { useState } from "react";

import { useAccount, useContractWrite } from "@starknet-react/core";
import { shortString } from "starknet";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MintButton = () => {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState<string>("");

  const tokenUri = `ipfs://QmPrZZ8iyyYHVWoJdMtQ5hPDqFr6oHH1EtXhjN72bkdXic/${tokenId}`;

  const firstPart = shortString.encodeShortString(
    "ipfs://QmPrZZ8iyyYHVWoJdMtQ5hPD"
  );
  const secondPart = shortString.encodeShortString(
    `qFr6oHH1EtXhjN72bkdXic/${tokenId}`
  );

  const { write } = useContractWrite({
    calls: [
      {
        contractAddress:
          "0x05004ab1e4f512e43f46311580dc4a0a053f146310c622344dfddab8fed7d5b0",
        entrypoint: "mint_uri_free",
        calldata: [
          address || "",
          parseInt(tokenId),
          0,
          2,
          firstPart,
          secondPart
        ]
      }
    ]
  });

  return (
    <div>
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <div>{tokenUri}</div>
          <div>
            calldata: {` [${address}, 1, 0, 2, ${firstPart}, ${secondPart}]`}
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">token id:</Label>
                <Input
                  type="number"
                  onChange={(event) => setTokenId(event.target.value)}
                  value={tokenId}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              write();
            }}
          >
            Mint Token
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MintButton;
