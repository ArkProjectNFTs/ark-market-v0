import OwnerCollection from "./components/owner-collection";
import OwnerHeader from "./components/owner-header";

export default function Owned({
  params
}: {
  params: {
    address: string;
  };
}) {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 p-8 md:flex">
      <OwnerHeader address={params.address} />
      <OwnerCollection address={params.address} name="test" />
    </div>
  );
}
