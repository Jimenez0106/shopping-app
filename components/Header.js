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
  Hide,
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
  MenuOptionGroup,
  Show,
  Stack,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { BsFillHeartFill, BsDoorOpenFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay } from "../redux/actions";

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState("default");

  //ChakraUI Themes
  const { toggleColorMode, colorMode } = useColorMode();
  const colorMode1 = useColorModeValue("white", "#292929");

  //REDUX Store
  const itemsCollection = useSelector((state) => state.items);
  const [items] = itemsCollection;
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.categories);

  //Handle search input
  const searchHandler = () => {
    const itemsCopy = items;
    let filteredCopy = itemsCopy.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    dispatch(setDisplay(filteredCopy));
  };

  //Input value
  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  //Filter display based on selected category
  const filterHandler = (category) => {
    const itemsCopy = items;
    let filteredCopy = itemsCopy.filter((item) => item.category === category);
    category === "All"
      ? dispatch(setDisplay(itemsCopy))
      : dispatch(setDisplay(filteredCopy));
  };

  return (
    <>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        bgColor={colorMode1}
        py={3}
        px={1}
        cursor={cursor}
        pos="fixed"
        w="100%"
        zIndex={2}
      >
        {/* Logo */}
        {/* Show logo everywhere but shop page */}
        {router.asPath !== "/" ? (
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
              height={100}
              width={300}
              onClick={() => {
                router.asPath !== "/" ? router.push("/") : "";
              }}
            />
          </Box>
        ) : (
          <Hide below="md">
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
          </Hide>
        )}

        {router.asPath === "/" ? (
          <Stack w="100%" maxW="800px">
            {/* Search Bar */}
            <InputGroup>
              <Input
                focusBorderColor="cyan.400"
                value={value}
                onChange={changeHandler}
                onSubmit={searchHandler}
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
          <Box w="100%"></Box>
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
          <Hide below="md">
            <ListItem
              onClick={() => {
                router.asPath !== "/" ? router.push("/") : "";
                router.asPath !== "/" ? setCursor("wait") : "";
              }}
              transition="ease-in-out .2s"
              _hover={{
                color: "#FF1AF5",
                mt: -1,
              }}
            >
              Shop
            </ListItem>
          </Hide>

          {/* User Button */}
          {user ? (
            <Hide below="md">
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
                <MenuList
                  bgColor={colorMode === "light" ? "#ffffff" : "#222222"}
                >
                  <MenuItem onClick={() => router.push("/account")}>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="100%"
                    >
                      <Text>My Account</Text>
                      <CgProfile />
                    </Flex>
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/favorites")}>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="100%"
                    >
                      <Text>My Favorites</Text>
                      <BsFillHeartFill />
                    </Flex>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => router.push("/api/auth/logout")}>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="100%"
                    >
                      Logout
                      <BsDoorOpenFill />
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Hide>
          ) : (
            <Hide below="md">
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
            </Hide>
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
          {/* Toggle Theme Button */}
          <Hide below="md">
            <IconButton
              size="sm"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              variant="outline"
            />
          </Hide>

          {/* Mobile Dropdown Menu */}
          <Show below="md">
            <Menu>
              <MenuButton
                transition="ease-in-out .2s"
                _hover={{
                  color: "#7F70EE",
                  mt: -1,
                }}
                aria-label="Options"
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList bgColor={colorMode === "light" ? "#ffffff" : "#222222"}>
                {router.asPath === "/" ? (
                  //Categories
                  <MenuOptionGroup title="Filter Categories">
                    <MenuItem
                      onClick={() => {
                        filterHandler("All");
                      }}
                    >
                      All
                      <Box w="100%" />
                      <ChevronRightIcon />
                    </MenuItem>
                    {categories.map((category, index) => {
                      const capitalize = category
                        .split(" ")
                        .map(
                          (str) =>
                            str.charAt(0).toUpperCase() + str.substring(1)
                        )
                        .join(" ");
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            filterHandler(category);
                          }}
                        >
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            w="100%"
                          >
                            {capitalize}
                            <ChevronRightIcon />
                          </Flex>
                        </MenuItem>
                      );
                    })}
                  </MenuOptionGroup>
                ) : (
                  ""
                )}

                <MenuDivider />
                {user ? (
                  <MenuOptionGroup title="Profile">
                    <MenuItem onClick={() => router.push("/account")}>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                      >
                        <Text>My Account</Text>
                        <CgProfile />
                      </Flex>
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/favorites")}>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                      >
                        <Text>My Favorites</Text>
                        <BsFillHeartFill />
                      </Flex>
                    </MenuItem>
                  </MenuOptionGroup>
                ) : (
                  ""
                )}
                {/* Account */}

                <MenuDivider />
                {/* Logout and Theme */}
                <MenuOptionGroup title="Settings">
                  <MenuItem onClick={() => toggleColorMode()}>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="100%"
                    >
                      {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Flex>
                  </MenuItem>
                  {user ? (
                    <MenuItem onClick={() => router.push("/api/auth/logout")}>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                      >
                        Logout
                        <BsDoorOpenFill />
                      </Flex>
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={() => router.push("/api/auth/login")}>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                      >
                        Login
                        <BsDoorOpenFill />
                      </Flex>
                    </MenuItem>
                  )}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Show>
        </UnorderedList>
      </Flex>
    </>
  );
};

export default Header;
