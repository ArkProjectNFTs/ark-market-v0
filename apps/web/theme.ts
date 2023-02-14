import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme,  type ThemeConfig } from "@chakra-ui/react";

const colors = {
  red: {
    "50": "#FCE8EB",
    "100": "#F7BFC7",
    "200": "#F296A4",
    "300": "#EE6D80",
    "400": "#E9445C",
    "500": "#E41B38",
    "600": "#B6162D",
    "700": "#891022",
    "800": "#5B0B16",
    "900": "#2E050B",
  },
  gray: {
    "50": "#F2F0F4",
    "100": "#D9D6E1",
    "200": "#C1BBCE",
    "300": "#A9A1BA",
    "400": "#9186A7",
    "500": "#796B94",
    "600": "#615676",
    "700": "#484059",
    "800": "#302B3B",
    "900": "#18151E",
  },
  purple: {
    "50": "#F3EEF6",
    "100": "#DED1E6",
    "200": "#C9B3D6",
    "300": "#B495C6",
    "400": "#9F77B6",
    "500": "#8959A6",
    "600": "#6E4785",
    "700": "#523663",
    "800": "#372442",
    "900": "#1B1221",
  },
  orange: {
    "50": "#FDE8E8",
    "100": "#F9BEBE",
    "200": "#F59594",
    "300": "#F16B6A",
    "400": "#ED4240",
    "500": "#EA1815",
    "600": "#BB1311",
    "700": "#8C0E0D",
    "800": "#5D0A09",
    "900": "#2F0504",
  },
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme(
  {
    config,
    colors: { ...baseTheme.colors, ...colors, brand: colors.gray },
  },
  proTheme
);
