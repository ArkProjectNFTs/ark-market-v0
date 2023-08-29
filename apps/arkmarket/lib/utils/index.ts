import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeLeadingZeros(input: string): string {
  return parseInt(input, 10).toString();
}

export function formatAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}
