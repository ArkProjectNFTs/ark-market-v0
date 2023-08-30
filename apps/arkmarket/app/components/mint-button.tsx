"use client";

import { useState } from "react";

import { useAccount, useContractWrite } from "@starknet-react/core";
import { shortString } from "starknet";

import { Button } from "@/components/ui/button";

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
          "0x0199a48b1850f5905a209a1f5616fa205cfe5747eb4cfe034d95543d91168ea9",
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
      <div>
        <label>token id:</label>
        <input
          type="number"
          onChange={(event) => setTokenId(event.target.value)}
          value={tokenId}
        />
      </div>
      <div>{tokenUri}</div>
      <div>
        calldata: {` [${address}, 1, 0, 2, ${firstPart}, ${secondPart}]`}
      </div>
      <Button
        onClick={() => {
          write();
        }}
      >
        Mint Token
      </Button>
    </div>
  );
};

export default MintButton;
