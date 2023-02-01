import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useColorMode,
  DarkMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiHelpCircle, FiMenu, FiSearch, FiSettings } from "react-icons/fi";
import { Logo } from "./Logo";

export const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as="section">
      <Box as="nav" bg="bg-accent" color="on-accent">
        <Container py={{ base: "3", lg: "4" }}>
          <Flex justify="space-between">
            <HStack spacing="4">
              <Logo />
              {isDesktop && (
                <ButtonGroup variant="ghost-on-accent" spacing="1">
                  <Link href="/">
                    <Button>Home</Button>
                  </Link>
                  <Link href="/profile">
                    <Button aria-current="page">Profile</Button>
                  </Link>
                  <Link href="/listings">
                    <Button>Listings</Button>
                  </Link>
                </ButtonGroup>
              )}
            </HStack>
            {isDesktop ? (
              <HStack spacing="4">
                <ButtonGroup variant="ghost-on-accent" spacing="1">
                  <IconButton
                    onClick={toggleColorMode}
                    icon={
                      colorMode === "light" ? (
                        <MdLightMode fontSize="1.25rem" />
                      ) : (
                        <MdDarkMode fontSize="1.25rem" />
                      )
                    }
                    aria-label="Help Center"
                  />
                </ButtonGroup>
                <Avatar
                  boxSize="10"
                  name="Christoph Winston"
                  src="https://tinyurl.com/yhkm2ek8"
                />
              </HStack>
            ) : (
              <IconButton
                variant="ghost-on-accent"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
