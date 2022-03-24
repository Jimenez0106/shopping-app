import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

const FavoriteItems = ({ favorites, background1, tooltip1, tooltip2 }) => {
  return (
    <>
      <Box w="90%">
        <Heading textAlign="left">Favorites</Heading>
      </Box>

      <Flex
        direction="column"
        w="90%"
        gap={5}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        {/* Title */}

        {/* Favorites Container */}
        <Flex
          direction="row"
          gap={5}
          p={5}
          overflowX="auto"
          bgColor={background1}
          rounded={15}
          className="horizontal"
          minH={300}
        >
          {/* Favorites */}
          {favorites.length && favorites !== null ? (
            favorites.map((item) => {
              const { title, image, id } = item;
              return (
                <Flex
                  key={id}
                  justifyContent="center"
                  alignItems="center"
                  minW="200px"
                  maxW="200px"
                  h="100%"
                >
                  <Tooltip
                    label={title}
                    shouldWrapChildren
                    openDelay={300}
                    bgColor={tooltip2}
                    color={tooltip1}
                    textAlign="center"
                    rounded={15}
                  >
                    <LinkBox>
                      <LinkOverlay href={`/listings/${id}`}>
                        {/* Image */}
                        <Box
                          bgColor="white"
                          rounded={15}
                          mb={3}
                          p={3}
                          maxH="300px"
                          maxW="200px"
                        >
                          <Image
                            src={image}
                            alt={title}
                            boxSize={200}
                            objectFit="contain"
                          />
                          {/* Title */}
                          <Text textAlign="center" isTruncated color="#000">
                            {title}
                          </Text>
                        </Box>
                      </LinkOverlay>
                    </LinkBox>
                  </Tooltip>
                </Flex>
              );
            })
          ) : (
            <Text>No items favorited...</Text>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default FavoriteItems;
