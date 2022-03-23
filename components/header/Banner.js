import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../styles/images/RJ Market.png";

const Banner = ({ colorMode1 }) => {
  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bgColor={colorMode1}
      py={3}
      px={1}
      w="100%"
      zIndex={2}
    >
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
        />
      </Box>
    </Flex>
  );
};

export default Banner;
