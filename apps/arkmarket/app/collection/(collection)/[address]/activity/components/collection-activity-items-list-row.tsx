import Link from "next/link";

import { env } from "@/env.mjs";
import { type CollectionActivityItem } from "@/types";

import { cn, formatAddress, removeLeadingZeros } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils/date";

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
        <div className="align flex w-24 flex-auto items-center pl-4">
          <span>{item.event_type}</span>
        </div>

        <div className="align flex w-64 flex-auto items-center space-x-3 overflow-hidden">
          {!item.image ? (
            <svg
              className="mr-2 dark:invert"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="#000"
            >
              <rect width="32" height="32" rx="4" />
            </svg>
          ) : (
            <img
              className="h-8 w-8 rounded-sm object-cover object-center"
              src={item.image}
              alt={item.token_id}
            />
          )}
          <span>{`${name} #${removeLeadingZeros(item.token_id)}`}</span>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end overflow-hidden">
          <span>N/A</span>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end overflow-hidden">
          <span>-</span>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end overflow-hidden">
          <Link
            href={`/profile/${item.from_address}`}
            className="hover:underline"
          >
            {formatAddress(item.from_address)}
          </Link>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end overflow-hidden">
          <Link
            href={`/profile/${item.to_address}`}
            className="hover:underline"
          >
            {formatAddress(item.to_address)}
          </Link>
        </div>

        <div className="align flex w-24 flex-auto items-center justify-end overflow-hidden pr-4">
          <span>{formatTimeAgo(parseInt(item.timestamp))}</span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionActivityItemsListRow;
