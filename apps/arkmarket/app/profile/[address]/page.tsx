import { validateAndParseAddress } from "starknet";

import OwnerCollection from "./components/owner-collection";
import OwnerHeader from "./components/owner-header";

export default function Owned({
  params
}: {
  params: {
    address: string;
  };
}) {
  const address = validateAndParseAddress(params.address);
  return <OwnerCollection address={address} name="test" />;
}
