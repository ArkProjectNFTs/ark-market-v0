import React from "react";

import Sell from "./components/sell";

const SellPage = () => {
  return (
    <div className="grid grid-cols-1 items-start gap-4 p-8 lg:grid-cols-3 lg:gap-8">
      <Sell />
    </div>
  );
};

export default SellPage;
