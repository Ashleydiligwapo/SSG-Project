import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Grid,
  Image,
  IconButton,
  Text,
  HStack,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { CiMenuFries } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import MenuBar from "./MenuBar";
import SSGLogo from "../assets/ssg-logo.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

  const [isAuth, setIsAuth] = useState(false);

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  return (
    <Box>
      <Button onClick={onOpen}>
        <CiMenuFries />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack spacing={2} alignItems={"center"}>
              <Image src={SSGLogo} boxSize="46px" objectFit="cover" />
              <Grid className=" text-sm">
                <Text fontWeight={"bold"}>SSG</Text>
                <hr></hr>
                <Text>Danao Campus</Text>
              </Grid>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Grid h={16} as="header" justify="space-between">
              <Grid alignItems={"center"}>
                <Link
                  className="text-center p-2 rounded-sm m-1 font-semibold bg-gray-100 hover:bg-gray-200"
                  to="/"
                >
                  Home
                </Link>
                <Menu>
                  <MenuButton
                    m={3}
                    mx={1}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    About
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to="/Board">SSG - Officers</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/Merch">University - Merch</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/Lanyads">Lanyards</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    m={3}
                    mx={1}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Organizations
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to="/Organization">CTU Organizations</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/Clubs">Campus - Clubs</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/Departments">Departments</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    m={3}
                    mx={1}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Services
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Project 1</MenuItem>
                    <MenuItem>Project 2</MenuItem>
                    <MenuItem>Project 3</MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    m={3}
                    mx={1}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    More
                  </MenuButton>

                  <MenuList>
                    <MenuItem>
                      <Link to="/Engage">Engagements</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/FreedomCode">Freedom Code</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/Meetings">Council Meetings</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/Certificates">Certificates</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                {!isAuth ? (
                  <div></div>
                ) : (
                  <>
                    <Flex>
                      <Link
                        className="text-center p-2 rounded-sm w-32 m-1 font-semibold bg-gray-100 hover:bg-gray-200"
                        to="/PostCreate"
                      >
                        Post
                      </Link>
                      <Button className="w-32 m-1" onClick={signUserOut}>
                        <MdOutlineLogout />
                      </Button>
                    </Flex>
                  </>
                )}
              </Grid>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default SideDrawer;
