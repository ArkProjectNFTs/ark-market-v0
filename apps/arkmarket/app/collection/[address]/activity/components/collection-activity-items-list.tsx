import { CollectionActivityItem } from "@/types";

import CollectionActivityItemsListHeader from "./collection-activity-items-list-header";
import CollectionActivityItemsListRow from "./collection-activity-items-list-row";

interface CollectionActivityItemsListProps {
  items: Array<CollectionActivityItem>;
  address: string;
  name: string;
}
const CollectionActivityItemsList: React.FC<
  CollectionActivityItemsListProps
> = ({ items, address, name }) => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
      <div className="flex flex-col">
        <CollectionActivityItemsListHeader />
        {items.map((item, index) => {
          return (
            <CollectionActivityItemsListRow
              key={index}
              address={address}
              item={item}
              name={name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionActivityItemsList;
