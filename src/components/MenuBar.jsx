import { React, useState, useEffect } from "react";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { auth } from "../firebase";
function MenuBar() {
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);
  return (
    <div>
      <Menu>
        <MenuButton
          mx={1}
          bg={"#e2a75e"}
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
          mx={1}
          bg={"#e2a75e"}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          Organizations
        </MenuButton>
        <MenuList>
          <MenuItem>CTU Organizations</MenuItem>
          <MenuItem>Campus - Clubs</MenuItem>
          <MenuItem>Departments</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          mx={1}
          bg={"#e2a75e"}
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
          mx={1}
          bg={"#e2a75e"}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          More
        </MenuButton>
        <MenuList>
          {!isAuth ? (
            <></>
          ) : (
            <>
              <MenuItem>
                <Link to="/FreedomCode">Freedom Code</Link>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  );
}

export default MenuBar;
