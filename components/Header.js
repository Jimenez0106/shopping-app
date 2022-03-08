import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import logo from "../styles/images/RJ.png";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay } from "../redux/actions";

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  //REDUX Store
  const itemsCollection = useSelector((state) => state.items);
  const [items] = itemsCollection;

  useEffect(() => {}, []);

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
        borderBottom="2px solid rgb(224, 224, 224)"
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
            width={70}
            onClick={() => router.push("/")}
          />
        </Box>
        {router.asPath === "/" ? (
          <Stack w="50%">
            {/* Search Bar */}
            <InputGroup>
              <Input
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
          gap={15}
        >
          <ListItem onClick={() => router.push("/")}>Shop</ListItem>
          {user ? (
            <Menu>
              <MenuButton rounded="50%">
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{
                    maxHeight: "27px",
                    borderRadius: "15px",
                  }}
                />
              </MenuButton>

              <MenuList>
                <MenuItem onClick={() => router.push("/account")}>
                  Account
                </MenuItem>
                <MenuItem onClick={() => router.push("/favorites")}>
                  Favorites
                </MenuItem>
                <MenuItem onClick={() => router.push("/api/auth/logout")}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ListItem onClick={() => router.push("/api/auth/login")}>
              Login
            </ListItem>
          )}
          <ListItem onClick={() => router.push("/cart")}>Cart</ListItem>
        </UnorderedList>
      </Flex>
    </>
  );
};

export default Header;
