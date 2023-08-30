import OwnerCollection from "./components/owner-collection";
import OwnerHeader from "./components/owner-header";

export default function Owned({
  params
}: {
  params: {
    address: string;
  };
}) {
  return <OwnerCollection address={params.address} name="test" />;
}
