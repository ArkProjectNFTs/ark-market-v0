import ConnectButtonRenderer from "./ConnectButtonRenderer";

/** This component should be an exported version of ConnectButtonRenderer, with propos
 * such as showBalance, label etc
 */
export function ConnectButton() {
  return (
    <ConnectButtonRenderer>
      {({}) => {
        return <div></div>;
      }}
    </ConnectButtonRenderer>
  );
}
ConnectButton.Custom = ConnectButtonRenderer;
