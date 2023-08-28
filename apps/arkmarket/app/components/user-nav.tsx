"use client";

import { CustomConnectButton } from "@ark-project/ark-modal";

import { Button } from "@/components/ui/button";

export function UserNav() {
  return (
    <div>
      <CustomConnectButton>
        {({
          address,
          displayBalance,
          displayName,
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
                <Button onClick={openAccountModal}>
                  {displayBalance} {displayName}
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
