"use client";

import { CustomConnectButton } from "./CustomConnectButton";

/** This component should be an exported version of ConnectButtonRenderer, with propos
 * such as showBalance, label etc
 */
export function ConnectButton() {
  return (
    <CustomConnectButton>
      {({}) => {
        return <div></div>;
      }}
    </CustomConnectButton>
  );
}
