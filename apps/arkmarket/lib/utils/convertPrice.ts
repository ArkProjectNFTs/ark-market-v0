import { cairo, uint256 } from "starknet";
import { formatEther } from "viem";

export const convertWeiPriceToEth = (price: string): string => {
  const u256Price = cairo.uint256(price);
  const priceAsBN = uint256.uint256ToBN(u256Price);
  const formatedPrice = formatEther(priceAsBN);
  return formatedPrice;
};
