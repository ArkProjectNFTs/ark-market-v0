import Link from "next/link";

import { type CollectionActivityItem } from "@/types";

import { removeLeadingZeros } from "@/lib/utils";

interface CollectionActivityItemsListRowProps {
  address: string;
  item: CollectionActivityItem;
  name: string;
}

const CollectionActivityItemsListRow: React.FC<
  CollectionActivityItemsListRowProps
> = ({ address, item, name }) => {
  return (
    <Link href={`/collection/${address}/${item.token_id}`}>
      <div className="flex h-12 w-full text-sm hover:bg-accent">
        <div className="align flex w-24 flex-auto items-center">
          <span>{item.event_type}</span>
        </div>

        <div className="align flex w-64 flex-auto items-center">
          <span>{`${name} ${removeLeadingZeros(item.token_id)}`}</span>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>Value</span>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>From</span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionActivityItemsListRow;
