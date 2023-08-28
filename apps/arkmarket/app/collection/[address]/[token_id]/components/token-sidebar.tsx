import React from "react";

import { env } from "@/env.mjs";

interface TokenSidebarProps {
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: unknown[];
    external_url: string;
  };
}

const TokenSidebar: React.FC<TokenSidebarProps> = ({ metadata }) => {
  return (
    <div className="flex flex-col space-y-4">
      <img
        className="w-full rounded-md"
        src={metadata.image.replace("ipfs://", env.NEXT_PUBLIC_IPFS_PROVIDER)}
      />
    </div>
  );
};

export default TokenSidebar;
