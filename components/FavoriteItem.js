import {
  Flex,
  Button,
  LinkBox,
  Image,
  Link,
  LinkOverlay,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addCart } from "../redux/actions";

const Favorite = ({ item, user }) => {
  const dispatch = useDispatch();
  const { description, image, price, rating, title, id } = item;
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    //Update cart and favorite LocalStorage on any changes
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) {
      localStorage.setItem(user.name, JSON.stringify(favorites));
    }
  }, [favorites, cart]);

  return (
    <Flex
      direction="row"
      backgroundColor="white"
      alignItems="center"
      justifyContent="center"
      p={5}
      rounded={15}
      gap={3}
      minH="235px"
    >
      {/* Image */}
      <LinkBox>
        <LinkOverlay href={`/listings/${item.id}`}>
          <Image boxSize="135px" objectFit="contain" src={image} alt={title} />
        </LinkOverlay>
      </LinkBox>
      {/* Buttons, Item Info, and Item Description */}
      <Flex justifyContent="space-between" w="100%">
        {/* Item Info */}
        <Flex direction="column" w="40%">
          <Link href={`/listings/${id}`}>
            <Heading size="sm">{title}</Heading>
          </Link>
          <Text>{rating.rate}/5</Text>
          <Text>{priceFormatter.format(price)}</Text>
        </Flex>
        {/* Description */}
        <Flex w="50%" maxH="80%">
          <Text>{description}</Text>
        </Flex>
        {/* Buttons */}
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Button onClick={() => dispatch(addCart(item))}>Add to Cart</Button>
          <Button onClick={() => dispatch(removeFavorite(id))}>
            Unfavorite
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Favorite;
