import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Button,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© SSG DANAO CTU - SABANG</Text>

        <Stack direction={"row"} spacing={6}>
          <Text>Contact us</Text>
          <Button label={"Twitter"} href={"#"}>
            <FaTwitter />
          </Button>
          <Button label={"YouTube"} href={"#"}>
            <FaYoutube />
          </Button>
          <Button label={"Instagram"} href={"#"}>
            <FaInstagram />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
