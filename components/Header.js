import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import logo from "../styles/images/RJ Market.png";
import {
  Box,
  Button,
  Flex,
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
  UnorderedList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay } from "../redux/actions";

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  //ChakraUI Themes
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
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
            onClick={() => router.push("/")}
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
          <></>
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
            onClick={() => router.push("/")}
            transition="ease-in-out .2s"
            _hover={{
              color: "#FF1AF5",
              borderBottom: "2px solid #FF1AF5",
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
                  borderBottom: "2px solid #7F70EE",
                  mt: -1,
                }}
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{
                    maxHeight: "32px",
                    borderRadius: "15px",
                  }}
                />
              </MenuButton>

              <MenuList bgColor={colorMode === "light" ? "#ffffff" : "#222222"}>
                <MenuItem onClick={() => router.push("/account")}>
                  Account
                </MenuItem>
                <MenuItem onClick={() => router.push("/favorites")}>
                  Favorites
                </MenuItem>
                <MenuDivider/>
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
                borderBottom: "2px solid #7F70EE",
                mt: -1,
              }}
            >
              Login
            </ListItem>
          )}
          <ListItem
            onClick={() => router.push("/cart")}
            transition="ease-in-out .2s"
            _hover={{
              color: "#12EAFC",
              borderBottom: "2px solid #12EAFC",
              mt: -1,
            }}
          >
            Cart
          </ListItem>
          <IconButton
            size="sm"
            onClick={toggleColorMode}
            icon={colorMode1 === "black" ? <MoonIcon /> : <SunIcon />}
            variant="outline"
          />
        </UnorderedList>
      </Flex>
    </>
  );
};

export default Header;
