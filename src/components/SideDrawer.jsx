import React from "react";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  return (
    <Box>
      <Button onClick={onOpen}>
        <CiMenuFries />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Web pages</DrawerHeader>
          <DrawerBody>
            <Link to={"/"}>Home</Link>
            <p>About ⦮</p>
            <Link to={"/Board"}>SSG-Officers</Link>
            <br />
            <Link to={"/Merch"}>University - Merch</Link>
            <br />
            <Link to={"/Lanyards"}>Lanyards</Link>
            <Link to={""}></Link>
            <Link to={""}></Link>
            <Link to={""}></Link>
            <Link to={""}></Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default SideDrawer;
