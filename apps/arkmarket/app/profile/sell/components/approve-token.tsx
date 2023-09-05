import React from "react";

import { env } from "@/env.mjs";
import { useContractWrite } from "@starknet-react/core";


import { Button } from "@/components/ui/button";

interface ApproveTokenProps {
  contractAddress: string;
}

const ApproveToken: React.FC<ApproveTokenProps> = ({
  contractAddress
}) => {
  const { write } = useContractWrite({
    calls: [
      {
        contractAddress,
        entrypoint: "set_approval_for_all",
        calldata: [env.NEXT_PUBLIC_OPERATOR_ADDRESS, 1]
      }
    ]
  });
  return <Button onClick={() => write()}>approve</Button>;
};

export default ApproveToken;
