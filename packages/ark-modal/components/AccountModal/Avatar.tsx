import { useAccount } from "@starknet-react/core";
import ColorHash from "color-hash";

const colorHash = new ColorHash({ saturation: 1.0 });

const addressToColor = (address: string): string => colorHash.hex(address);

const generateColours = (address: string): [string, string] => {
  const firstAddressPart = address.substring(0, address.length / 2);
  const secondAdddressPart = address.substring(address.length / 2);
  const firstColor = addressToColor(firstAddressPart);
  const secondColor = addressToColor(secondAdddressPart);

  return [firstColor, secondColor];
};

interface AvatarProps {
  address?: string;
  size: 24 | 96;
}

export function Avatar({ address, size }: AvatarProps) {
  const [firstColor, secondColor] = generateColours(address || "");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#gradient)" />
      <defs>
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor={firstColor} />
          <stop offset="1" stopColor={secondColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}
