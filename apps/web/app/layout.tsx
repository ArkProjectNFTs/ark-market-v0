"use client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Header from "header";
import { theme } from "../theme";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";

const connectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <StarknetConfig connectors={connectors}>
            <Header />
            {children}
          </StarknetConfig>
        </ChakraProvider>
      </body>
    </html>
  );
}
