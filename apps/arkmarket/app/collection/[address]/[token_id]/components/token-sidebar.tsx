import React from "react";

import { env } from "@/env.mjs";

import Image from "@/components/ui/image";

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
      <>
        {metadata.image.includes("mp4") ? (
          <video
            className="w-full rounded-md"
            muted
            loop
            autoPlay
            src={metadata.image.replace(
              "ipfs://",
              env.NEXT_PUBLIC_IPFS_PROVIDER
            )}
          />
        ) : (
          <Image
            className="w-full rounded-md"
            fallbackSrc="/placeholder.png"
            src={metadata.image.replace(
              "ipfs://",
              env.NEXT_PUBLIC_IPFS_PROVIDER
            )}
          />
        )}
      </>
    </div>
  );
};

export default TokenSidebar;
