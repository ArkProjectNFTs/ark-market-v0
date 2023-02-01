"use client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Header from "header";
import { theme } from "../theme";

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
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
