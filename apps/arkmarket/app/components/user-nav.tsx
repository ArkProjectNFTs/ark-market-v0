"use client";

import { CustomConnectButton } from "@ark-project/ark-modal";
import { useAccount } from "@starknet-react/core";

import { Button } from "@/components/ui/button";

export function UserNav() {
  useAccount({
    onConnect: () => {
      console.log("connected");
    }
  });
  return (
    <div>
      <CustomConnectButton>
        {({
          avatar,
          address,
          displayBalance,
          truncatedAddress,
          starkName,
          openAccountModal,
          openConnectModal,
          ready
        }) => {
          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                // TODO @YohanTz: Replace with tailwind className
                style: { opacity: 0, pointerEvents: "none", userSelect: "none" }
              })}
            >
              {address !== undefined && (
                <Button
                  onClick={openAccountModal}
                  className="flex items-center rounded-lg p-0.5 font-semibold"
                  variant="secondary"
                >
                  {displayBalance !== undefined && (
                    <span className="whitespace-nowrap px-2">
                      {displayBalance}
                    </span>
                  )}

                  <div className="flex h-full items-center gap-2 rounded-md  bg-background px-1.5">
                    {avatar}
                    {starkName ?? truncatedAddress}
                  </div>
                </Button>
              )}

              {address === undefined && (
                <Button onClick={openConnectModal}>Connect wallet</Button>
              )}
            </div>
          );
        }}
      </CustomConnectButton>
    </div>
  );
}
