import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <Box>
      <Text>Log With Google</Text>
      <Button onClick={signInWithGoogle}>Sign With Google</Button>
    </Box>
  );
}

export default login;
