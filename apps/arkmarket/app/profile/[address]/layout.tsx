import { PropsWithChildren } from "react";

import OwnerHeader from "./components/owner-header";

export default function ProfileLayout({
  params,
  children
}: PropsWithChildren<{
  params: {
    address: string;
  };
}>) {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 p-8 md:flex">
      <OwnerHeader address={params.address} />
      {children}
    </div>
  );
}
