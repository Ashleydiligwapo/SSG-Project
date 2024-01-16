"use client";
import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Spacer,
  Grid,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import SSGLogo from "../assets/ssg-logo.png";
import SideDrawer from "./SideDrawer";
import MenuBar from "./MenuBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../pages/login";
import PostCreate from "../pages/PostCreate";
import Home from "../pages/Home";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { useEffect } from "react";

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuth, setIsAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setUserAuth(user.email);
    }
  }, [user]);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setUserAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Box
      className="font-poppins bg-gradient-to-r from-[#ec8405] to-[#e2a75e]"
      px={7}
    >
      <Flex h={16} as="header" align="center" justify="space-between">
        <IconButton
          size={"md"}
          icon={isOpen ? <SideDrawer /> : <SideDrawer />}
          aria-label={"Open Menu"}
          onClick={isOpen ? onClose : onOpen}
          display={{ lg: "none" }}
        />

        <HStack spacing={2} alignItems={"center"}>
          <Image src={SSGLogo} boxSize="70px" objectFit="cover" />
          <Grid>
            <Text fontWeight={"bold"}>SSG</Text>
            <hr></hr>
            <Text>Danao Campus</Text>
          </Grid>
        </HStack>

        <Flex alignItems={"center"}>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            <Link
              className="text-center p-3  font-semibold rounded-md hover:bg-gray-200"
              to="/"
            >
              Home
            </Link>

            <MenuBar />
            {!isAuth ? (
              <div></div>
            ) : (
              <>
                <Link
                  className="text-center p-3  font-semibold rounded-md hover:bg-gray-200"
                  to="/PostCreate"
                >
                  Post
                </Link>

                <Button onClick={signUserOut}>
                  <MdOutlineLogout />
                </Button>
              </>
            )}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
