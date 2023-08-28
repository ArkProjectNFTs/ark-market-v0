import { ConnectButton } from "@ark-project/ark-modal";

export function UserNav() {
  return (
    <div>
      <ConnectButton.Custom>
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
                <button onClick={openAccountModal}>
                  {displayBalance} {displayName}
                </button>
              )}
              {address === undefined && (
                <button onClick={openConnectModal}>Connect wallet</button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
