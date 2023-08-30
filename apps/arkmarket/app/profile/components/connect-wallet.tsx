import { useConnectModal } from "@ark-project/ark-modal";

import { Button } from "@/components/ui/button";

const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Connect your wallet</h2>
      <p className="text-muted-foreground">
        By connecting your wallet, you agree to our Terms of Service and our
        Privacy Policy.
      </p>
      <Button onClick={() => openConnectModal && openConnectModal()}>
        Connect wallet
      </Button>
    </div>
  );
};

export default ConnectWallet;
