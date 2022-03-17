import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import logo from "../styles/images/RJ Market.png";
import { RiShoppingCart2Line as shoppingCart } from "react-icons/ri";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay } from "../redux/actions";
import { route } from "next/dist/server/router";

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const cart = useSelector((state) => state.cart);

  //ChakraUI Themes
  const { toggleColorMode, colorMode } = useColorMode();
  const colorMode1 = useColorModeValue("white", "#292929");

  //REDUX Store
  const itemsCollection = useSelector((state) => state.items);
  const [items] = itemsCollection;

  //Handle search input
  const searchHandler = () => {
    const itemsCopy = items;
    let filteredCopy = itemsCopy.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    dispatch(setDisplay(filteredCopy));
  };
 
  return (
    <>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        bgColor={colorMode1}
        pt={3}
      >
        {/* Logo */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxH={50}
          cursor="pointer"
          pb={4}
        >
          <Image
            src={logo}
            height={75}
            width={250}
            onClick={() => {
              router.asPath !== "/" ? router.push("/") : "";
            }}
          />
        </Box>
        {router.asPath === "/" ? (
          <Stack w="50%">
            {/* Search Bar */}
            <InputGroup>
              <Input
                focusBorderColor="cyan.400"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSubmit={searchHandler()}
                placeholder="Search for product"
              />
              <InputRightElement
                children={<CloseIcon />}
                onClick={() => setValue("")}
                cursor="pointer"
              />
            </InputGroup>
          </Stack>
        ) : (
          <Box w="50%"></Box>
        )}

        {/* Menu Buttons */}
        <UnorderedList
          cursor="pointer"
          listStyleType="none"
          display="flex"
          direction="row"
          fontSize={20}
          gap={15}
        >
          {/* Shop Button */}
          <ListItem
            onClick={() => {
              router.asPath !== "/" ? router.push("/") : "";
            }}
            transition="ease-in-out .2s"
            _hover={{
              color: "#FF1AF5",
              mt: -1,
            }}
          >
            Shop
          </ListItem>

          {/* User Button */}
          {user ? (
            <Menu>
              <MenuButton
                transition="ease-in-out .2s"
                _hover={{
                  color: "#7F70EE",
                  mt: -1,
                }}
              >
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  maxH="30px"
                  maxW="30px"
                />
              </MenuButton>

              {/* Dropdown Menu */}
              <MenuList bgColor={colorMode === "light" ? "#ffffff" : "#222222"}>
                <MenuItem onClick={() => router.push("/account")}>
                  Account
                </MenuItem>
                <MenuItem onClick={() => router.push("/favorites")}>
                  Favorites
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => router.push("/api/auth/logout")}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ListItem
              onClick={() => router.push("/api/auth/login")}
              transition="ease-in-out .2s"
              _hover={{
                color: "#7F70EE",
                mt: -1,
              }}
            >
              Login
            </ListItem>
          )}
          {/* Cart Button */}
          <ListItem onClick={() => router.push("/cart")} maxH="32px">
            <Avatar
              w="32px"
              h="32px"
              bg={colorMode1}
              icon={
                <Icon
                  color={colorMode === "light" ? "#000000" : "#ffffff"}
                  as={shoppingCart}
                  w="32px"
                  h="32px"
                  transition="ease-in-out .2s"
                  _hover={{
                    color: "#12EAFC",
                    mt: -1,
                  }}
                />
              }
            >
              {/* Cart Badge */}
              {cart.length ? (
                <AvatarBadge boxSize="6" bg="#FF1AF5">
                  <Text fontSize={12} fontWeight="bold" color="#ffffff">
                    {cart.length}
                  </Text>
                </AvatarBadge>
              ) : (
                ""
              )}
            </Avatar>
          </ListItem>
          <IconButton
            size="sm"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            variant="outline"
          />
        </UnorderedList>
      </Flex>
    </>
  );
};

export default Header;
