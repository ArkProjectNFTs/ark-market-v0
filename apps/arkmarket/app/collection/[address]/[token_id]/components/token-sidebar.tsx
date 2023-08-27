import React from "react";

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
        src={metadata.image.replace(
          "ipfs://",
          "http://ipfs.io/ipfs/"
        )}
      />
    </div>
  );
};

export default TokenSidebar;
