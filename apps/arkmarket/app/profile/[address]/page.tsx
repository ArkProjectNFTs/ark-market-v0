import OwnerCollection from "./components/owner-collection";

export default function Owned({
  params
}: {
  params: {
    address: string;
  };
}) {
  return <OwnerCollection address={params.address} name="test" />;
}
