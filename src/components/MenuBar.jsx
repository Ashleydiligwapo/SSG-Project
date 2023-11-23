import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
function MenuBar() {
  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          About
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link to="/Board">SSG - Officers</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/FreedomCode">Freedom Code</Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Organizations
        </MenuButton>
        <MenuList>
          <MenuItem>CTU Organizations</MenuItem>
          <MenuItem>Campus - Clubs</MenuItem>
          <MenuItem>Departments</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Projects
        </MenuButton>
        <MenuList>
          <MenuItem>Project 1</MenuItem>
          <MenuItem>Project 2</MenuItem>
          <MenuItem>Project 3</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          More
        </MenuButton>
        <MenuList>
          <MenuItem>SSG - Merch</MenuItem>
          <MenuItem>Lanyards</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default MenuBar;
