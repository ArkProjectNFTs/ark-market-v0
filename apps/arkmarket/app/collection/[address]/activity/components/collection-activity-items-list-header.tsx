const CollectionActivityItemsListHeader = () => {
  return (
    <div className="flex h-8 w-full justify-between text-xs">
      <div className="align flex w-24 flex-auto items-center pl-4">Event</div>

      <div className="align flex w-64 flex-auto items-center">
        <span>Item</span>
      </div>

      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Rarity</span>
      </div>

      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Value</span>
      </div>

      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>From</span>
      </div>

      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>To</span>
      </div>

      <div className="align flex w-24 flex-auto items-center justify-end pr-4">
        <span>Time</span>
      </div>
    </div>
  );
};

export default CollectionActivityItemsListHeader;
