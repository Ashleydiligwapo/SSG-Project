import React, { useEffect, useState } from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import axios from "axios";
function Meetings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  return (
    <div className=" max-h-full bg-gradient-to-br from-[#224866] via-[#073255] to-[#051431]">
      <Box>
        <Parallax
          blur={{ min: -14, max: 15 }}
          bgImage={bckImage}
          bgImageSizes="contain"
          strength={100}
        >
          <Box
            style={{
              justifyItems: "center",
              textAlign: "center",
              margin: "11%",
            }}
          >
            <Text className="text-5xl  font-bebas tracking-widest md:text-5xl ssm:text-4xl">
              COUNCIL MEETINGS
            </Text>
          </Box>
        </Parallax>
      </Box>

      <figure className="  ">
        <article></article>
      </figure>
    </div>
  );
}

export default Meetings;
